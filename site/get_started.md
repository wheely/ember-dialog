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


## Dialog manager types (methods)

The manager has several methods that provide the creation of dialogs of different types (see below). To view list of all methods look at <a href="https://github.com/wheely/ember-dialog/blob/master/app/services/dialog-manager.js">source code of the dialog-manager</a>.

<table class="table methods">
    <tr><td class="param-name">alert</td><td>Shows the window with a single button that fires the `accept` event.</td></tr>
    <tr><td class="param-name">confirm</td><td>Shows the window with a couple of buttons. One of them fires the `accept` event, the other one - the `decline` event.</td></tr>
    <tr><td class="param-name">custom</td><td>This modal-window type uses an empty template to give an opportunity to redefine its content. This may be very handy when you want to amend DOM of the modal or the behavior connected with certain amendments.</td></tr>
    <tr><td class="param-name">notice</td><td>This kind of dialog window doesn't have any buttons onboard, as well as other elements. By default it shows up in the upper-right corner (redefine it in `css` if needed). The modal-window of this type disappears after certain time (5 sec by default).</td></tr>
</table>

These methods return <a href="http://emberjs.com/api/classes/RSVP.Promise.html">Ember.RSVP.Promise</a> that may be used to realise post factum logic. In addition to these four types of windows you can create another one, by extending dialog-manager service, the instruction is on `customising & translations` page.


### Alert

Dialog-window has got just one button which fires `accept` event. May be used to notify a user about errors, warnings and information messages.

<table class="table arguments">
    <tr>
        <td class="param-name">view *</td>
        <td class="args">
            <div><a href="http://emberjs.com/api/classes/Ember.View.html">Ember.View</a></div>
            <div>String</div>
        </td>
        <td>
            Representation object which is inserted into the content part of the dialog's layout. Controller, if provided, is connecting to listen to the events. String value is transforming into the template-function, wrapped by auto-created `view`.
        </td>
    </tr>
    <tr>
        <td class="param-name">controller</td>
        <td class="args">
            <div><a href="http://emberjs.com/api/classes/Ember.Controller.html">Ember.Controller</a></div>
        </td>
        <td>
            This argument isn't required. `Controller` is connecting to `view`, thus providing data to view and to be able to listen to the events.
        </td>
    </tr>
    <tr>
        <td class="param-name">dialogOptions</td>
        <td class="args">
            <div>Object</div>
        </td>
        <td>
            `Dialog params` have an influence upon `view` rendering. Also merges with dialog-component's data to become available from Handlebar template (see list below).
        </td>
    </tr>
</table>

### confirm

Dialog-window with a couple of buttons. One of them fires the `accept` event, the other one - the `decline` event.

<table class="table arguments">
    <tr>
        <td class="param-name">view *</td>
        <td class="args">
            <div><a href="http://emberjs.com/api/classes/Ember.View.html">Ember.View</a></div>
            <div>String</div>
        </td>
        <td>
            Representation object which is inserted into the content part of the dialog's layout. Controller, if provided, is connecting to listen to the events. String value is transforming into the template-function, wrapped by auto-created `view`.
        </td>
    </tr>
    <tr>
        <td class="param-name">controller</td>
        <td class="args">
            <div><a href="http://emberjs.com/api/classes/Ember.Controller.html">Ember.Controller</a></div>
        </td>
        <td>
            This argument isn't required. `Controller` is connecting to `view`, thus providing data to view and to be able to listen to the events.
        </td>
    </tr>
    <tr>
        <td class="param-name">dialogOptions</td>
        <td class="args">
            <div>Object</div>
        </td>
        <td>
            `Dialog params` have an influence upon `view` rendering. Also merges with dialog-component's data to become available from Handlebar template (see list below).
        </td>
    </tr>
</table>

### custom

The dialog-window creates without any buttons, you may define these by yourself. This may be very handy when you want to create a form that has `accept` button onboard which submit the form.

<table class="table arguments">
    <tr>
        <td class="param-name">view *</td>
        <td class="args">
            <div><a href="http://emberjs.com/api/classes/Ember.View.html">Ember.View</a></div>
            <div>String</div>
        </td>
        <td>
            Representation object which is inserted into the content part of the dialog's layout. Controller, if provided, is connecting to listen to the events. String value is transforming into the template-function, wrapped by auto-created `view`.
        </td>
    </tr>
    <tr>
        <td class="param-name">controller</td>
        <td class="args">
            <div><a href="http://emberjs.com/api/classes/Ember.Controller.html">Ember.Controller</a></div>
        </td>
        <td>
            This argument isn't required. `Controller` is connecting to `view`, thus providing data to view and to be able to listen to the events.
        </td>
    </tr>
    <tr>
        <td class="param-name">dialogOptions</td>
        <td class="args">
            <div>Object</div>
        </td>
        <td>
            `Dialog params` have an influence upon `view` rendering. Also merges with dialog-component's data to become available from Handlebar template (see list below).
        </td>
    </tr>
</table>

### notice

Creates dialog window without any controls. Its appear in the upper-right corner and disappear by itself after certain time.

<table class="table arguments">
    <tr>
        <td class="param-name">view *</td>
        <td class="args">
            <div><a href="http://emberjs.com/api/classes/Ember.View.html">Ember.View</a></div>
            <div>String</div>
        </td>
        <td>
            Representation object which is inserted into the content part of the dialog's layout. Controller, if provided, is connecting to listen to the events. String value is transforming into the template-function, wrapped by auto-created `view`.
        </td>
    </tr>
    <tr>
        <td class="param-name">ms</td>
        <td class="args">Integer</td>
        <td>
            Duration of the notice showing.
        </td>
    </tr>
</table>

## Dialog-window params

`Dialog params` have an influence upon `view` rendering. Also merges with dialog-component's data to become available from Handlebar template (see list below).

<table class="table arguments">
    <tr>
        <td class="param-name">acceptLabel</td>
        <td class="args">yes</td>
        <td>Label of the button triggers "accept"</td>
    </tr>

    <tr>
        <td class="param-name">declineLabel</td>
        <td class="args">no</td>
        <td>Label of the button triggers "decline"</td>
    </tr>

    <tr>
        <td class="param-name">acceptClass</td>
        <td class="args">btn-primary</td>
        <td>CSS classname of the button "accept"</td>
    </tr>

    <tr>
        <td class="param-name">declineClass</td>
        <td class="args">btn-default</td>
        <td>CSS classname of the button "decline"</td>
    </tr>

    <tr>
        <td class="param-name">acceptHandlerName</td>
        <td class="args">accept</td>
        <td>The controller's handler for "accept" event</td>
    </tr>

    <tr>
        <td class="param-name">declineHandlerName</td>
        <td class="args">decline</td>
        <td>The controller's handler for "decline" event</td>
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