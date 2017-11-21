---
title: "TLS (SSL) All the Things!"
date: 2017-09-28T19:11:08-05:00
draft: false

---



So you have heard about it, you use it, and it also was once an endeavor that could cost quite a bit of cash. Now thanks to Letsencrypt it's easier than ever to force HTTPS traffic to even static websites on your web server.

### Letsencrypt

Letsencrypt is a free CA (certificate authority) that let's anyone that owns a domain generate a trusted certificate for that domain. There are many guides to do this, my favorite being our friends at [Fedora Magazine](https://fedoramagazine.org/letsencrypt-now-available-fedora/ "letsencrypt"). Setup the letsencrypt certificate before continuing reading.

### Apache + Letsencrypt

Now that you have your cert files you will need to move them to the apache key directory.

* SSLCertificateFile /etc/pki/tls/certs/mydomain.com.crt
* SSLCertificateChainFile /etc/pki/tls/certs/mydomain.com.chain.crt
* SSLCertificateKeyFile /etc/pki/tls/private/mydomain.com.key

After moving the key files to the proper directory, it is time to tell nginx to use SSL, and where the key files are located. The Apache config files are located in /etc/httpd/ . The first config file we will need to edit is the ssl.conf found in /etc/httpd/conf.d/ssl.conf. Here we will tell Apache to listen on port 443 by adding 
`Listen 443 https` to the file head. You will find locations to add the location of your SSL cert files. 

~~~~
SSLCertificateFile /etc/pki/tls/certs/mydomain.com.crt 

SSLCertificateKeyFile /etc/pki/tls/private/mydomain.com.key 

SSLCertificateChainFile /etc/pki/tls/certs/mydomain.com.chain.crt
~~~~
### Apache + Letsencrypt + ...... Docker?

Now that we have TLS (SSL) enabled with Apache, let's have some fun with reverse proxying and enable ssl to a web server in a docker container. Docker is great for containerizing applications, especially webs ervers. I will assume you have a docker container listening on port 9090 that accepts a normal HTTP connection. We will take advantage of the ability for Apache to seamlessly pass TLS traffic to a local HTTP web server. Back in your ssl.conf file you will need to create a VirtualHost for port 443. An example is given below.
~~~~
<VirtualHost *:443>
	ServerName		mydomain.com
	SSLEngine		on

	SSLCertificateFile	/etc/pki/tls/certs/mydomain.com.crt
	SSLCertificateChainFile	/etc/pki/tls/certs/mydomain.com.chain.crt
	SSLCertificateKeyFile	/etc/pki/tls/private/mydomain.com.key

	SSLProxyEngine		off
	
	SSLProxyVerify		none
	SSLProxyCheckPeerCN	off
	SSLProxyCheckPeerName	off

	ProxyPreserveHost	on
	ProxyRequests		off
	ProxyPass		/	http://mydomain.com:9090/
	ProxyPassReverse	/	http://mydomain.com:9090/
	
	ErrorLog		/var/log/httpd/mydomain_apache_proxy_https_error.log
</VirtualHost>	
~~~~

Now with a simple `sudo systemctl restart httpd` you can have a reverse apache proxy serving TLS (SSL) to a standard web server in a docker container.
