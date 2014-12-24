---
layout: main
title:  "About"
date:   2014-12-24 12:25:40
categories: jekyll update
---
Ember-dialog used to create a modal dialog windows. Has a wide range of use: confirms, alerts, popup forms, notices, etc.

## Особенности

Cпособ создания модальных окон, <a href="http://emberjs.com/guides/cookbook/user_interface_and_interaction/using_modal_dialogs/">предложеный в cookbook</a> не подразумевает создание нескольких модальных окон одновременно, что порой необходимо. Например представьте себе форму в модальном окне, пользователь введя в неё какие-то данные, по ошибке закрывает её. В такой момент было бы не плохо показать ему еще одно модальное окно поверх первого с вопросом "Вы уверены?", не так ли?

Эта библиотека призвана максимально упростить работу с модальными окнами.

Для примера вот так выгладит вывод модальника с сообщением пользователю:

{% highlight javascript %}
this.get('dialogManager').alert("Сообщение находится тут");
{% endhighlight %}

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help
