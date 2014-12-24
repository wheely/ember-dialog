---
layout: main
title:  "Installation"
date:   2014-12-24 12:25:40
categories: jekyll update
---

<h2>Simple</h2>

<p>You can include script into your project from <a href="https://cdnjs.com/libraries/ember-dialog/">https://cdnjs.com/libraries/ember-dialog/</a>. CDN - is a great way to make apps loading faster.</p>

<p>Or you can get latest version from <a href="https://github.com/wheely/ember-dialog/tree/master/dist">here</a>, put these files into public directory of your project and include them.</p>

{% highlight html %}
<script src="/public/ember.dialog.min.js" type="text/javascript"></script>
{% endhighlight %}

<p>Also if you wish you can use elementary styles:</p>

{% highlight html %}
<link href="/public/ember.dialog.min.css" rel="stylesheet" type="text/css">
{% endhighlight %}

<h2>Via bower</h2>
<p>Bower is a package manager for the web. Bower makes it easy to manage dependencies in your application including Ember and Ember Dialog. To learn more about Bower visit <a href="http://bower.io/">http://bower.io/</a>.</p>

<p>Adding Ember to your application with Bower is easy; simply run <code>bower install --save ember-dialog</code>. You can also add ember or ember-data to your bower.json file as follows.</p>

{% highlight json %}
{
    "name": "your-app",
    "dependencies": {
        "ember-dialog": "^1.0.0"
    }
}
{% endhighlight %}

After installation include these files into build task (recommend: broccoli, grunt or gulp). Also you may include them directly into page (e.g. if you're using appkit).

{% highlight html %}
<script src="/bower_components/ember-dialog/dist/ember.dialog.min.js" type="text/javascript"></script>
{% endhighlight %}

<h2>For ember-cli</h2>

<p>For this case foresee <a href="(https://github.com/ajile/ember-cli-dialog">ember-cli-dialog</a> addon.</p>
