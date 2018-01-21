---
title: "Hugo As a Highly Customizable CMS"
description: "How Hugo and Go combine to make a developer friendly, highly customizable cms, without the need for a database."
date: 2018-01-21
draft: true
---
## Hugo
You can read our intro to Hugo blog post [https://nextwavesolutions.io/post/hugo](here). Hugo is a great static website generator that NextWave Solutions is using as a content management system.

### Templating
One of Hugo  main advantages, is the highly customizable themes. 

### Theme directory

#### static/{css, images, js}
The static directory will merge with the project static directory. Here css files, local javascript files, and all necessary image and resources will be stored.

### layouts/{about, \_default, partials}
Here is the bread and butter of the templating engine. Here all templates are stored. The Hugo engine scans this directory to build out the website tree. Most of the work will be done in the `partials` directory. Here the `head.html` will be inserted into every page as the `<head>`.

#### Importing partials

All template functions are defined with the {{ }}. This allows the templating engine to rapdily search the content and build the necessary content html. If we look at the `index.html` within the `layouts/` directory, we will see the content below.

~~~
{{ partial "header.html" . }}
{{ partial "home.html" . }}
{{ partial "footer.html" . }}
~~~

It is important to note, not all themes will have this `index.html` layout. The theme for nextwavesolutions.io can be found [https://themes.gohugo.io/hugo-initio/](here).

As shown above, to import the header, body, and footer html simply requires a `{{ partial "page.html }}`. This makes inserting dynamic content very easy without having to manually build every page. This is a features found commenly in content management systems. 
