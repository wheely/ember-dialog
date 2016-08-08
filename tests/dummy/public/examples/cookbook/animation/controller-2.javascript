import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {
    showDialog() {
      this.get("dialog").alert(hbs`Dialog's body`, null, { animation: "fade" }, "presenter-animated");
      this.get("dialog").alert(hbs`Dialog's body`, null, { animation: "slide" }, "presenter-animated");
    }
  }

});
