---
layout: main
title:  "Get started"
date:   2014-12-24 12:25:40
categories: jekyll update
---

Сперва вам нужно установить ember-dialog. Это можно сделать любым удобным для Вас способом, ознакомьтесь с разделом <a href="./installation.html">установки</a>.

После устновки в контроллерах вашего приложения станет доступно свойство dialogManager.

{% highlight javascript %}
var manager = this.get('dialogManager');
{% endhighlight %}


## Методы менеджера диалогов
У менеджера доступны следующие методы:

<table class="table methods">
    <tr><td class="param-name">alert</td><td>Показывает окно с одной единственной кнопкой, которая при нажатии вызывает handler `accept`</td></tr>
    <tr><td class="param-name">confirm</td><td>Показывает окно с двумя кнопками, одна вызывает handler `accept`, другая `decline`</td></tr>
    <tr><td class="param-name">custom</td><td>Показывает окно без кнопок. Их вы должны определить во шаблоне, который помещается в диалоговое окно</td></tr>
    <tr><td class="param-name">notice</td><td>Показывает окно без кнопок с минимальными отступами, в правом верхнем углу, которое само усчезает через отведенное время (по дефолту 5 секунд). Подразумевается, что Вы сами подправите css как Вам нужно.</td></tr>
</table>

### alert

Создается окно с одной единственной кнопкой, которая при нажатии вызывает handler `accept` у контроллера. Возвращает <a href="http://emberjs.com/api/classes/RSVP.Promise.html">Ember.RSVP.Promise</a> объект, который всегда выполняет resolve callback при закрытии окна.

<table class="table arguments">
    <tr>
        <td class="param-name">view</td>
        <td class="args">Ember.View | String</td>
        <td>Объект представления, который будет являться телом диалового окна, к которому будет прикреплен контроллер. Строковое значение преобразуется в Ember.View внутри самого менеджера.</td>
    </tr>
    <tr>
        <td class="param-name">controller</td>
        <td class="args">Ember.Controller | Null</td>
        <td>Контроллер прикрепляется к view. Во view становятся доступны свойства контроллера, также все исходящие события могут быть обработаны в контроллере.</td>
    </tr>
    <tr>
        <td class="param-name">dialogOptions</td>
        <td class="args">Object | Null</td>
        <td>Параметры модальника, описаны ниже. Значения объекта доступны внутри шаблона view поскольку становятся параметрами диалогового окна.</td>
    </tr>
</table>

### confirm

Создается окно с двумя кнопками, одна вызывает handler `accept` (кнопка "Yes"), другая `decline` (кнопка "No") у контроллера. Возвращает <a href="http://emberjs.com/api/classes/RSVP.Promise.html">Ember.RSVP.Promise</a> объект, который выполняет resolve callback при успешном закрытии окна, например нажатие на кнопку "OK" или клавишу `enter`, а reject callback при отридцательном закрытии окна, например нажатие на кнопку "Cancel" "No", клавишу `esc` или клик на substrate.

<table class="table arguments">
    <tr>
        <td class="param-name">view</td>
        <td class="args">Ember.View | String</td>
        <td>Объект представления, который будет являться телом диалового окна, к которому будет прикреплен контроллер. Строковое значение преобразуется в Ember.View внутри самого менеджера.</td>
    </tr>
    <tr>
        <td class="param-name">controller</td>
        <td class="args">Ember.Controller | Null</td>
        <td>Контроллер прикрепляется к view. Во view становятся доступны свойства контроллера, также все исходящие события могут быть обработаны в контроллере.</td>
    </tr>
    <tr>
        <td class="param-name">dialogOptions</td>
        <td class="args">Object | Null</td>
        <td>Параметры модальника, описаны ниже. Значения объекта доступны внутри шаблона view поскольку становятся параметрами диалогового окна.</td>
    </tr>
</table>

### custom

Создается окно без кнопок. Их вы должны определить во view. Возвращает <a href="http://emberjs.com/api/classes/RSVP.Promise.html">Ember.RSVP.Promise</a>.

<table class="table arguments">
    <tr>
        <td class="param-name">view</td>
        <td class="args">Ember.View | String</td>
        <td>Объект представления, который будет являться телом диалового окна, к которому будет прикреплен контроллер. Строковое значение преобразуется в Ember.View внутри самого менеджера.</td>
    </tr>
    <tr>
        <td class="param-name">controller</td>
        <td class="args">Ember.Controller | Null</td>
        <td>Контроллер прикрепляется к view. Во view становятся доступны свойства контроллера, также все исходящие события могут быть обработаны в контроллере.</td>
    </tr>
    <tr>
        <td class="param-name">dialogOptions</td>
        <td class="args">Object | Null</td>
        <td>Параметры модальника, описаны ниже. Значения объекта доступны внутри шаблона view поскольку становятся параметрами диалогового окна.</td>
    </tr>
</table>

### notice

Создается окно без кнопок с минимальными отступами, в правом верхнем углу, которое само усчезает через отведенное время (по дефолту 5000ms). Подразумевается, что Вы сами подправите css как Вам нужно.

<table class="table arguments">
    <tr>
        <td class="param-name">view</td>
        <td class="args">Ember.View | String</td>
        <td>Объект представления, который будет являться телом диалового окна, к которому будет прикреплен контроллер. Строковое значение преобразуется в Ember.View внутри самого менеджера.</td>
    </tr>
    <tr>
        <td class="param-name">ms</td>
        <td class="args">Integer</td>
        <td>Продолжительность показа модальника-нотиса.</td>
    </tr>
</table>

## Параметры диалоговых окон

Параметры указываются при создании диалоговых окон и становятся доступными внутри шаблона view поскольку становятся свойствами компонента диалогового окна.


<table class="table arguments">
    <tr>
        <td class="param-name">acceptLabel</td>
        <td class="args">yes</td>
        <td>Текст кнопки "accept"</td>
    </tr>

    <tr>
        <td class="param-name">declineLabel</td>
        <td class="args">no</td>
        <td>Текст кнопки "decline"</td>
    </tr>

    <tr>
        <td class="param-name">acceptClass</td>
        <td class="args">btn-primary</td>
        <td>Класс элемента кнопки "accept"</td>
    </tr>

    <tr>
        <td class="param-name">declineClass</td>
        <td class="args">btn-default</td>
        <td>Класс элемента кнопки "decline"</td>
    </tr>

    <tr>
        <td class="param-name">acceptHandlerName</td>
        <td class="args">accept</td>
        <td>Handler of the controller for "accept" event</td>
    </tr>

    <tr>
        <td class="param-name">declineHandlerName</td>
        <td class="args">decline</td>
        <td>Handler of the controller for "decline" event</td>
    </tr>

    <tr>
        <td class="param-name">substrate</td>
        <td class="args">false</td>
        <td>Block page by an half-opacity div.</td>
    </tr>

    <tr>
        <td class="param-name">title</td>
        <td class="args">&mdash;</td>
        <td>Title of the dialog-window</td>
    </tr>

    <tr>
        <td class="param-name">className</td>
        <td class="args">&mdash;</td>
        <td>Class name for dialog window. In case of different methods like 'alert' or 'confirm' - className is presetted, but you can change it by providing third args.</td>
    </tr>
</table>