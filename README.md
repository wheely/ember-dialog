# Ember.Dialog [![Build Status](https://secure.travis-ci.org/wheely/ember-dialog.svg)](http://travis-ci.org/wheely/ember-dialog)

## Introduction

This extension allows you to create dialogs, modal windows and other pop-up objects.

## Installation

### Simple

Download files from the `dist/` directory of this repo, put these into `public` directory of your project and include into your page.
```html
<link rel="stylesheet" type="text/css" href="/assets/ember.dialog.min.css">
<script type="text/javascript" src="/assets/ember.dialog.min.js"></script>
```

### Bower

Install package via bower:
```shell
$ bower install --save ember-dialog
```

Include scripts and styles into page:
```javascript
<link rel="stylesheet" type="text/css" href="/bower_components/ember-dialog/dist/ember.dialog.min.css">
<script type="text/javascript" src="/bower_components/ember-dialog/dist/ember.dialog.min.js"></script>
```


## Getting Started

### Manager

Dialog manager responsable for creation of new dialogs few types:
* `alert` - with one `accept` button
* `confirm` - with two `accept` and `decline` buttons
* `custom` - without buttons, header, footer (totally blank) - to redefine these in view's template
* `notice` - without any buttons with TTL

#### Methods
* **confirm** ({Ember.View|String} view, {Ember.Controller} controller, {Object} dialogData)
* **custom** ({Ember.View|String} view, {Ember.Controller} controller, {Object} dialogData)
* **notice** ({Ember.View|String} view, {Number} ms)
* **open** (name, {Ember.View|String} view, {Ember.Controller} controller, {Object} dialogData, setActive)
* **close** (name)
* **getDialog** (name)
* **setDialog** (name, instance)


Dialog manager injected into all controllers by property name `dialogManager`.
Few examples below.

## Example usage

### Alert dialog
Alert dialog have only one `accept` button on a board. Creation method will return `Promise` object, resolve function in it will be executed when person press button "OK" - which triggers event `accept`, that you may want to catch in controller that you may have to provide.

**Simple use case**
```javascript
var message = "You can't do so!";
this.get('dialogManager').alert(message).then(function() { alert("You are informative!"); });
```

**Advanced usage**
```javascript
var message = "You can't do so!";
var controller = Ember.Controller.extend({actions: {
    'accept': function () { alert("You R declined confirm!"); }
}});
var name = "my-little-alert";
var options = { title: "ATTENTION!", name: name };
this.get('dialogManager').alert(message, controller, options).then(function() {
    alert("You are informative!");
});
Ember.run.later(this, function() {
    this.get('dialogManager').getDialog(name).close();
}, 10000);
```

### Confirm dialog
Responsable for output an message or view with few buttons: `decline` and `accept`. Events from buttons by default handled by dialog component. You able to redefine standard behaviour by handle these in controller, that you provided to creation method.

**Output simple message**
Dialog Manager creates needle view for you. Also you may do not pass a controller, it's will be created as well.
```javascript
var message = "Do you really want to do that?";
var p = this.get('dialogManager').confirm(message, this);
p.then(function(dialog) { alert('Well done'); return false; })
```
**Output view**
```javascript
var template = Ember.Handlebars.compile("Do you really want to do that?");
var view = Ember.View.create({ template: template });
var p = this.get('dialogManager').confirm(view, this);
p.then(null, function(dialog) { alert("You can't reject this message!"); return true; })
```
**Output view with handle events from it in controller**
```javascript
var controller = Ember.Controller.extend({actions: {
    'decline': function () { alert("You R declined confirm!"); }
}});
this.get('dialogManager').confirm(view, controller);
```

### Custom dialog

Custom dialog may be used when behaviour of the controls differed then standard (shipped by `alert` or `confirm`). For example if you need to create form-dialog window and make `accept` button to submit form and `decline` button to checks form changes before dialog will be closed, to prevent loose unsaved data.

**First of all you need to put these buttons into your form view.**

```html
<div class="dialog-header">
    <h4 class="dialog-title">Adding new one</h4>
</div>
<form {{action "accept" target on="submit"}}>
    <div class="dialog-body">
        <input type="text" name="field_1" />
    </div>
    <div class="dialog-footer">
        <button class="btn btn-primary" type="submit">{{translate-path target.acceptLabel}}</button>
        <button class="btn btn-default" type="button" {{action "decline" target}}>{{translate-path target.declineLabel}}</button>
    </div>
</form>
```

**After that declare handlers in controller:**

```javascript
App.TestController = Ember.Controller.extand({
    actions: {
        decline: function(dialog) {
            var formChanged = true;
            if (formChanged) {
                DialogManager.confirm('Are you sure?', null, {title:'Close confirm', substrate: true}).then(function() {
                    dialog.close();
                });
            } else {
                return false;
            }
        },

        accept: function (dialog) {
            var formValid = true;
            if (formValid) {
                // Do some save staff
                dialog.close();
            } else {
                DialogManager.alert('Form invalid', null, {title:'There is some errors!', substrate: true});
            }
        }
    }
}).create();
```

**And show your dialog:**
```javascript
var controller = this.get('controllers.test');
var view = this.get('view.test');
this.get('dialogManager').custom(view, controller, {title: "Create new"}).then(function() {
    alert('Created!');
});
```

### Notice dialog
Without any buttons on a board. Output only for a 5 seconds (by default) and then disappear.

**Usage**
```javascript
this.get('dialogManager').notice("This message auto disappear after 5 sec.");
this.get('dialogManager').notice("This message auto disappear after 1 sec.", 1000);
```

**Advanced usage**
```javascript
var name = 'controllable-notice';
var message = "This message auto disappear after 60 sec or after another action.";
var p = this.get('dialogManager').notice(message, 60000, { name: name });
p.then(function() { alert("I'm closed!"); });

var dialog = this.get('dialogManager').getDialog(name);

Ember.run.later(this, function() {
    // Whoops.. Notice closed little bit earlier
    dialog.close();
}, 10000);
```


## How to Run Unit Tests

Extension haven't yet unit tests