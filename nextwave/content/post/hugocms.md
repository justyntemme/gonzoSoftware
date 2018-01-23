---
title: "Hugo As a Highly Customizable CMS"
description: "How Hugo and Go combine to make a developer friendly, highly customizable cms, without the need for a database."
date: 2018-02-23
draft: false
---
## Hugo
You can read our intro to Hugo blog post [here](https://nextwavesolutions.io/post/hugo). Hugo is a great static website generator that NextWave Solutions is using as a content management system.

### Templating
One of the main advantages of Hugo is the highly customizable themes. Easily configured, the template engine acts almost as a PHP library. It feels like you are developing on Wordpress, with similar functions.

### Theme directory
Found in your project directory then `themes/name-of-theme`


#### static/{css, images, js}
The static directory will merge with the project static directory. Here CSS files, local javascript files, and all necessary image and resources will be stored.

#### layouts/{about, \_default, partials}
Here are the bread and butter of the templating engine, where all templates are stored. The Hugo engine scans this directory to build out the website tree. Most of the work will be done in the `partials` directory, where the `head.html` will be inserted into every page as the `<head>`.

#### Importing partials and Function Calls

All template functions are defined with the {{ }}. This allows the templating engine to rapidly search the content and build the necessary content HTML. If we look at the `index.html` within the `layouts/` directory, we will see the content below.

~~~
{{ partial "header.html" . }}
{{ partial "home.html" . }}
{{ partial "footer.html" . }}
~~~

It is important to note, not all themes will have this `index.html` layout. The theme for nextwavesolutions.io can be found [here](https://themes.gohugo.io/hugo-initio/).

##### Function Calls

As shown above, to import the header, body, and footer HTML simply requires a `{{ partial "page.html }}`. This makes inserting dynamic content very easy without having to manually build every page. This is a feature found commonly in content management systems, and is a highlight of Hugo. The ability to create content using pre-defined layouts is great, however, this is included without the overhead of most CMS solutions.

Looking into the `header.html` shows us a bit more classic HTML/javascript. At least that is until we start to see more of the ` {{ }}`.

I often think of these function calls similar to that of Wordpress functions. For example the [get_posts()](https://developer.wordpress.org/reference/functions/get_post/) function equivalant, {{ .Content }}. The documentation for all of the functions are found [here](https://gohugo.io/documentation/). The function calls range from [htmlescape](https://gohugo.io/functions/htmlescape/) to [string](https://gohugo.io/functions/string/) manipulation. Hugo has been built out to be a complete solution for managing and manipluating content.

Hugo gives the tools to developers to create dynamic sites that are generated to static pages with a simple command.

##### Building Truly Dynamic Content

The `_default` directory is the template for each independent blog post. You will find two files in the folder, the `single.html` and `list.html`. `list.html` being the template for the page that displays all posts, while the single post is the template for each individual post. When using the  `{{ .Content }}` function inside the `_defualt/single.html`, each markdown file is looped through and addressed as the post being called.

With everything in place you now have the ability to create pages based on your already set templates. The header.html and footer.html provide a basic start for any page you wish to create. You can then modify the pages to include content, and use Hugo function calls to manipulate stored content.

### AMP 
A great example of easily building dynamic content with Hugo, is the ability to create amp pages as you create you your normal pages. Once a template for amp pages is created, each new blog post is used to create a new amp page.

