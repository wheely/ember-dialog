(function(){
define(
  "ember-dialog/components/presenter",
  ["ember-dialog/utils/highest-zindex", "exports"],
  function(ember$dialog$lib$utils$highest$zindex$$, __exports__) {
    "use strict";

    function __es6_export__(name, value) {
      __exports__[name] = value;
    }

    var maxZIndex;
    maxZIndex = ember$dialog$lib$utils$highest$zindex$$["default"];

    var computed = Ember.computed;
    var observer = Ember.observer;

    var Presenter;

    Presenter = Ember.Component.extend({

      /**
        @property layoutName
        @type {String}
      */
      layoutName: 'dialog',

      /**
        Visibilities state of the dialog.

        @property isVisible
        @type Boolean
        @default false
      */
      isVisible: false,

      fixedZIndex: false,

      /**
        The dialog is active now.

        @property isActive
        @type Boolean
        @default false
      */
      isActive: computed('name', 'dialogManager.active', function() {
        return this.get('name') === this.get('dialogManager.active');
      }),

      /**
        Make dialog's z-index property biggest.

        @method _visibleDidChange
        @private
      */
      _visibleDidChange: observer('isVisible', function() {

        // Element not visible - do not recalculate z-index for it
        if (!this.get('isVisible')) {
          return;
        }

        // Element inserting now - we should asynchronize enlargement of
        // z-index css property. This method will not be executed while current
        // method will not be finished.
         Ember.run.scheduleOnce('afterRender', this, function() {

          var dialog, zindex;

          // If z-index should be fixed - do not change it
          if (!this.get("fixedZIndex")) {
            // Biggest z-index
            zindex = maxZIndex();

            // Component element (wrapper of dialog-element)
            // Dialog element
            dialog = this.$('.dialog-dialog');

            // Set z-index biggest then biggenest
            dialog.css({'z-index': zindex + 1});
          }

          this.focus();

        });

      }),

      /**
        Show dialog window.

        @method show
        @chainable
      */
      show: function() {
        return this.set('isVisible', true);
      },

      /**
        Hide dialog window.

        @method hide
        @chainable
      */
      hide: function() {
        this.set('isVisible', false);
      },

      /**
        Hide this dialog and mark as closed.

        @method close
        @return {Ember.RSVP.Promise}
      */
      close: function() {
        return this.get('dialogManager').close(this.get('name'));
      },

      /**
        Reject promise and close dialog.

        @method decline
        @chainable
      */
      decline: function() {
        Ember.ENV.LOG_DIALOG && Ember.Logger.log('✘ %cDecline action%c: ' + this.get('name'), 'font-weight: 900; color: #900;', null);
        if (this.has('rejected')) {
          this.get('rejected').call(this, this);
        }
        this.close();
        return this;
      },

      /**
        Resolve promise and close dialog.

        @method decline
        @chainable
      */
      accept: function() {
        Ember.ENV.LOG_DIALOG && Ember.Logger.log('✓ %cConfirm action%c ' + this.get('name'), 'font-weight: 900; color: #070;', null);
        if (this.has('resolved')) {
          this.get('resolved').call(this, this);
        }
        this.close();
        return this;
      },

      /**
        Handler for a key-down events. Close dialog on pressing escape.

        @method keyDown
      */
      keyDown: function(e) {
        var viewsController;
        if (this.get("isActive")) {
          viewsController = this.get('childViews')[0].get('controller');
          if (e.keyCode === 27) {
            viewsController.send(this.get("declineHandlerName"), this);
            return false;
          }
          if (e.keyCode === 13) {
            viewsController.send(this.get("acceptHandlerName"), this);
            return false;
          }
        }
      },

      /**
        Handler for a click events. Close dialog on clicking on substrate.

        @method keyDown
      */
      click: function(e) {
        if (Ember.$(e.target).hasClass('substrate')) {
          this.close();
        }
      },

      /**
        Focusing on a dialog-window.

        @method focus
      */
      focus: function() {
          var firstInput = this.$().find('input:visible:first, button:visible:not(.close):first').first();

          // Trying to search input element or button to focus it
          if (firstInput.size()) {
            firstInput.focus();
          } else {
            this.$('.dialog-content').focus();
          }
      },

      /**
        Contains event handlers
        @attribute {Function} decline - Executed on click `close` button. Close promise as rejected.
        @attribute {Function} accept  - Executed on click `done` button. Close promise as resolved.
        @type Object
      */
      actions: {

        /**
          Occures when button type "close" clicked.
          @method decline
        */
        decline: function(dialog) {
          this.decline();
        },

        /**
          Occures when button type "done" clicked.
          @method decline
        */
        accept: function(dialog) {
          this.accept();
        }

      }

    });

    __es6_export__("Presenter", Presenter);
    __es6_export__("default", Presenter);
  }
);

//# sourceMappingURL=presenter.js.map
/**
  @module ember-dialog
*/

/**
  All Ember Dialog methods and functions are defined inside of this namespace.
  @class Dialog
  @static
*/

/**
  @property VERSION
  @type String
  @default '2.0.0-beta'
  @static
*/
/*jshint -W079 */
define("ember-dialog/core", ["exports"], function(__exports__) {
  "use strict";

  function __es6_export__(name, value) {
    __exports__[name] = value;
  }

  var Dialog = Ember.Namespace.create({
    VERSION: '2.0.0-beta'
  });

  if (Ember.libraries) {
    Ember.libraries.registerCoreLibrary('Ember Dialog', Dialog.VERSION);
  }

  __es6_export__("default", Dialog);
});

//# sourceMappingURL=core.js.map
define(
  "ember-dialog/ember-initializer",
  ["ember-dialog/setup-container", "exports"],
  function(ember$dialog$lib$setup$container$$, __exports__) {
    "use strict";

    function __es6_export__(name, value) {
      __exports__[name] = value;
    }

    var setupContainer;
    setupContainer = ember$dialog$lib$setup$container$$["default"];

    // var K = Ember.K;

    Ember.onLoad('Ember.Application', function(Application) {

      Application.initializer({
        name:       "ember-dialog",
        initialize: setupContainer
      });

      // Deprecated initializers to satisfy old code that depended on them

      // Application.initializer({
      //   name:       "store",
      //   after:      "ember-data",
      //   initialize: K
      // });

      // Application.initializer({
      //   name:       "activeModelAdapter",
      //   before:     "store",
      //   initialize: K
      // });

      // Application.initializer({
      //   name:       "transforms",
      //   before:     "store",
      //   initialize: K
      // });

      // Application.initializer({
      //   name:       "data-adapter",
      //   before:     "store",
      //   initialize: K
      // });

      // Application.initializer({
      //   name:       "injectStore",
      //   before:     "store",
      //   initialize: K
      // });
    });
  }
);

//# sourceMappingURL=ember-initializer.js.map
define(
  "ember-dialog/initializers/manager",
  ["ember-dialog/system/manager", "exports"],
  function(ember$dialog$lib$system$manager$$, __exports__) {
    "use strict";

    function __es6_export__(name, value) {
      __exports__[name] = value;
    }

    var Manager;
    Manager = ember$dialog$lib$system$manager$$["Manager"];
    function initializeDialogManager(registry) {
      registry.register('dialog:manager', Manager, { singleton: true });
      registry.injection('controller', 'dialogManager', 'dialog:manager');
      registry.injection('dialog:presenter', 'dialogManager', 'dialog:manager');
    }
    __es6_export__("default", initializeDialogManager);
  }
);

//# sourceMappingURL=manager.js.map
define(
  "ember-dialog/initializers/presenter",
  ["ember-dialog/components/presenter", "exports"],
  function(ember$dialog$lib$components$presenter$$, __exports__) {
    "use strict";

    function __es6_export__(name, value) {
      __exports__[name] = value;
    }

    var Presenter;
    Presenter = ember$dialog$lib$components$presenter$$["Presenter"];
    function initializeDialogComponent(registry) {
      registry.register('dialog:presenter', Presenter);
    }
    __es6_export__("default", initializeDialogComponent);
  }
);

//# sourceMappingURL=presenter.js.map
/**
  Ember Dialog
  @module ember-dialog
  @main ember-dialog
*/
define(
  "ember-dialog",
  ["ember-dialog/ember-initializer", "ember-dialog/setup-container", "ember-dialog/core", "ember-dialog/system/manager", "ember-dialog/components/presenter", "exports"],
  function(
    ember$dialog$lib$ember$initializer$$,
    ember$dialog$lib$setup$container$$,
    ember$dialog$lib$core$$,
    ember$dialog$lib$system$manager$$,
    ember$dialog$lib$components$presenter$$,
    __exports__) {
    "use strict";

    function __es6_export__(name, value) {
      __exports__[name] = value;
    }

    var setupContainer;
    setupContainer = ember$dialog$lib$setup$container$$["default"];
    var Dialog;
    Dialog = ember$dialog$lib$core$$["default"];
    var Manager;
    Manager = ember$dialog$lib$system$manager$$["Manager"];
    var Presenter;
    Presenter = ember$dialog$lib$components$presenter$$["Presenter"];

    Dialog.Manager = Manager;
    Dialog.Presenter = Presenter;

    Dialog._setupContainer = setupContainer;

    Ember.lookup.Dialog = Dialog;

    __es6_export__("default", Dialog);
  }
);

//# sourceMappingURL=main.js.map
define(
  "ember-dialog/setup-container",
  ["ember-dialog/initializers/manager", "ember-dialog/initializers/presenter", "exports"],
  function(
    ember$dialog$lib$initializers$manager$$,
    ember$dialog$lib$initializers$presenter$$,
    __exports__) {
    "use strict";

    function __es6_export__(name, value) {
      __exports__[name] = value;
    }

    var initializeDialogManager;
    initializeDialogManager = ember$dialog$lib$initializers$manager$$["default"];
    var initializeDialogPresenter;
    initializeDialogPresenter = ember$dialog$lib$initializers$presenter$$["default"];
    function setupContainer(container, application) {
      // application is not a required argument. This ensures
      // testing setups can setup a container without booting an
      // entire ember application.

      initializeDialogManager(container, application);
      initializeDialogPresenter(container, application);
    }
    __es6_export__("default", setupContainer);
  }
);

//# sourceMappingURL=setup-container.js.map
define("ember-dialog/system/manager", ["exports"], function(__exports__) {
  "use strict";

  function __es6_export__(name, value) {
    __exports__[name] = value;
  }

  var Manager;

  var Service = Ember.Service;
  if (!Service) {
    Service = Ember.Object;
  }

  Manager = Service.extend(Ember.Evented, {

    /**
      Used to insert the dialog windows if `namespace` of incoming `controller`
      does not contain `rootElement` property.

      @public
      @property rootElement
      @type String
      @default 'body'
    */
    rootElement: 'body',

    /**
      A dict that contains default settings of a dialog manager.

      @public
      @property defaults
      @attribute {Number} ms   - Milliseconds before notice dialog closing
      @type Object
    */
    defaults: {
      ms: 5000,
      decline: 'decline',
      accept: 'accept'
    },

    /**
      A dict that contains default settings of a dialog component.

      @public
      @property dialogData
      @attribute {String} accept    - Text for "YES" button
      @attribute {String} decline   - Text for "NO" button
      @attribute {String} title     - Text in header
      @attribute {Boolean} substrate
      @type Object
    */
    dialogData: {
      acceptLabel: 'yes',
      declineLabel: 'no',
      acceptClass: 'btn-primary',
      declineClass: 'btn-default',
      acceptHandlerName: 'accept',
      declineHandlerName: 'decline',
      substrate: false,
      title: '',
      className: ''
    },

    /**
      Name of the active dialog is used to determine which dialog will be closed
      on the `escape` key-down handler.

      @property active
      @type String
    */
    active: Ember.computed.alias('dialogsList.lastObject'),

    /**
      The list of dialog names laid in closing order.

      @property dialogsList
      @type Ember.Array
    */
    dialogsList: Ember.makeArray(),

    /**
      Property contains all created modals.

      @private
      @property _dialogs
      @type Ember.Object
    */
    _dialogs: Ember.Object.create(),

    /**
      Destroys all created dialogs. Mat be useful to get rid of all opened
      dialogs. This method calls `destroy` method of each created dialog in the
      list.

      @method destroy
    */
    destroy: function() {
      Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Destroying!', 'font-weight: 900;', null);
      var dialogList = this.get('dialogsList'), name, dialog;
      for(var i in dialogList) {
        if (!dialogList.hasOwnProperty(i)) { continue; }
        if (Ember.isBlank(dialogList[i])) { continue; }
        name = dialogList[i];
        dialog = this.get('_dialogs').get(name);
        this._destroyDialog(name);
      }
      return this._super.apply(this, arguments);
    },

    /**
      Flushes dialog list and list of the dialogs was created, returns targets
      to the controllers then remove them from the list.
      @method reset
    */
    reset: function () {
      this.dialogsList = [];
      this._dialogs = Ember.Object.create();
      return this._super.apply(this, arguments);
    },

    /**
      Alert-dialog window. Contains predefined 1 button.

      @example
      ```javascript
        var expectation = 10000,
          name = 'occure-error',
          view = 'Is a reason of this message. Application will be reloaded after \
              you close this window',
          title = "Unexpected error";

        // Function applied after closing
        var closed = function() {
          Ember.ENV.LOG_DIALOG && Ember.Logger.log('Dialog closed. User read the text of it.');
          // ...as we prompted to do so
          window.location.reload();
        };

        // Show confirm message and get `promise`
        var p = this.get("dialogManager").alert(name, view, this, {title: title, name: name}).then(closed);

        setTimeout(function(){
          // Can't wait too long before the user accepts or declines the confirm message. Close it
          // after `expectation` seconds. We can do so because we have the name of the dialog.
          // After dialog close occured `resolve` callback.
          this.get("dialogManager").getDialog(name)
        }, expectation);
      ```

      @method alert
      @param {String} name          - The name of the dialog to identify it.
      @param {String|Ember.View} view     - The content part.
      @param {Ember.Controller} controller  - The `controller` to listen to `view` actions.
      @param {String} title         - Dialog title.
      @return {Ember.RSVP.Promise}      - Promise to close dialog
    */
    alert: function(view, controller, dialogData) {
      // If comes dialog's data set it else set empty object to merge with default settings
      dialogData = Ember.typeOf(dialogData) === 'object' ? dialogData : {};
      // Getting provided class name
      var className = dialogData.className || '';
      // Merging incoming dialog data with defaults data
      dialogData = Ember.$.extend({}, this.get('dialogData'), dialogData, {className: ['alert', className].join(' ')});
      // Creating dialog `alert` type
      return this._openWithLayout('dialogs/alert', view, controller, dialogData);
    },

    /**
      Confirm-dialog window. Contains predefined 2 buttons.

      @example
      ```javascript
        var expectation = 10000,
          name = 'delete-driver',
          view = 'Do you really want to delete the driver?',
          controller = this.container.lookup('controller:driver'),
          title = "Delete driver";

        // Show confirm message, get promise
        var p = this.get("dialogManager").confirm(view, controller, {title: title, name: name});

        // Function applied after close with deletion
        var done = function() { Ember.ENV.LOG_DIALOG && Ember.Logger.log('Driver deleted'); };

        // Function applied after close without deletion
        var decline = function(parentDialog) {
          // On close show another confirm message to user to confirm
          // closing window without saving
          this.get("dialogManager").confirm("R you sure?").then(function() {
            parentDialog.close();
          });
        };

        // Release promise
        p.then(done, decline);

        setTimeout(function(){
          // Can't wait to long before user accept or decline confirm message. Close it
          // after `expectation` seconds. We can do so cause we have a name of the dialog.
          // After dialog close occured `reject` callback.
          this.get("dialogManager").close(name);
          // Or we can do like this: `this.get("dialogManager").getDialog(name).hide();`
        }, expectation);
      ```

      @method confirm
      @param {String} name          - The name of the dialog to identify.
      @param {String|Ember.View} view     - The content part.
      @param {Ember.Controller} controller  - The controller to listen to view actions.
      @param {String} title         - Dialog title.
      @return {Ember.RSVP.Promise}      - Promise to close dialog
    */
    confirm: function(view, controller, dialogData) {
      // If comes dialog's data set it else set empty object to merge with default settings
      dialogData = Ember.typeOf(dialogData) === 'object' ? dialogData : {};
      // Getting provided class name
      var className = dialogData.className || '';
      // Merging incoming dialog data with defaults data
      dialogData = Ember.$.extend({}, this.get('dialogData'), dialogData, {className: ['confirm', className].join(' ')});
      // Creating dialog `confirm` type
      return this._openWithLayout('dialogs/confirm', view, controller, dialogData);
    },

    /**
      Blank-dialog window. No content at all. You probably want to use it if you whould like to
      define buttons you need in the view's template.

      @example
      ```javascript
        var name = 'record-form',
          view = 'record',
          title = "Add new record",
          controller = Ember.Controller.extend({
            actions: {
              // This function here because I want to show that you may to
              // redeclare it too.
              decline: function(dialog) {
                // Returns true because otherwise dialog's component do not
                // get bubbled event and will don't close current dialog.
                return true;
              }

              // This function here because I want to show that you may to
              // redeclare it too.
              accept: function(dialog) {
                if (this.get('isValid')) {
                  return true;  // Close dialog as resolved

                  // Or you can do like this:
                  // setTimeout(dialog.accept, 1000); // Close dialog as resolved
                  // setTimeout(dialog.decline, 1000); // Close dialog as rejected
                  // return false; // Leave open dialog (do not bubble up)
                }
                return false;  // Leave open dialog (do not bubble up)
              }
            }
          }).create();

        // Show confirm message, get promise
        var p = this.get("dialogManager").alert(view, controller, title);
      ```

      Also you are may to trigger action at view.
      @example
      ```
        <button class="btn btn-primary" type="button" {{action "accept" this}}>{{translate-path 'yes'}}</button>
        <button class="btn btn-default" type="button" {{action "decline" this}}>{{translate-path 'no'}}</button>
      ```

      @method confirm
      @param {String} name          - The name of the dialog to identify.
      @param {String|Ember.View} view     - The content part.
      @param {Ember.Controller} controller  - The controller to listen to view actions.
      @param {String} title         - Dialog title.
      @todo
      @return {Ember.RSVP.Promise}      - Promise to close dialog
    */
    custom: function(view, controller, dialogData) {
      // If dialog data comes, set it otherwise set an empty object to merge with default settings
      dialogData = Ember.typeOf(dialogData) === 'object' ? dialogData : {};
      // Getting provided class name
      var className = dialogData.className || '';
      // Merging incoming dialog data with default data
      dialogData = Ember.$.extend({}, this.get('dialogData'), dialogData, {className: ['custom', className].join(' ')});
      // Creating dialog `custom` type
      return this._openWithLayout('dialogs/custom', view, controller, dialogData);
    },

    /**
      Notice-dialog window disappears after given time.

      @example
      ```javascript
        // Show template for 1 second.
        this.get("dialogManager").notice('permission_denied');

        // Show template for 5 seconds.
        this.get("dialogManager").notice('permission_denied', 5000);

        // Show a simple message.
        this.get("dialogManager").notice('You should have an permission!');

        // Show `view` in a dialog.
        var view = Ember.View.create(Ember.View.create({templateName: 'permission_denied'}));
        this.get("dialogManager").notice(view);

        // Show the dialog with the callback.
        this.get("dialogManager").notice('You should have an permission!').then(bind(this, function(){
          // Redirect to index route
          this.transitionTo('index');
        });
      ```

      @method confirm
      @param {String|Ember.View} view     - The content part.
      @param {String} ms          - Amount of milliseconds before dialog close-down.
      @return {Ember.RSVP.Promise}      - A `promise` to close the dialog
    */
    notice: function(view, ms, dialogData) {
      // If dialog data comes up, set it otherwise set an empty object to merge with default settings
      dialogData = Ember.typeOf(dialogData) === 'object' ? dialogData : {};
      var name = dialogData.name || this._generateDialogName();
      // Getting provided class name
      var className = dialogData.className || '';
      // Merging incoming dialog data with default data
      dialogData = Ember.$.extend({name: name}, this.get('dialogData'), dialogData, {className: ['notice', 'highest', className].join(' '), substrate: false});
      var promise = this._openWithLayout('dialogs/notice', view, null, dialogData, false),
        dialog = this.getDialog(name);

      // Close it on click
      dialog.reopen({
        click: function() {
          this.accept();
        }
      });

      if (Ember.typeOf(ms) !== 'null' && ms !== Infinity) {
        ms = ms >> 0 || this.get('defaults.ms');   // jshint ignore: line
        return new Ember.RSVP.Promise(function(resolve, reject) {
          setTimeout(dialog.accept.bind(dialog), ms);
          promise.then(resolve, reject);
        }.bind(this));
      } else {
        return promise;
      }
    },

    /**
      Render the `view` into a dialog layout. Register dialog in DialogManager's
      registry by hash `name`.

      @method open
      @param {String} name             - The name of the dialog to identify.
      @param {String|Ember.View} view        - The view or template name is rendered into the
                             dialog's layout
      @param {String|Ember.Controller} controller  - The `controller` listens actions from dialog
      @return {Ember.RSVP.Promise}         - Promise to open dialog
    */
    open: function(name, view, controller, dialogData, setActive) {
      var container = controller.container || this.container,
        dialog = this.getDialog(name),
        rootElement = controller.namespace && controller.namespace.rootElement || this.get('rootElement'),
        data = {
          name: name
        };
      Ember.merge(data, dialogData || {});
      Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Opening dialog named %s', 'font-weight: 900;', null, name);
      if (Ember.typeOf(dialog) === 'undefined') {
        // Dialog not found by the name and should to be created here.
        Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Creating dialog named %s', 'font-weight: 900;', null, name);
        // Creating and registering a dialog
        dialog = container.lookupFactory('dialog:presenter').createWithMixins(data);
        if (!Ember.isEqual(data.declineHandlerName, this.get('defaults.decline')) ||
          !Ember.isEqual(data.acceptHandlerName, this.get('defaults.accept'))) {
          var actions = {};
          if (!Ember.isEqual(data.declineHandlerName, this.get('defaults.decline'))) {
            actions[data.declineHandlerName] = function(dialog) { this.decline(); };
          }
          if (!Ember.isEqual(data.acceptHandlerName, this.get('defaults.accept'))) {
            actions[data.acceptHandlerName] = function(dialog) { this.accept(); };
          }
          dialog.reopen({actions: actions});
        }
        this.setDialog(name, dialog);
        if (Ember.typeOf(view) === 'string') {
          view = this._getView(view, controller);
          // Putting view into a dialog
          dialog.set('body', view);
        } else if (Ember.typeOf(view) === 'class') {
          dialog.setProperties({ body: view });
        } else {
          throw new Ember.Error('The given view unrecognized');
        }
        // Putting the dialog into the DOM
        Ember.run(function(){
          dialog.appendTo(rootElement);
        });
      }
      // Marking as active
      setActive && this.get('dialogsList').pushObject(name);  // jshint ignore: line
      return dialog.show();
    },

    /**
      Close the dialog window.

      @method close
      @param {String} name             - The name of the dialog to identify.
      @return {Ember.RSVP.Promise}         - Promise to close the dialog
    */
    close: function(name) {
      // Returns `target` to `controller` that was replaced to listen to the dialogs and to views events.
      this.get('controllers:' + name).reopen({ target: this.get('targets:' + name) });
      return new Ember.RSVP.Promise(Ember.run.bind(this, function(resolve, reject) {
        var dialogsList = this.get('dialogsList');
        this.set('dialogsList', dialogsList.without(name));
        var dialog = this.getDialog(name);
        Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Closing the dialog named %s', 'font-weight: 900;', null, name);
        this._destroyDialog(name);
        resolve(dialog);
        if (this.get("active")) {
          var nextDialog = this.getDialog(this.get("active"));
          nextDialog && nextDialog.focus();
        }
      }));
    },

    closeAll: function() {
      var dialogList = this.get('dialogsList');
      for(var i in dialogList) {
        if (!dialogList.hasOwnProperty(i)) { continue; }
        if (Ember.isBlank(dialogList[i])) { continue; }
        this.close(dialogList[i]);
      }
    },

    /**
      Returns the modal by the name.

      @method getDialog
      @param {String} name    - The name of the dialog
      @return {DialogComponent|Null}
    */
    getDialog: function(name) {
      return this.get('_dialogs').get(name);
    },

    /**
      Sets the modal by the name.

      @method setDialog
      @param {String} name    - The name of the dialog
      @param {String} instance  - The dialog instance
    */
    setDialog: function(name, instance) {
      Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Register dialog named %s', 'font-weight: 900;', null, name);
      return this.get('_dialogs').set(name, instance);
    },

    /**
      Returns UUID (random name of the dialog).

      @method _generateDialogName
      @private
      @return {String}
    */
    _generateDialogName: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);  // jshint ignore: line
        return v.toString(16);
      });
    },

    /**
      Eliminates the dialog.

      @method _destroyDialog
      @private
      @chainable
      @param {String} name    - The name of the dialog to identify.
    */
    _destroyDialog: function(name) {
      // Get the dialog from the register by income name or name of the dialog
      var dialog = Ember.typeOf(name) === 'string' ? this.getDialog(name) : name;
      if (!dialog) {
        Ember.ENV.LOG_DIALOG && Ember.Logger.warn('%cDialogManager:%c The dialog named %s not found', 'font-weight: 900;', null, name);
        return this;
      }
      name = dialog.get('name');
      Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Destroying %s', 'font-weight: 900;', null, dialog.get('name'));
      // Eliminate dialog
      dialog.destroy();
      var dialogs = this.get('_dialogs');
      delete dialogs[name];
      var dialogsList = this.get('dialogsList');
      this.set('dialogsList', dialogsList.without(name));
      return this;
    },

    /**
      Returns the view-object by the template name argument or throw an exception if template for it
      isn't found.

      @method _getView
      @private
      @param {String|Ember.View} view     - The content part.
      @param {Object} controller       - Where to look for the template.
      @return {Ember.View}
    */
    _getView: function(view, controller) {
      var template = '',
          container = controller.container || this.container;
      if (Ember.typeOf(view) === 'string') {
        // The view comes as a string. Necessary to find it by the name in the registry.
        template = container.lookup("template:" + view);
        // If a template cannot be found by the name, the name is not a
        // template's path it's a template itself.
        try {
          template = template || Ember.Handlebars.compile(view);
        } catch (e) {
          throw new Error("You have to include `ember-template-compiler.js` file to compile templates on fly. If you don't want to, you should provide a view instead or template name.");
        }
        // Creating a view by template.
        view = Ember.View.extend({ template: template, controller: controller});
      } else if (Ember.typeOf(view) === 'class') {
        view = Ember.copy(view);
        view = Ember.View.extend({ controller: controller });
      } else {
        /*jshint multistr: true */
        throw new Ember.Error('The given view unrecognized. Should be a text or name of template or view class.');
      }
      return view;
    },

    /**
      Open a dialog window with `wrapper view` by given `layout`.

      @method openWithLayout
      @private
      @param {String} layoutName      - The name of the layout that wraps view.
      @param {String} name          - The name of the dialog to identify.
      @param {String|Ember.View} view     - The content part.
      @param {Ember.Controller} controller  - The controller to listen to view actions.
      @param {String} title         - Dialog title.
      @return {Ember.RSVP.Promise}      - Promise to close dialog
    */
    _openWithLayout: function(layoutName, view, controller, dialogData, setActive) {

      var dialog, promise,
        name = Ember.typeOf(dialogData.name) === 'string' ? dialogData.name : this._generateDialogName();

      // Creating controller if not provided
      if (!(controller instanceof Ember.Controller) && Ember.typeOf(controller) === 'object') {
        // Creating fake controller
        controller = Ember.Controller.create(controller);
      } else {
        controller = controller || Ember.Controller.create();
      }


      // Return ready view for insertion into dialog component.
      view = this._getView(view, controller);

      // Data used in dialog's mid layout
      dialogData = dialogData || {};

      // Almost always mark new dialogs as active
      setActive = Ember.typeOf(setActive) === 'undefined' ? true : setActive;

      // Set layout with footer and header.
      view.reopen({ layoutName: layoutName });

      // Creating and getting dialog-window
      dialog = this.open(name, view, controller, dialogData, setActive);

      this.set('controllers:' + name, controller);
      this.set('targets:' + name, controller.target);

      // Declaring target on dialog actions. All events first of all are handled by
      // controller then passed to a dialog component to make standard instruction.
      controller.reopen({ target: dialog, dialog: Ember.computed.alias('target').readOnly() });

      promise = new Ember.RSVP.Promise(function(resolve, reject) {
        dialog.reopen({
          resolved: resolve,
          rejected: reject
        });
      });

      return promise;
    }

  }).reopenClass({

      /**
        To beautiful output.

        @method toString
        @return {String}
      */
      toString: function() {
          return "(subclass of Dialog.Manager)";
      }

  });


  __es6_export__("Manager", Manager);
  __es6_export__("default", Manager);
});

