---
title: "Building a Web Based Hosting Control Panel with Go"
date: 2018-01-25
draft: false
author: "George Shaw"
---
##### Author
Geroge Shaw
[github](https://github.com/george-e-shaw-iv)
#### Project Beginnings

During the development of my interest with Golang, interest within my office, [Ennovar](http://ennovar.io/), also peaked. We were discussing it in one of our routine staff meetings one day and wanted to try and start some internal projects written in Go, in the interest of being proficient enough as an office to start using Go within our stack. I, like everyone else in the room, was thinking of ideas to start as an internal project when I thought of the idea that has since turned into a real piece of software: [gPanel](https://github.com/Ennovar/gPanel).

I pitched it in the meeting as a replica cPanel/WHM, written entirely in Go. It was a well-liked idea and from there my boss and supervisor both helped cultivate the scope of the project with me. Once I had a rough outline of what it needed to be capable of doing, I was honestly completely not confident in myself at all. I really thought I would get about 25% of the way through this project and then hit a brick wall that I couldn't overcome as a Go developer with my experience. Keep in mind, at this point I had not even written a production-ready website in Go at this point. I had just dabbled in what the language had to offer.

In the interest of trying to not let anyone down now that I had already pitched this idea, I started off to work on it. In the early stages of just trying to get the architecture of the project suited to what it needed to be capable of doing, the structure of the files and structure of the code within them changed around 7 times. Due to this, the interest that I initially had within my office and [DevICT](https://devict.org/) had reluctantly died. I was okay with this because I knew that it would be really difficult to contribute to an open source project like this until it was either nearly full-featured and had a stable architecture or completely finished and usable.

#### Golang Community

There are a few reasons I was able to get so far with this project, and in my opinion, the most important reason lies within the completely stellar community behind Go. Google themselves really take an interest and an effort to cultivate a diverse, accepting, and eager to help the community for Go. Beyond that, things like the [golang-nuts google group](https://groups.google.com/forum/#!forum/golang-nuts), the [Gophers slack](https://invite.slack.golangbridge.org/), and even the [DevICT Go slack](https://devict-slackin.herokuapp.com/) channel were all a tremendous help and without any of them, I wouldn't have been able to get this far. Some of the other things that really contributed to me being able to accomplish this undertaking was the fact that Go's current source code is written in none other than... Go, the [Go doc's](https://golang.org/doc/), and the overall simplicity of the language itself.

### Project Structure
I have so far ended up with a web-hosting control panel that is structured in the following way as displayed by this info-graphic:

![gPanel Structure](/images/gPanelStructure.png)

This software runs on a machine and can utilize as many cores and/or processors as it is provided. Since it only uses a single machine in a single location, figuring out how infinitely many websites can be hosted using this software might not be so intuitive. A request will come on port 80 or port 443 of at the IP of the machine. The software is listening on both of those ports and will analyze where the request came from by looking at the `Host` header field of the HTTP/HTTPS request packet. It will look for that host within its list of registered domains, find the account that it is registered to, and shuttle the request to the correct resource within that account.

#### File Editor
At the current moment in time there is no built-in file editor to utilize on the control panel. The only way to create/read/update/delete files for each account is to utilize the SSH tools for each account. Upon creation of an account through the server's interface, a Linux user is created along with the necessary files within their home directory to allow SSH access. To properly authenticate into a Linux user's home corresponding to the account, a public key that is paired with the correct private key must be given through an interface within the control panel of an account. These keys can be added and deleted easily through an interface the software does all of the heavy lifting.

#### SSH

Implementing SSH in this project was hands down, the hardest task that I had to accomplish within this software so far. I did not expect for it to be, but it was. I expected either the domain router or getting interpreted languages to work to be the hardest thing to accomplish. There was more than one reason that contributed to the unnecessary complexity that was getting SSH to work. One reason is that I was trying to juggle support for all three major platforms, Windows, Linux, and Mac, but I eventually had to heed to some really good advice shuttled to me by DevICT's Jacob Walker:

> "Make it work first before you make it work fast."  
>\- Bruce Whiteside

In my context, I think Jacob meant for me to take it in the sense that multi-platform support isn't super important in the developmental stages. So once I realized that support for windows on software such as this was me just dreaming and that Mac support is possible but it can always come later, I dropped down to solely support Linux for the time being and development has sped up. Another thing that hindered SSH support was me plainly not knowing how SSH worked completely and trying to solve the problem in the hardest way possible. At one point in time, I struggled for about a week in a half, not even realizing that what I was struggling with was me trying to make my own SSH daemon in Go. That would be really cool, but at the same time... why? I realized I was overthinking it and went back to the basics, working with the system to utilize the built-in SSH daemon.

#### Project Direction

The project is coming to a point very quickly where it could be considered in alpha. I am very excited about reaching that point, but there are still challenges I have yet to overcome. This project was just what I needed to realize that nothing is really too big to accomplish, no matter how daunting it looks from the outside looking in. It also makes me appreciate the internet all that much more, as well as local organizations like DevICT for the tremendous about of help that I've found.

This trial by fire of sorts for learning Go has been a very wild ride. Now that I've started to work on simple production sites in Go, utilizing some of their templating features and following some best practices that I hadn't known about previously it is all very refreshing. From huge pieces of software that require lots of work, all the way to small sites that have limited use-cases, Go has proven to me that it not only has what it takes, but it also makes developing fun and exciting, which is why I will continue to use it and give back to the Go community as it has a lot to me.



