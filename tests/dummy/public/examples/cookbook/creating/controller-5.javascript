import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  showError: Ember.on('init', function() {
    const error = "500 Server Error"
    this.get("dialog").alert(hbs`Critical error: {{error}}`, null, { error });
  })
});
