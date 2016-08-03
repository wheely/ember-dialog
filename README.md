# ember-dialog [![Build Status](https://travis-ci.org/wheely/ember-dialog.svg?branch=master)](https://travis-ci.org/wheely/ember-dialog)

Old version (ember-cli-dialog and ember-dialog below v2) outdated and will not be supported.

## Installation

Installing the library is as easy as:

```shell
ember install ember-dialog
```

## About

<img align="right" src="http://dl2.joxi.net/drive/2016/07/14/0007/2363/473403/03/5f20c42c19.png">

An Ember Addon able you to easily create **routable** dialog windows and control their closing. It consists of a service that is available from any object and a component which is a dialog-window itself.

The principle of work is simple. Service is instructed to display a modal window (`show`, `alert`, `confirm` or `blank` methods), creates a component instance with required layout and template, then renders it, and attaches it to the body. At this point, it also creates a Promise, "handles" of which puts into the component and returns it. The component has 2 actions on aboard: one for `resolved` closing, another one for `rejected` closing. Actions available within the template and can be called, for instance by clicking on the button (in the layout or in the template). When you call an action, one of the Promise's method is executed and triggered independent "accepted" or "declined" event. The dialog service when gets the event destroys component object and detaches it from the DOM.

Let's say you want to ask user confirm an action. You should call `show` method of the dialog service with a layout path (you needed dialog window with two buttons - `confirm` layout what you need) and a path to template that you want to show the user in the modal window. Method creates and shows dialog window and returns a Promise, that will become resolved or rejected when window closed (it's depend on which button user has clicked).

```javascript
// The `dialog/confirm` - predefined layout template
// The `messages/hello` - template that you'd like to show.
// Notice: this template should be found in your project by path `app/templates/messages/hello`
const layoutName = "dialog/confirm";
const templateName = "messages/hello";
const promise = this.get("dialog").show(layoutName, templateName);

const yes = () => { console.log(`yes pressed`); };
const no = () => { console.log(`no pressed`); };

promise.then(yes, no);
```

For more information and demos, visit the [site](http://wheely.github.io/ember-dialog/).

## Dialog types (predefined layouts)

ember-dialog has next layouts on aboard: `alert`, `confirm` and `blank`.

### Alert

This layout has only 'yes' - button clicking on which the modal window closes as `resolved`. It also has X-button which closes modal window as `resolved`. The `promise` object always resolved on modal closing. May be used for showing an information to the user. See [docs](http://wheely.github.io/ember-dialog/docs/module-ember-dialog_services_dialog.html#-inner-alert__anchor).

### Confirm

In practice, the most widely used layout. It has 2 buttons, which closes dialog window. One of them closes window as `resolved`, another one closes as `rejected`. It also has X-button which closes window as `rejected` (for obvious reasons). See [docs](http://wheely.github.io/ember-dialog/docs/module-ember-dialog_services_dialog.html#-inner-confirm__anchor).

### Blank

The most simple layout. It has nothing on aboard. May be used for creating custom dialog windows with its own logic of showing elements and closing. In practice often used for showing forms, in this cases accept closing carried on submit action. Convenient to use in conjunction with ember-validation (TBD:Usecase). See [docs](http://wheely.github.io/ember-dialog/docs/module-ember-dialog_services_dialog.html#-inner-blank__anchor).

## Styles

Styles were written on sass language, you're able to include them into you project.

Add path to `sassOptions.includePaths` in your `ember-cli-build.js` (example below).

```javascript
var app = new EmberApp(defaults, {
  sassOptions: {
    includePaths: [ 'node_modules/ember-dialog/addon/styles' ]
  }
});
```

Include them in your `app/styles/app.scss`:

```sass
@import "ember-dialog";
```

If you have your own style of the dialog windows you may use just structure styles:

```sass
@import "ember-dialog/structure";
```

## Usage

### Showing user a simple message from controller

```javascript
export default Ember.Controller({

  showDialog() {
    // Will be used `app/templates/error-message.hbs`
    this.get("dialog").alert("error-message");
  }

});
```


### Showing user a simple message from template

```hbs
  <button onclick={{action dialog.alert "confirm-delete" this (hash acceptHandler=(action "deleteRecord"))}}>Delete record</button>
```


### Showing user a simple message to confirm action

```javascript
export default Ember.Controller({

  showDialog() {

    const yes = () => { console.log("Yes"); };
    const no = () => { console.log("No"); };

    // Will be used `app/templates/messages/are-you-sure.hbs`
    this.get("dialog").confirm("messages/are-you-sure").then(yes, no);

  }

});
```


### Binding data in the dialog

Controller:
```javascript
export default Ember.Controller({

  now: now Date(),

  model: { username: "ajile" },

  showDialog() {

    // Will be used `app/templates/messages/hello.hbs`
    this.get("dialog").alert("messages/hello", this);

  }

});
```

Template `messages/hello.hbs`:
```hbs
<div>Hello, {{contextObject.model.username}}! Now: {{contextObject.now}}. Click <button onclick={{action "accept"}}>the button</button> to close the dialog.</div>
```


### Interrupt closing of the dialog window

```javascript
export default Ember.Controller({

  count: 0,

  showDialog() {
    // Will be used `app/templates/messages/click-counter.hbs`
    this.get("dialog").alert("messages/click-counter", null, {
      acceptHandler: "yesHandler"
    });
  },

  actions: {
    yesHandler(presenter) {
      const count = this.get("count");
      if (count < 5) {
        console.log("Count less then five");
        this.set("count", ++count);
      } else {
        presenter.accept();
      }
    }
  }

});
```

### Manual closing dialog window

```javascript
export default Ember.Controller({

  showDialog() {

    // Any created dialog will be closed in 1s
    this.get("dialog").on("created", (presenter) => {
      Ember.run.later(presenter, presenter.accept, 1000);
    });

    // Will be used `app/templates/messages/something.hbs`
    this.get("dialog").alert("messages/something");

  }

});
```

### Creating new layouts

Controller:

```javascript
export default Ember.Controller({

  showDialog() {
    // Will be used `app/templates/dialog-layouts/delete.hbs` as layout and
    // `app/templates/messages/are-you-sure.hbs` as template.
    this.get("dialog").show("dialog-layouts/delete", "messages/delete-user");
  }

});
```

Template `dialog-layouts/delete.hbs`:
```hbs
<h1 style="color: #F00;">Confirm Deletion</h1>
<div class="body">
  {{yield}}
</div>
<button class="danger" onclick={{action "accept"}}>DELETE!</button>
<button onclick={{action "decline"}}>Cancel</button>
```

Template `messages/delete-user.hbs`:
```hbs
Really?
```

The result:
```html
<h1 style="color: #F00;">Confirm Deletion</h1>
<div class="body">
  Really?
</div>
<button class="danger" onclick="function(){...}">DELETE!</button>
<button onclick="function(){...}">Cancel</button>
```

### Extend dialog manager

Execute `ember g service dialog`.

File `app/services/dialog.js`:
```javascript
import Dialog from "ember-dialog/services/dialog";

export default Dialog.extend({

  confirmDelete() {
    const args = Array.prototype.slice.apply(arguments);
    args.unshift("dialog-layouts/delete");
    this.show(...args);
  }

});
```

## Cookbook

### Creating form dialog

TBD
