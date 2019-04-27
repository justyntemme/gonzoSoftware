---
title: "Docker to Kubes"
date: 2018-07-25T08:16:52-05:00
draft: false
---

If I told you that the transition from Docker to Kubernetes takes an afternoon of seamlessly migrating containers, I would be lying.

Kubernetes forced me to abandon my love for docker-compose. I had to rethink my container orchestration. I would be ditching my well-tweaked Nginx SSL proxy and adopting the “serverless approach”.


### Serverless

In the past, I never really understood the benefit of serverless architecture. _Serverless? Really? That’s for lazy people,_ I thought. How wrong I was.

Adopting this approach forced me to think in more depth about how my application would interact with its data and the network in which it exists. I created a container that did not depend on any external data to run. I had been told many times to not include SSL certs in my containers, however, I now do in order for proper scaling to be achieved.

### Scaling

When I finished creating my stateless application, I deployed three instances of it behind a load balancer. Proper scaling had been achieved. With a few clicks, I am able to run as many as even a thousand instances of my application. This is precisely what the serverless architecture is designed for. My application’s load-holding ability is no longer dependent on just one server, but many servers spread out across the United States.

### Persistent Volumes

Typically when setting up persistent data with Docker, one would mount persistent volumes to a parent server. This allows for easy container creation and removal without the fear of accidental data deletion, which is similar to what Google Cloud Platform has to offer. However, it is important to note the persistent volumes claims (Google’s approach to permanent data storage) can only be accessed with read / write permissions by a single container at a time. This means the volume can’t act as a storage area for SSL keys for all containers. While it’s generally not a great idea to keep SSL keys in a container image, this is the only solution I have come up with for this issue.

Persistent Volumes are tied to clusters. You may delete workloads, as well as containers, networks, and services. However, it is important to note that when deleting a cluster, you will be deleting all of its corresponding volumes.


### Load Balancing / Nginx
As mentioned previously, Nginx load balancing does not work as expected. While probably possible with some proper setup, the simplest method is to use Google’s provided load balancer. I wish I could share some data on how my application was able to handle the significant load from stress testing, but I can’t report that as Google detected automated traffic as a DDoS attack and blocked most requests. So I guess that’s a win for the load balancer.


The Google Cloud Platform offers several methods to access containers within a node. It is possible to create a direct link exposing a port on a node to an outside source, however, this lacks the scalability and load balancing sought after in Kubernetes. Most often, a load balancer is used to process the request, and forward them to the correct node port. The load balancer will take into consideration resources, as well as which nodes are healthy due to a health check.
    
When first using the load balancer I had attempted to handle SSL/TLS on the load balancer. While this is possible, it is not ideal. Wordpress will have a difficult time telling if the connection is secure. This is just an example of issues with WordPress behind an SSL reverse proxy. It seems the better solution is to build your image to scale, handling the secure handshake at the container, and letting the load balancer handle what it was designed to do, load balance.

### Cost-Benefit analysis

Overall I am spending the same amount on the Google Cloud Platform that I was spending on my dedicated server. In time this will probably outgrow my spending if budget allows. While you could probably make more use of a single server for a small network if you are looking to scale your application the cost of using a Kubernetes engine is hands down the best method. I am unaware of any application that allows for the scaling Kubernetes engine does.

### Is it worth it?

If you are running a single static website and are very interested in how Kubernetes works, then yes it’s very much worth it. If you are running several development projects and need to keep them running 24/7 with updates, then it is important to note Kubernetes will take time to learn. Even while staying fairly simple, you must relearn everything you did with Docker. Overall I have thoroughly enjoyed the time I have spent learning Kubernetes, and as someone seeking employment in that industry, knowledge of how to scale applications with an engine such as Kubernetes is crucial to career development. Kubernetes doesn’t really affect the small project hobbyists, instead focusing on how to take on the challenges of scaling for rather large applications.


