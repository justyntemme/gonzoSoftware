---
title: "Contain Go"
date: 2017-09-29T16:53:40-05:00
draft: false

---

So you have just learned Golang, built a webserver, and are ready to show the world what you can do. That's great! Go is a very great language that scales well. In fact, many of the tools used to deliver this web page to you are written in Go. Hugo, a static website generator, was used to build the webpage. A simple Go file server is used to serve the webpage. Docker, the application responsible for containerizing the web server, is also written in go. So how **do** we combine these great Go technologies to deliver a containerized web server? Today, we will attempt to answer that question, as well as teach you some great practices for making website updates relatively easy.

### Go Webserver 

Go is great for hosting simple websites that you want to show to the world. You can find many examples of a web server in action. For today I will assume you have a working web server listening on port 8080. Below is an example of a file server sharing the contents of /usr/share/doc.

~~~~
package main

import (
	"log"
	"net/http"
)

func main() {
	// Simple static webserver:
	log.Fatal(http.ListenAndServe(":8080", http.FileServer(http.Dir("/usr/share/doc"))))
}
~~~~
This example can be found [here](https://golang.org/pkg/net/http/#example_FileServer)

### Docker File
Now that you have a working Go file server, and some sort of index.html within /usr/share/doc, it is time to build your docker file. This docker file will be built after every update of the info you have in /usr/share/doc. By hosting your website on github you will be able to take advantage of go get, Golangs command to fetch a remote git repository. Here is an example Docker file. Note: You will need to set your GOROOT on your server to /go and chown /go to the user running the command. You can set this by placing `export GOROOT=/go` in `~/.bashrc` after you have created and chowned the directory. Be sure to `source ~/.bashrc` so your current session knows of the global variable assignment.

#### Dockerfile
~~~~
# Sets the docker image base. We will be using the latest golang image to run our web server
FROM golang:latest

# Using Go we are able to go get our webserver/website with one clone request to the repository
RUN go get github.com/myprofile/mywebserverrepo

# go install builds the binary for the web server and moves it into $GOROOT/bin/ 
RUN go install github.com/myprofile/mywebserverrepo

# go get installs the repository to our local /go/src/github/myprofile GOROOT. We will need to copy the web directory to /go/bin so our web server is in the same directory as our web pages
RUN cp -r /go/src/github.com/myprofile/mywebserverrepo/public /go/bin

#expose tells docker we will need to map 8080 to an external port on the machine
EXPOSE 8080

#Entry point tells docker where to start once the docker container is ran. This will be the name of your web server binary after you were to run go build within the directory 
ENTRYPOINT ["webserver"]
 ~~~~

Now that we have our docker file ready we can build the docker image. For easy image management I use Cockpit from the Fedora team. However, there are plenty of ways to manage images and containers how you do it is up to you.

`docker build . -t mywebserver`

This will build the docker container and label it mywebserver. 

Now to run the webserver

`docker run -P 8080:80 mywebserver`

Congratulations! You have now contained a Go web server!