//# sourceMappingURL=manager.js.map
define(
  "ember-dialog/utils/highest-zindex",
  ["exports"],
  function(__exports__) {
    "use strict";

    function __es6_export__(name, value) {
      __exports__[name] = value;
    }

    __es6_export__("default", function () {
      var $ = Ember.$;
      var max = Math.max.apply(null, $.map($(':visible:not(.highest)'), function(element){
        if($(element).css('position') === 'absolute' || $(element).css('position') === 'relative'){
          return ($(element).css('z-index') >> 0) || 1;  // jshint ignore: line
        }
        return 0;
      }));
      return max;
    });
  }
);

//# sourceMappingURL=highest-zindex.js.map
// Shim Ember module
define("ember", ["exports"], function(__exports__) {
  "use strict";

  function __es6_export__(name, value) {
    __exports__[name] = value;
  }

  __es6_export__("default", Ember);
});

//# sourceMappingURL=main.js.map
Ember.TEMPLATES["dialog"] = Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    revision: "Ember@1.11.1",
    blockParams: 0,
    cachedFragment: null,
    hasRendered: false,
    build: function build(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","dialog-content");
      dom.setAttribute(el2,"tabindex","-1");
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    render: function render(context, env, contextualElement) {
      var dom = env.dom;
      var hooks = env.hooks, element = hooks.element, get = hooks.get, inline = hooks.inline;
      dom.detectNamespace(contextualElement);
      var fragment;
      if (env.useFragmentCache && dom.canClone) {
        if (this.cachedFragment === null) {
          fragment = this.build(dom);
          if (this.hasRendered) {
            this.cachedFragment = fragment;
          } else {
            this.hasRendered = true;
          }
        }
        if (this.cachedFragment) {
          fragment = dom.cloneNode(this.cachedFragment, true);
        }
      } else {
        fragment = this.build(dom);
      }
      var element0 = dom.childAt(fragment, [0]);
      var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),1,1);
      element(env, element0, context, "bind-attr", [], {"class": ":dialog-dialog :component-dialog-dialog className substrate"});
      inline(env, morph0, context, "view", [get(env, context, "body")], {"dialog": get(env, context, "controller")});
      return fragment;
    }
  };
}()));
Ember.TEMPLATES["dialogs/alert"] = Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    revision: "Ember@1.11.1",
    blockParams: 0,
    cachedFragment: null,
    hasRendered: false,
    build: function build(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","dialog-header");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"type","button");
      dom.setAttribute(el2,"class","close");
      var el3 = dom.createTextNode("×");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","dialog-title");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","dialog-body");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","dialog-footer");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"type","button");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    render: function render(context, env, contextualElement) {
      var dom = env.dom;
      var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content;
      dom.detectNamespace(contextualElement);
      var fragment;
      if (env.useFragmentCache && dom.canClone) {
        if (this.cachedFragment === null) {
          fragment = this.build(dom);
          if (this.hasRendered) {
            this.cachedFragment = fragment;
          } else {
            this.hasRendered = true;
          }
        }
        if (this.cachedFragment) {
          fragment = dom.cloneNode(this.cachedFragment, true);
        }
      } else {
        fragment = this.build(dom);
      }
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [1]);
      var element2 = dom.childAt(fragment, [4, 1]);
      var morph0 = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
      var morph1 = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
      var morph2 = dom.createMorphAt(element2,0,0);
      element(env, element1, context, "action", [get(env, context, "view.dialog.acceptHandlerName"), get(env, context, "view.dialog")], {});
      content(env, morph0, context, "view.dialog.title");
      content(env, morph1, context, "yield");
      element(env, element2, context, "bind-attr", [], {"class": ":btn view.dialog.acceptClass"});
      element(env, element2, context, "action", [get(env, context, "view.dialog.acceptHandlerName"), get(env, context, "view.dialog")], {});
      content(env, morph2, context, "view.dialog.acceptLabel");
      return fragment;
    }
  };
}()));
Ember.TEMPLATES["dialogs/confirm"] = Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    revision: "Ember@1.11.1",
    blockParams: 0,
    cachedFragment: null,
    hasRendered: false,
    build: function build(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","dialog-header");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"type","button");
      dom.setAttribute(el2,"class","close");
      var el3 = dom.createTextNode("×");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","dialog-title");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","dialog-body");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","dialog-footer");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"type","button");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("button");
      dom.setAttribute(el2,"type","button");
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    render: function render(context, env, contextualElement) {
      var dom = env.dom;
      var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content;
      dom.detectNamespace(contextualElement);
      var fragment;
      if (env.useFragmentCache && dom.canClone) {
        if (this.cachedFragment === null) {
          fragment = this.build(dom);
          if (this.hasRendered) {
            this.cachedFragment = fragment;
          } else {
            this.hasRendered = true;
          }
        }
        if (this.cachedFragment) {
          fragment = dom.cloneNode(this.cachedFragment, true);
        }
      } else {
        fragment = this.build(dom);
      }
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [1]);
      var element2 = dom.childAt(fragment, [4]);
      var element3 = dom.childAt(element2, [1]);
      var element4 = dom.childAt(element2, [3]);
      var morph0 = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
      var morph1 = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
      var morph2 = dom.createMorphAt(element3,0,0);
      var morph3 = dom.createMorphAt(element4,0,0);
      element(env, element1, context, "action", [get(env, context, "view.dialog.declineHandlerName"), get(env, context, "view.dialog")], {});
      content(env, morph0, context, "view.dialog.title");
      content(env, morph1, context, "yield");
      element(env, element3, context, "bind-attr", [], {"class": ":btn view.dialog.acceptClass"});
      element(env, element3, context, "action", [get(env, context, "view.dialog.acceptHandlerName"), get(env, context, "view.dialog")], {});
      content(env, morph2, context, "view.dialog.acceptLabel");
      element(env, element4, context, "bind-attr", [], {"class": ":btn view.dialog.declineClass"});
      element(env, element4, context, "action", [get(env, context, "view.dialog.declineHandlerName"), get(env, context, "view.dialog")], {});
      content(env, morph3, context, "view.dialog.declineLabel");
      return fragment;
    }
  };
}()));
Ember.TEMPLATES["dialogs/custom"] = Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    revision: "Ember@1.11.1",
    blockParams: 0,
    cachedFragment: null,
    hasRendered: false,
    build: function build(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    render: function render(context, env, contextualElement) {
      var dom = env.dom;
      var hooks = env.hooks, content = hooks.content;
      dom.detectNamespace(contextualElement);
      var fragment;
      if (env.useFragmentCache && dom.canClone) {
        if (this.cachedFragment === null) {
          fragment = this.build(dom);
          if (this.hasRendered) {
            this.cachedFragment = fragment;
          } else {
            this.hasRendered = true;
          }
        }
        if (this.cachedFragment) {
          fragment = dom.cloneNode(this.cachedFragment, true);
        }
      } else {
        fragment = this.build(dom);
      }
      var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, null);
      dom.insertBoundary(fragment, 0);
      content(env, morph0, context, "yield");
      return fragment;
    }
  };
}()));
Ember.TEMPLATES["dialogs/notice"] = Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    revision: "Ember@1.11.1",
    blockParams: 0,
    cachedFragment: null,
    hasRendered: false,
    build: function build(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","dialog-body");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    render: function render(context, env, contextualElement) {
      var dom = env.dom;
      var hooks = env.hooks, content = hooks.content;
      dom.detectNamespace(contextualElement);
      var fragment;
      if (env.useFragmentCache && dom.canClone) {
        if (this.cachedFragment === null) {
          fragment = this.build(dom);
          if (this.hasRendered) {
            this.cachedFragment = fragment;
          } else {
            this.hasRendered = true;
          }
        }
        if (this.cachedFragment) {
          fragment = dom.cloneNode(this.cachedFragment, true);
        }
      } else {
        fragment = this.build(dom);
      }
      var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
      content(env, morph0, context, "yield");
      return fragment;
    }
  };
}()));
require("ember-dialog");
})();