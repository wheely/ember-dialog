import Ember from 'ember';

export default Ember.Mixin.create({

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
