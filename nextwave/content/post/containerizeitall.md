---
title: "Private Networking with Docker and Nginx: Keeping Private Traffic Private"
date: 2018-01-10T10:54:34-06:00
draft: false
keywords:
- private
- Docker private networking
- docker private networking
- multicontainer
- multi-container
- multi-container networking
- docker security
- Docker security
- security
- privacy
- Docker
- docker
- networking
- firewall
- nginx
- reverseproxy
- nginx reverse proxy
- reverse proxy

description: "Multi-container networking with Docker. How to keep private data private."
---

### Keeping private traffic private

No one needs to be able to see your backend services and databases. Those are strictly for the public web-servers to access.Too many database containers are exposed and are left vulnerable to attack due to sub-par security measures. By keeping database containers only available to traffic from your web servers, you reduce your attack service and increase security for all of your users.

### A single Nginx Container

#### Centralizing keys
In the land before time -- er, excuse me - the time before Docker containers, all [SSL/TLS certifications](https://nextwavesolutions.io/post/tlsallthethings/) would be stored in a centralized server on the bare metal machine. We return to a centralized approach via Nginx in a Docker container responsible for handling all the connections.As nginx allows for rapid scaling with multiple servers, this could eventually scale to a load balancer if desired. 

#### nginx.conf

One would think that multiple Docker containers talking to each other, not exposed to the internet would be a difficult concept to grasp, and even more difficult to implement. Fortunately for us, it's quite the opposite. Below is my nginx.conf with comments to explain how things work.


These are simply server optimizations.
~~~~~ 
worker_processes 5;

events {worker_connections 1024; }
http {
sendfile on;
gzip on;
gzip_types text/html text/css application/x-javascript text/xml application/xml application/xml+rss text/javascript;
~~~~~
<br>
Here is where I define the server name that users will be typing into the address bar. The basic reverse proxy setup, which by calling the name of thecontainer, all traffic is forwarded to the proper web-server.  
~~~~~
server {
    listen 80;
    server_name gitlabserver.com;
    location / {
        proxy_redirect off;
        
        proxy_set_header        X-Forwarded-Proto $scheme;
        proxy_set_header        Host              $http_host;
        proxy_set_header        X-Real-IP         $remote_addr;
        proxy_set_header        X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header        X-Frame-Options   SAMEORIGIN;
        proxy_pass http://gitlab/;
    }
}
~~~~~
This is a basic 301 redirect to force https, nothing fancy here.
~~~~~
server {
    listen 80;

    server_name nextwavesolutions.io;
    return 301 https://$server_name$request_uri;
}
~~~~~
Here is another example of the benefits of multi-container networking. I have another small web panel for my bitcoin trading clients. All traffic is handled by the nginx container, and there was no need to spin anything new up just to server a new webpage (except the web app Docker container of course). All I have to do is define the container within the `nginx.conf` and when the containers are spun up, nginx configures a listener for that specific request.
~~~~~

server { 
    listen 80;
    server_name bitcoin.website.io;
    location / {
        proxy_pass http://justynbitcoin/;
        proxy_redirect off;
    }
}

~~~~~
Finally, here we have the main site container.SSL certs are handled in this config. Nginx makes using TLS/SSL easy, and with multi-container networking, deploying SSL/TLS certs to multiple subdomains is as simple as listing them in the nginx config. Notice how the Docker container actually listens on port 8080, however, traffic directed to this server is forwarded via nginx. 

~~~~~
server {
    	listen 443 ssl http2;
    	server_name nextwavesolutions.io
    
    	ssl on;    
    	ssl_certificate         /etc/letsencrypt/archive/www.nextwavesolutions.io/fullchain2.pem;
       	 ssl_certificate_key     /etc/letsencrypt/archive/www.nextwavesolutions.io/privkey2.pem;

    	location / {
       	 proxy_pass http://nextwave:8080;
       	 proxy_redirect off;
    	}
	}
}
~~~~~

### Docker compose
Docker compose is a great tool for managing multi-container setups. The highlight of this setup is how easy it is to simply call another container. For example, if I have one container `reverse proxy` and one container `web-server` I can specify in my nginx.conf to forward all traffic for the server `web-server.com` to `http://web-server/` as seen in the engine.conf above. Yes, it's that easy, you simply call the network address, whatever you named the container in your Docker-compose file. Here is an example Docker-compose file I use in production.


Here the reverse proxy container is defined, as well as the volumes for the SSL certifications. Notice port 80, and 443 are exposed. However, no other container has any ports exposed. This is one of the main benefits of multi-container networking. I only expose what I choose to expose and keep the backend DB's from needing to be seen by the public.
~~~~~
version: '2'
services:
     reverseproxy:
          image: reverseproxy
          ports:
               - "80:80"
               - "443:443"
          restart: always
          volumes:
               - "/etc/letsencrypt/archive/www.nextwavesolutions.io:/etc/letsencrypt/archive/www.nextwavesolutions.io"
          privileged: true
~~~~~

Here I define my container holding the data for nextwavesolutions.io. As you can see, the containers name is `nextwave`. Therefore, when calling the container form the nginx.conf for forwarding, you simply call `http://nextwave/` Multi-container networking made easy.
~~~~~
     nextwave:
          image: nextwave
          restart: always
~~~~~
The rest of the containers follow the same format as the nextwave container, save some special configuration for gitlab.
~~~~~
     justynbitcoin:
             image: jbitcoin
             restart: always
     gitlab:
             image: gitlab/gitlab-ce:latest
             restart: always
             hostname: 'gitlabsubdomain.com'
             environment:
                     GITLAB_OMNIBUS_CONFIG: |
                             external_url 'http://gitlabsubdomain.com'
             volumes:
                 - "/srv/gitlab/config:/etc/gitlab"
                 - "/srv/gitlab/logs:/var/log/gitlab"
                 - "/srv/gitlab/data:/var/opt/gitlab"
~~~~~

