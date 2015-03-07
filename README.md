# Ember.Dialog [![Build Status](https://secure.travis-ci.org/wheely/ember-dialog.svg)](http://travis-ci.org/wheely/ember-dialog) [![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/wheely/ember-dialog/blob/master/LICENSE)

## Introduction

This extension allows you to create dialog windows, see the [docs](http://wheely.github.io/ember-dialog/) for more details.

## Installation

### Simple

Download files from `dist/` directory of this repo, put these into `public` directory of your project and then include them.
```html
<link rel="stylesheet" type="text/css" href="/assets/ember.dialog.min.css">
<script type="text/javascript" src="/assets/ember.dialog.min.js"></script>
```

### Bower

Install package via bower:
```shell
$ bower install --save ember-dialog
```

Include scripts and styles:
```javascript
<link rel="stylesheet" type="text/css" href="/bower_components/ember-dialog/dist/ember.dialog.min.css">
<script type="text/javascript" src="/bower_components/ember-dialog/dist/ember.dialog.min.js"></script>
```

### Ember-CLI

You may use addon for ember: [ember-cli-dialog](https://github.com/ajile/ember-cli-dialog). Or you can add just a few lines into your `Brocfile.js`:
```javascript
...
app.import('bower_components/ember-dialog/dist/ember.dialog.min.css');
app.import('bower_components/ember-dialog/dist/ember.dialog.min.js');
...
```


## Getting Started

### Manager

Dialog manager responsable for creation of new modals few types:

| Type    | Specialty                                              |
|---------|--------------------------------------------------------|
| alert   | with one `accept` button                               |
| confirm | with two buttons: `accept` and `decline`               |
| custom  | without any buttons, header and footer (totally blank) |
| notice  | without any buttons with TTL                           |

#### Methods
* **alert** (view, controller, dialogData)
* **confirm** (view, controller, dialogData)
* **custom** (view, controller, dialogData)
* **notice** (view, ms)
* **close** (name)
* **getDialog** (name)

Dialog manager injected into controllers by property name `dialogManager`, also available as a service `dialog:manager` as well.
- The `view` arg can be an `String`, `Ember.View` class or `template name`.
- The `controller` arg can be `Object` or `Ember.Controller` instance.
- The `dialogData` is an `Object`. Look [at here](https://github.com/ajile/ember-dialog/blob/master/app/services/dialog-manager.js#L35) for more info.

Few examples below.

## Example usage

### Alert dialog
Alert dialog has only one `accept` button on a board. Creation method will return `Promise` object, resolve function of it will be executed when person press button "OK" - which triggers event `accept`.

**Simple use case**
```javascript
var message = "Some alert message going here";
var promise = this.get('dialogManager').alert(message);
    promise.then(function() {
        console.log("You are informative!");
    });
```

**Advanced usage**
```javascript
// The name of modal
var name = "my-little-alert",

    // Message to output
    message = "You can't do so!",
    
    // Controller to handle actions
    controller = Ember.Controller.extend({actions: {
        'accept': function () {
            alert("You accepted confirm!");
            return true;
        }
    }}).create(),
    
    // Modal options
    options = {
        name: name,
        title: "Attention!",
        acceptLabel : "yes, of course"
    };

// Manager creates a modal and return a primise object which resolve on accept-close.
var promise = this.get('dialogManager').alert(message, controller, options);

// Execute after successful closed
promise.then(function() {
    alert("You are informative!");
});

// Having a name of the modal we can close it at anywhere
Ember.run.later(this, function() {
   this.get('dialogManager').getDialog(name).close();
}, 10000);
```

### Confirm dialog
Responsable for output an text message or a view with few buttons: `decline` and `accept`. Events from buttons by default handle by dialog component. You're able to redefine standard behaviour by handle these in controller, that you have provided to creation method.

**Output simple message**
Dialog Manager creates view for you if it's haven't provided. Controller will be created as well.
```javascript
// Message to output
var message = "Do you really want to do that?",
    
    // Executes on accept
    accept = function() { alert('Accepted'); },

    // Executes on accept
    decline = function() { alert('Declined'); };

// Creating confirm modal-window
var promise = this.get('dialogManager').confirm(message);

promise.then(accept, decline);
```
**Output view**
```javascript
// Message to output
var message = "Do you really want to do that?",

    // Template used in view
    template = Ember.Handlebars.compile(message),
    
    // Creating view
    view = Ember.View.extend({ template: template });

// Creating confirm modal-window
this.get('dialogManager').confirm(view);
```
**Output message with handlers events in controller**
```javascript
var counter = 0;

// Message to output
var message = "Do you really want to delete user named <b>{{username}}</b>?",

    // Controller to handle events
    controller = Ember.Controller.extend({
        username: "Milkov Vladimir",
        actions: {
            'accept': function () {

                alert("You R accepted confirm!");

                // Close window after 3 accepts
                return ++counter >= 3;
            }
        }
    }).create();

// Creating confirm modal-window
this.get('dialogManager').confirm(message, controller, {title:'Confirm'});
```

### Custom dialog

Custom dialog may be used when behaviour of the controls is differed then standard (shipped by `alert` or `confirm`). For example if you need to create form-dialog window and make `accept` button to submit form and `decline` button to checks form changes before dialog will be closed, to prevent loose unsaved data.

Look at [JSBin gist](https://gist.github.com/ajile/39e94aa0d004adcf9fda).

**First of all you need to put these buttons into your form view.**

```html
<script type="text/x-handlebars" data-template-name="user-form">
    <div class="dialog-header">
        <h4 class="dialog-title">Adding new one</h4>
    </div>
    <form {{action "accept" dialog on="submit"}}>
        <div class="dialog-body">
            {{input value=username placeholder="Enter your name"}}
        </div>
        <div class="dialog-footer">
            <button {{bind-attr class=":btn :btn-primary"}} type="submit">{{dialog.acceptLabel}}</button>
            <button class="btn btn-default" type="button" {{action "decline" dialog}}>{{dialog.declineLabel}}</button>
        </div>
    </form>
</script>
```

**After that declare handlers in controller:**

```javascript
var App = window.App = Ember.Application.create();

// Creating application controller
App.ApplicationController = Em.Controller.extend({

    // Make dependency
    needs: ['user'],

    init: function() {
        // Controller that will be handle dialog's events
        var controller = this.get('controllers.user'),

            // Dialog options
            options = {
                // Accept button's label
                acceptLabel: 'Save',
                // Decline button's label
                declineLabel: 'Cancel'
            };

        // Show dialog
        this.get('dialogManager').custom("user-form", controller, options);
    }
});

// Controller responsable for user changes
App.UserController = Ember.Controller.extend({

    // Field tied with input
    username: null,

    actions: {
        decline: function(dialog) {
            var formChanged = !Ember.isEmpty(this.get('username'));
            if (formChanged) {
                this.get('dialogManager').confirm('Do you like to discard changes?', null, {title:'Close confirm', substrate: true}).then(function() {
                    dialog.close();
                });
            } else {
                return true;
            }
        },

        accept: function (dialog) {
            var formValid = !Ember.isEmpty(this.get('username'));
            if (formValid) {
                this.get('dialogManager').notice("Form saved!");
                // Do some save staff
                dialog.close();
            } else {
                this.get('dialogManager').alert('Form invalid', null, {title:'There is some errors!', substrate: true});
            }
        }
    }
});
```

### Notice dialog
Without any buttons on a board. Outputs only for a 5 seconds (by default) and then disappears.

**Usage**
```javascript
this.get('dialogManager').notice("This message auto disappear after 5 sec.");
this.get('dialogManager').notice("This message auto disappear after 1 sec.", 1000);
```

**Advanced usage**
```javascript
// Name of dialog
var name = 'controllable-notice',

    // Dialog's text
    message = "This message auto disappear after 60 sec or after another action.",

    // Show notice-dialog for a 60s (with given name to find it later)
    promise = this.get('dialogManager').notice(message, 60000, { name: name });

promise.then(function() {
    this.get('dialogManager').notice("Previous notice closed");
}.bind(this));

var dialog = this.get('dialogManager').getDialog(name);

// Whoops.. Notice closed little bit earlier
Ember.run.later(dialog, dialog.accept, 5000);
```


## How to Run Unit Tests

Extension hasn't any tests
