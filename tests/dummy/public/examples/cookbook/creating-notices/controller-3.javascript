import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {
    showNotice() {
      this.get("dialog").notice(hbs`Dialog's body`);
    }
  }

});
