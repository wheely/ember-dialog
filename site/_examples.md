---
layout: main
title:  "Examples"
date:   2014-12-24 12:25:40
categories: jekyll update
---

## Примитивы

Все примитивные примеры будут строиться на этом шаблоне

{% highlight javascript %}
var App = window.App = Ember.Application.create();

// Creating application controller
App.ApplicationController = Em.Controller.extend({

    init: function() {
        var manager = this.get('dialogManager');
        // ...
    }
});
{% endhighlight %}

### Alert
{% highlight javascript %}
    manager.alert("Error message here!");
{% endhighlight %}

<input type="button" value="Выполнить">

## Сложная логика

## Кастомные диалоговые окна

## Кастомизация менеджера

## Создание собственных типов диалоговых окон
