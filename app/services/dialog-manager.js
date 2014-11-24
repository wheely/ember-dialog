export default Ember.Object.extend(Ember.Evented, {

    /**
      Used to insertion of the dialog-windows if `namespace` of incoming `controller`
      do not contain `rootElement` property.

      @public
      @property rootElement
      @type String
      @default 'body'
    */
    rootElement: 'body',

    /**
      @public
      @property defaults
      @attribute {Number} ms   - Milliseconds before close notice-dialog
      @type Object
    */
    defaults: {
        ms: 5000,
        decline: 'decline',
        accept: 'accept'
    },

    /**
      @public
      @property dialogData
      @attribute {String} accept      - Text for "YES" button
      @attribute {String} decline     - Text for "NO" button
      @attribute {String} title       - Text in header
      @attribute {Boolean} substrate
      @type Object
    */
    dialogData: {
        acceptLabel: 'yes',
        declineLabel: 'no',
        acceptHandlerName: 'accept',
        declineHandlerName: 'decline',
        substrate: false,
        title: '',
        className: ''
    },

    /**
      Name of the active dialog. Use for determine which dialog will be closed on
      escape key-down handler.

      @property active
      @type String
    */
    active: function() {
        return this.get('dialogsList').slice(-1).pop();
    }.property('dialogsList'),

    dialogsList: [],

    /**
      Property contains all created models.
      @private
      @property _dialogs
      @type Ember.Object
    */
    _dialogs: Ember.Object.create(),

    /**
      Alert-dialog window. Contains predefined 1 button.

      @example
      ```javascript
          var expectation = 10000,
              name = 'occure-error',
              view = 'Is an reason of this message. Application will be reloaded after \
                      you close this window',
              title = "Unexpected error";

          // Function applied after close
          var closed = function() {
              Ember.ENV.LOG_DIALOG && Ember.Logger.log('Dialog closed. User saw the text of it.');
              // As we promted to do so
              window.location.reload();
          };

          // Show confirm message, get promise
          var p = this.get("dialogManager").alert(name, view, this, {title:title, name:name}).then(closed);

          setTimeout(function(){
              // Can't wait to long before user accept or decline confirm message. Close it
              // after `expectation` seconds. We can do so because we have a name of the dialog.
              // After dialog close occured `resolve` callback.
              this.get("dialogManager").getDialog(name)
          }, expectation);
      ```

      @method alert
      @param {String} name                  - The name of the dialog to identify.
      @param {String|Ember.View} view       - The content part.
      @param {Ember.Controller} controller  - The controller to listen to view actions.
      @param {String} title                 - Dialog title.
      @return {Ember.RSVP.Promise}          - Promise to close dialog
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
      @param {String} name                  - The name of the dialog to identify.
      @param {String|Ember.View} view       - The content part.
      @param {Ember.Controller} controller  - The controller to listen to view actions.
      @param {String} title                 - Dialog title.
      @return {Ember.RSVP.Promise}          - Promise to close dialog
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
      @param {String} name                  - The name of the dialog to identify.
      @param {String|Ember.View} view       - The content part.
      @param {Ember.Controller} controller  - The controller to listen to view actions.
      @param {String} title                 - Dialog title.
      @todo
      @return {Ember.RSVP.Promise}          - Promise to close dialog
    */
    custom: function(view, controller, dialogData) {
        // If comes dialog's data set it else set empty object to merge with default settings
        dialogData = Ember.typeOf(dialogData) === 'object' ? dialogData : {};
        // Getting provided class name
        var className = dialogData.className || '';
        // Merging incoming dialog data with defaults data
        dialogData = Ember.$.extend({}, this.get('dialogData'), dialogData, {className: ['custom', className].join(' ')});
        // Creating dialog `custom` type
        return this._openWithLayout('dialogs/custom', view, controller, dialogData);
    },

    /**
      Notice-dialog window disappear after given time.

      Example:

      @example
      ```javascript
          // Show template for a 1 seconds.
          this.get("dialogManager").notice('permission_denied');

          // Show template for a 5 seconds.
          this.get("dialogManager").notice('permission_denied', 5000);

          // Show simple message.
          this.get("dialogManager").notice('You should have an permission!');

          // Show view in a dialog.
          var view = Ember.View.create(Ember.View.create({templateName: 'permission_denied'}));
          this.get("dialogManager").notice(view);

          // Show dialog with callback.
          this.get("dialogManager").notice('You should have an permission!').then(bind(this, function(){
              // Redirect to index route
              this.transitionTo('index');
          });
      ```

      @method confirm
      @param {String|Ember.View} view       - The content part.
      @param {String} ms                    - The name of the dialog to identify.
      @return {Ember.RSVP.Promise}          - Promise to close dialog
    */
    notice: function(view, ms, dialogData) {
        var name = this._generateDialogName();
        // If comes dialog's data set it else set empty object to merge with default settings
        dialogData = Ember.typeOf(dialogData) === 'object' ? dialogData : {};
        // Getting provided class name
        var className = dialogData.className || '';
        // Merging incoming dialog data with defaults data
        dialogData = Ember.$.extend({name: name}, this.get('dialogData'), dialogData, {className: ['notice', 'highest', className].join(' '), substrate: false});
        // var controller = Ember.Controller.extend({
        //   click: function() {
        //     console.log(123);
        //   }
        // }).create();
        var promise = this._openWithLayout('dialogs/notice', view, null, dialogData, false),
            bind = Ember.run.bind;

        // Close it on click
        this.getDialog(name).reopen({
            click: function() {
                this.close();
            }
        });

        if (Ember.typeOf(ms) !== 'null' && ms !== Infinity) {
            ms = ms >> 0 || this.get('defaults.ms');   // jshint ignore: line
            return new Ember.RSVP.Promise(bind(this, function(resolve, reject) {
                setTimeout(bind(this, function() {
                    this.close(name).then(resolve, reject);
                }), ms);
            }));
        } else {
          return promise;
        }
    },

    /**
      Render the `view` into a dialog layout. Register dialog in DialogManager's
      registry by hash `name`.

      @method open
      @param {String} name                         - The name of the dialog to identify.
      @param {String|Ember.View} view              - The view or template name will be rendered into
                                                     dialog's layout
      @param {String|Ember.Controller} controller  - The controller will listen actions
                                                     from dialog
      @return {Ember.RSVP.Promise}                 - Promise to open dialog
    */
    open: function(name, view, controller, dialogData, setActive) {
        var container = controller.container || this.container,
            dialog = this.getDialog(name),
            rootElement = controller.namespace && controller.namespace.rootElement || this.get('rootElement'),
            template,
            data = {
                name: name
            };
        Ember.merge(data, dialogData || {});
        Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Opening dialog named %s', 'font-weight: 900;', null, name);
        if (Ember.typeOf(dialog) === 'undefined') {
            // Dialog not found by the name and should to be created here.
            Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Creating dialog named %s', 'font-weight: 900;', null, name);
            // Creating and register dialog
            dialog = container.lookupFactory('component:dialog').createWithMixins(data);
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
                // Put view into dialog
                dialog.set('body', view);
            } else if (Ember.typeOf(view) === 'class') {
                // dialog.setProperties({ body: view, controller: controller });
                dialog.setProperties({ body: view });
            } else {
                throw new Ember.Error('The given view unrecognized');
            }
            // Put dialog into DOM
            dialog.appendTo(rootElement);
        }
        // Mark as active
        setActive && this.get('dialogsList').push(name);  // jshint ignore: line
        return dialog.show();
    },

    /**
      Close dialog window.

      @method close
      @param {String} name                         - The name of the dialog to identify.
      @return {Ember.RSVP.Promise}                 - Promise to close dialog
    */
    close: function(name) {
        // Return target to controller that was replaced to listen dialogs and view events.
        this.get('controllers:' + name).reopen({ target: this.get('targets:' + name) });
        return new Ember.RSVP.Promise(Ember.run.bind(this, function(resolve, reject) {
            var dialogsList = this.get('dialogsList');
            this.set('dialogsList', dialogsList.without(name));
            var dialog = this.getDialog(name);
            Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Closing dialog named %s', 'font-weight: 900;', null, name);
            dialog.hide();
            // this._destroyModel(name);
            resolve(dialog);
        }));
    },

    /**
      Return model by name.

      @method getDialog
      @param {String} name      - The name of the dialog
      @return {DialogComponent|Null}
    */
    getDialog: function(name) {
        return this.get('_dialogs').get(name);
    },

    /**
      Return model by name.

      @method setDialog
      @param {String} name      - The name of the dialog
      @param {String} instance  - The dialog instance
    */
    setDialog: function(name, instance) {
        Ember.ENV.LOG_DIALOG && Ember.Logger.log('%cDialogManager:%c Register dialog named %s', 'font-weight: 900;', null, name);
        return this.get('_dialogs').set(name, instance);
    },

    /**
      Returns UUID random name of the dialog.

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
      Destroy dialog.

      @method _destroyDialog
      @private
      @chainable
      @param {String} name                         - The name of the dialog to identify.
    */
    _destroyModel: function(name) {
        // Getting dialog from register by name or name is a dialog
        var dialog = Ember.typeOf(name) === 'string' ? this.getDialog(name) : name;
        if (dialog) {
            // Destroying dialog
            dialog.destroy();
          }
        return this;
    },

    /**
      Returns view-object on template name argument or throw exception if template for it
      doesn't found.

      @method _getView
      @private
      @param {String|Ember.View} view       - The content part.
      @param {Object} container             - Where looking for a template.
      @return {Ember.View}
    */
    _getView: function(view, controller) {
        var template = '',
            container = controller.container || this.container;
        if (Ember.typeOf(view) === 'string') {
            // The view come as string. Needles to find it by name in the registry.
            template = container.lookup("template:" + view);
            // If template could not be found by the name. Given name is not a template's path
            // it's a template by self.
            template = template || Ember.Handlebars.compile(view);
            // Creating a view by template.
            view = Ember.View.extend({ template: template, controller: controller });
        } else if (Ember.typeOf(view) === 'class') {
            view = Ember.copy(view);
        } else {
            /*jshint multistr: true */
            throw new Ember.Error('The given view unrecognized. Should be name of template \
                                   or view instance.');
        }
        return view;
    },

    /**
      Open dialog window with wrapper view by given layout.

      @method openWithLayout
      @private
      @param {String} layoutName            - The name of the layout that wrap view.
      @param {String} name                  - The name of the dialog to identify.
      @param {String|Ember.View} view       - The content part.
      @param {Ember.Controller} controller  - The controller to listen to view actions.
      @param {String} title                 - Dialog title.
      @return {Ember.RSVP.Promise}          - Promise to close dialog
    */
    _openWithLayout: function(layoutName, view, controller, dialogData, setActive) {

        var dialog, promise,
            name = Ember.typeOf(dialogData.name) === 'string' ? dialogData.name : this._generateDialogName();

        // Creating controller of don't provided
        controller = controller || Ember.Controller.create();

        // Return ready view for insertion into dialog component.
        view = this._getView(view, controller);

        // Data use in dialog's mid layout
        dialogData = dialogData || {};

        // Almost always mark new dialogs as active
        setActive = Ember.typeOf(setActive) === 'undefined' ? true : setActive;

        // Set layout with footer and header.
        view.reopen({ layoutName: layoutName });

        // Creating and getting dialog-window
        dialog = this.open(name, view, controller, dialogData, setActive);

        this.set('controllers:' + name, controller);
        this.set('targets:' + name, controller.target);

        // Declaring target on dialog actions. All events fists of all will be handled by
        // controller then will be passed to dialog component to make standard instruction.
        controller.reopen({ target: dialog });

        promise = new Ember.RSVP.Promise(function(resolve, reject) {
            dialog.reopen({
                resolved: resolve,
                rejected: reject
            });
        });

        return promise;
    }
});