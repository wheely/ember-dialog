import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  actions: {
    showDialog() {
      const options = {
        substrate: true
      };
      this.get("dialog").show("red-corner-dialog", hbs`A message in the red dialog.`, null, options);
    }
  }
});
