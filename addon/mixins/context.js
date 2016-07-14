import Ember from 'ember';

/**
 * @module ember-dialog/mixins/context
 * @augments Ember.Mixin
 */
export default Ember.Mixin.create({

  /**
   * @property {Function} accept
   * @property {Function} decline
   */
  actions: {

    accept() {
      const acceptHandler = this.get("acceptHandler");
      const context = this.context.get("contextObject");
      if (context._actions && context._actions[acceptHandler]) {
        let args = Array.prototype.slice.apply(arguments);
            args.unshift(this);
        context._actions[acceptHandler].apply(context, args);
      } else {
        this.accept();
      }
    },

    decline() {
      const declineHandler = this.get("declineHandler");
      const context = this.context.get("contextObject");
      if (context._actions && context._actions[declineHandler]) {
        let args = Array.prototype.slice.apply(arguments);
            args.unshift(this);
        context._actions[declineHandler].apply(context, args);
      } else {
        this.decline();
      }
    }

  }

});
