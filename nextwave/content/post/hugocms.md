---
title: "Fast websites with Hugo"
description: "What is Hugo and how are web developers developing fast static webpages in an instant?"
date: 2018-1-21
draft: false
---

Many web designers are moving to static sites to manage content. Not only do static sites generally have faster page speed, the overhead on the parent server is much smaller. 

## Hugo

Hugo is a static site generator written in Go. Websites are generated instantly with a config file, with all content being managed from markdown files.

### The project directory

#### config.toml

This is your site config file. It tells Hugo every piece of information needed to generate your website. Below is the config.toml needed to generate nextwavesolutions.io

~~~
baseURL = "https://nextwavesolutions.io/"
languageCode = "en-us"
title = "NextWave Solutions LLC"
theme = "hugo-initio"
publishDir = "public"

[params]
    name = "NextWave Solutions"
    description = "Propelling the NextWave of technology"
    email = "justyn@nextwavesolutions.io"
    background = "/images/Love-Coding.png"
    favicon = ""
    DateForm = "0000-00-0000"
    showSubheader = false
    showServices = true
    showRecentWorks = true
    showDownload = false
    showClients = false

    footerEnableContact = true
    footerEnableFollowme = true
    footerEnableTextWidget = false
    footerEnableFormWidget = false

[[menu.main]]
    name = "home"
    url = "/"
    weight = 1
[[menu.main]]
    name = "blog"
    url = "/post/"
    weight = 5

[params.disqus]
    site = "nextwavesolutions.io"

[params.sharethis]
    property = "123456789012345678901234"
    custom = true

[params.google.analytics]
    trackerID = "UA-109147161-1"

[[params.social]]
    title = "twitter"
    url = "https://twitter.com/nextwavesllc"
    icon = "fa-twitter-square"
    footer = true
    sharethis = true
    network = "twitter"
[[params.social]]
    title = "linkedin"
    url = "https://www.linkedin.com/in/justyntemme"
    icon = "fa-linkedin-square"
    footer = false
    sharethis = true
    network = "linkedin"
[[params.social]]
    title = "github"
    url = "https://github.com/justyntemme"
    icon = "fa-github"
    footer = true
    sharethis = false
    network = ""
[[params.social]]
    title = "email"
    url = "mailto:info@nextwavesolutions.io"
    icon = "fa-envelope"
    footer = false
    sharethis = true
    network = "email"

~~~ 

There are quite a bit of configuration options on the page. However, not all themes require this in depth of a configuration. Websites can be spun up in a matter of minutes. The exhausting config file does show the flexibility of Hugo to build more complex pages. At NextWave, we have standardized on Hugo as the CMS. 


### public/
Unless specified otherwise in the config file, Hugo will generate all static pages in the public/ directory on the project. Here are the files you will actually move to your public_html directory of your webserver.

### content/post
Hugo allows for lots of content types that the theming engine can take advantage of. The most popular, and default content type is the post type. Hugo will treat each markdown file in this directory as a new post. These files are used to generate each independent post page, as well as added to the post index page. 

### static/
These are the static folders that will live in the root directory of your public folder. As any web developer knows, the static folder will host images, videos, and any other external resources needed by your webpages

### themes/
The theme folder is the directory which holds the configuration files for your theme. At a later date, I will be creating a blog post detailing how themes work, and how you can make use of themes as a highly customizable content management system.

## Fast page speed
It is well known that static sites are much faster than dynamic content. This is generally due to the fact that dynamic content managed by cms systems like WordPress, store all post content in a database. A database query is required to load every page.

### SEO benefits
As Google transitions to web frameworks like AMP, page speed becomes even more of a factor for SEO. Google will rank your website over similar sites with a slower page speed loading time. Using a static site can help your bounce rate, and search result score simply by not needing a database.
[user@thinkpad post]$ 

