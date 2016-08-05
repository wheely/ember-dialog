import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  actions: {
    showDialog() {
      this.get("dialog").show("tutorial/creating-dialog-templates/partials/template-1", hbs`An template content`);
    }
  }
});
