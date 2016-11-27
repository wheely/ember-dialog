import Ember from 'ember';

/**
 * @module ember-dialog/mixins/context
 * @augments Ember.Mixin
 */

export function makeArgsArray(args, obj) {
  const argsArray = Array.prototype.slice.apply(args);
  argsArray.unshift(obj);
  return argsArray;
}

export function execAction(actionName, args) {
  const context = Ember.get(this, "contextObject");
  // @todo: Magic concatenation
  actionName = Ember.get(this, actionName + "Handler");
  args = makeArgsArray(args, this);
  if (context && context.actions && context.actions[actionName]) {
    if (context instanceof Ember.Controller || context instanceof Ember.Component || context instanceof Ember.Route){
      args.unshift(actionName);
      context.send.apply(context, args);
    }else{
      context.actions[actionName].apply(context, args);
    }
  } else {
    this[actionName].apply(this);
  }
}

export default Ember.Mixin.create({

  /**
   * @property {Function} accept
   * @property {Function} decline
   */
  actions: {

    accept() {
      execAction.call(this, "accept", arguments);
    },

    decline() {
      execAction.call(this, "decline", arguments);
    }

  }

});
