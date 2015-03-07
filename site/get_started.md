---
layout: main
title:  "Get started"
date:   2014-12-24 12:25:40
categories: jekyll update
---

First of all you need to get the `ember-dialog` installed by the suggested ways from the <a href="./installation.html">installation page</a>.

After the installment, a property named `dialogManager` will appear in your `controllers` and `routes` so you could create a dialogs of different types (see below).

Dialog manager operates by `view` and `controller` instances to show dialog for user. Its creates a proper `component`, that wraps view (as a layout) and listens to the events from it. It proxies the events to the controller which, in its turn, sends the events back if it doesn't handle them itself. Components take care of window closing. If an event doesn't come back to the component, the controller should close it by itself.

In controller or routes you can get a `dialog manager` like this one:

{% highlight javascript %}
var manager = this.get('dialogManager');
{% endhighlight %}


## Dialog manager methods

The manager has several methods that provide the creation of dialogs of different types:

<table class="table methods">
    <tr><td class="param-name">alert</td><td>Shows the window with a single button that fires the `accept` event.</td></tr>
    <tr><td class="param-name">confirm</td><td>Shows the window with a couple of buttons. One of them fires the `accept` event, the other one - the `decline` event.</td></tr>
    <tr><td class="param-name">custom</td><td>This modal-window type uses an empty template to give an opportunity to redefine its content. This may be very handy when you want to amend DOM of the modal or the behavior connected with certain amendments.</td></tr>
    <tr><td class="param-name">notice</td><td>This kind of dialog window doesn't have any buttons onboard, as well as other elements. By default it shows up in the upper-right corner (redefine it in `css` if needed). The modal-window of this type disappears after certain time (5 sec by default).</td></tr>
</table>

These methods return `Ember.RSVP.Promise` that may be used for manual window closing. About `Promise` object you may read in the offical Ember documentation.


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