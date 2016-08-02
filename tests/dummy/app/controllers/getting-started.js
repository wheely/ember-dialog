import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {

    showAlert() {
      const promise = this.get("dialog").alert("test-message", this, {
        title: "Alert"
      });
    },

    showConfirm() {
      const promise = this.get("dialog").confirm("test-message", this, {
        title: "Are you sure?"
      });
    },

    showBlank() {
      const promise = this.get("dialog").blank("test-message", this);
    }

  }

});
