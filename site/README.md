# Ember-dialog docs site

This directory contains the code for the Jekyll docs site, [wheely.github.io/ember-dialog](http://wheely.github.io/ember-dialog).

## Generate and deploy docs

```shell
$ bundle install
$ bundle exec rake site:generate
$ git clone git@github.com:wheely/ember-dialog gh-pages
$ cd gh-pages
$ git checkout gh-pages
$ cd ../
$ bundle exec rake site:publish
```
