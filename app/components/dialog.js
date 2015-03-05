import maxZIndex from "ember-dialog/utils/highest-zindex";

export default Ember.Component.extend({

    /**
      @property layoutName
      @type {String}
    */
    layoutName: 'components/dialog',

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
    isActive: function() {
        return this.get('name') === this.get('dialogManager.active');
    }.property('name', 'dialogManager.active'),

    /**
      Make dialog's z-index property biggest.

      @method _visibleDidChange
      @private
    */
    _visibleDidChange: function() {

        // Element not visible - do not recalculate z-index for it
        if (!this.get('isVisible')) {
          return;
        }

        // Element inserting now - we should asynchronize enlargement of
        // z-index css property. This method will not be executed while current
        // method will not be finished.
        Ember.run.later(this, function() {

            var dialog, zindex;

            // If z-index should be fixed - do not change it
            if (!this.get("fixedZIndex")) {
                // Biggest z-index
                var zindex = maxZIndex(),

                    // Component element (wrapper of dialog-element)
                    // Dialog element
                    dialog = this.$('.dialog-dialog');

                // Set z-index biggest then biggenest
                dialog.css({'z-index': zindex + 1});
            }

            this.focus();

        }, 0);

    }.observes('isVisible'),

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
        this.has('rejected') && this.get('rejected').call(this, this);
        this.trigger('declined', this);
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
        this.has('resolved') && this.get('resolved').call(this, this);
        this.trigger('accepted', this);
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
            viewsController = this.get("childViews").findBy('controller').get('controller');
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