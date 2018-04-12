---
title: "How to DOS Yourself With Argon2"
date: 2018-04-12T13:39:48-05:00
draft: false
---

Recently while penetration testing a clients server I found a DOS attack via a simple post request. On a page which took text input, as well as a hashing method, and returned the hash string, I was able to DOS the entire server. 

## Starve the CPU

The exploit was a simple bash script that made a POST request with the text as `testing` and the hash function, `Argon2`. Now one interesting thing to note is exactly how much CPU usage each hash function takes. Many would consider this all the more reason to use Argon2 over a weak hashing function like MD5, I would agree. The issue is not within Argon2. It is a much superior hashing function. However, when a small 1 core 512mb digital ocean droplet is told to hash strings thousands of times, one after the other, the CPU usage quickly goes from idle to 100%. This caused the entire server to stop responding until we stopped the script.

## Mitigations

Just how can we stop attacks like this from occurring? Well as with all security, it must be thought of during the design of the software. The entire system must be taken into account as a single functioning body with many parts.

### Efficiency O(o)

When engineering any piece of software, from API to full-scale application, one must think of efficiency of the entire system. Does the size of the request, match the amount of processing it would take? Many would consider this to be O(o), or `amount of time grows linearly with the size of the input`. You can find the explanation referenced and more information on Big O notation explained very methodically [here](http://www.itprotoday.com/software-development/defeating-denial-service-cpu-starvation-attacks).

### Rate Limiting

If the goal of efficiency simply can not be met due to requirements of the software, one can look to limit the rate at which requests can be made, otherwise known as rate limiting. By stopping an attacker from leveraging an inefficient request, you can allow the server enough time to complete the function and return for the next, rather than dying a slow death.

#### Rate Limiting an API in Go

It's well documented Go is my favorite programming language. Once again I get to explain how simple it is to create secure effective apps using the tooling built into the language. As expected with most things, goes implementation of rate limiting is basic enough to be used by any junior developer, and scales with tools and would make any senior developer ecstatic. 

` import "time"`
We will start by importing the time package. This will allow us to dictate the frequency we allow requests.

```go
rate:= time.Second / 10

burstLimit := 100

tick := time.NewTicker(rate)

defer tick.Stop()
```

Here we are defining the options for our limiter, as well as implementing a burst limit to allow for fast response calls, and still limit the amount in a given time frame. 

`throttle := make(chan time.time, burstLimit)` This will create a channel that another function can peek into and see the time or burstLimit. This will allow us to use go routines to manage requests.

```go
go func() {

  for t := range tick.C {

    select {

      case throttle <- t:

      default:

    }

  }  // does not exit after tick.Stop()

}()

```

This is the goRoutine that will tick the timer forward, and at every tick, check if the requests are greater than the burstLimit.

```go
for req := range requests {

  <-throttle  // rate limit our Service.Method RPCs

  go client.Call("Service.Method", req, ...)

}

```

Here is our final piece of code. This will look through the requests and check tick the counter within the channel the goRoutine uses. If tick.Stop is not called then the service request will carry on as normal. To see the full source code, as well as see more advanced rate limiting implementations visit the [Golang Wiki](https://github.com/golang/go/wiki/RateLimiting)
