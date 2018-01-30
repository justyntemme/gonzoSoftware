---
title: "How to build a Simple WebServer Using Go"
date: 2018-01-29T10:31:09-06:00
draft: true
---

### Simplifying the web server


#### http.FileServer() VS http.ServeFile()
While both accomplish the same goal, the functions handle calls different ways. 

##### http.FileServer()
When looking to server static files the simple FilServer() allows enough flexability to serve content, while keeping it very simple for developers. 

#### http.ServeFile()

