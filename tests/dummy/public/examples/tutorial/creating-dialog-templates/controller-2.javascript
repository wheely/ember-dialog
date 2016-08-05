import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  actions: {
    showDialog() {
      this.get("dialog").show(hbs`A message in the red dialog.`);
    }
  }
});
