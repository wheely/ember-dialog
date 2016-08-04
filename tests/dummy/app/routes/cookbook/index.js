import Ember from "ember";

export default Ember.Route.extend({

  enter() {
    this.transitionTo("cookbook.animation");
    return this._super(...arguments);
  }

});
