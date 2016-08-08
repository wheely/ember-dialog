import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {
    showDialog() {
      this.get("dialog").one("created", presenter => {
        Ember.run.later(presenter, "accept", 500);
      });
      this.get("dialog").alert(hbs`Dialog's body`);
    }
  }

});
