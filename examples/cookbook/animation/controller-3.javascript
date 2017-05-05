import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {
    showDialog() {
      this.get("dialog").alert(hbs`Dialog's body`, null, { animate: "fade" }, "presenter-animated");
    }
  }

});
