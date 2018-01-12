---
title: "Why Fedora? - Benefits of the best Linux Distro - NextWave Solutions"
date: 2017-09-29T12:39:51-05:00
description: "Why choose Fedora as your Desktop and Server Linux distro."
draft: false
---

Many Linux advocates are familiar with CentOS server side, as well as RHEL. Fedora is often treated as the desktop RHEL distribution, instead of a fully qualified server distribution. Today we will look at several reasons to use Fedora server side, as well as compare it to other server distros.

### Packages | We have hit the sweet spot

The Fedora project lives in a sweet spot. The packages stay very stable, and I still manage to get up to date software without having to sacrifice stability (I'm looking at you arch). The updates are handled easily in DNF (the lastest version of the package manager). It is often called a testing ground for RHEL (red hate enterprise linux) software. While this does tend to get the bleeding edge of a new technology, dependability is not forgotten. The wayland display server is a great example. Wayland was adopted when it was fully usable by the end user, while not waiting until every other distrobution had adopted it first. To be a leader in the software world you have to adapt. With the adoption of OpenQA thanks to OpenSuse, as well as a high standard for quality releases, the distribution has never been more ready to host production systems. 

### Cockpit | More than just a tool, a direction
![coindesk graph](/images/cockpit.png)
Cockpit is a great example of one of the ways fedora is focusing on its server version of the distribution. The package can be built and ran on any Linux distro, however the fedora team are working on improving the server manager, as well as making sure releases work great. Cockpit is not the best server/container management engine by a long shot. However having this tool two commands away when starting a system install is something not to take for granted. Rather than look to the package for what it brings, look to what cockpit means for the fedora team. A team backed by one of the biggest linux componies is making tools on top of an already great server distro. Being backed by RHEL is much more than a financial backbone. RHEL brings experience, knowledge, and a direction for the team to head. 

### Selinux | Sudo setenfore 0

While fedora users first reaction to a Selinux bug is just to fire up gnoem shell and setenforce to 0, there are actually many simple ways to identify and solve issues. From `audit2allow` to the GUI Selinux troubleshooter, there are a number of tools to help with any Selinux issue. By turning the entire system off you take away one of fedoras greatest tools. Selinux not only enforces policy, but alerts when processes try and break a policy. This is a great tool for system admins to monitor live systems. Selinux and the tools provided are just another one of the great examples of tooling that comes with fedora. This extensive tool set built around a distro helps make it production ready.
