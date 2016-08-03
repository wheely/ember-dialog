import Ember from "ember";

export default Ember.Controller.extend({

  actions: {

    showAlert() {
      this.get("dialog").alert("test-message", this, {
        title: "Alert"
      });
    },

    showConfirm() {
      this.get("dialog").confirm("test-message", this, {
        title: "Are you sure?"
      });
    },

    showBlank() {
      this.get("dialog").blank("test-message", this);
    }

  }

});
