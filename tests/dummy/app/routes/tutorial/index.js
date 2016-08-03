import Ember from "ember";

export default Ember.Route.extend({

  enter() {
    this.transitionTo("tutorial.creating");
    return this._super(...arguments);
  }

});
