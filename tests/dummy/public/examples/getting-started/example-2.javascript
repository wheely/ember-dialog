import Ember from "ember";

export default Ember.Controller.extend({

  actions: {

    showAlert() {
      // It's the same as:
      // this.get("dialog").show("dialog/alert", "messages/you-cannot-do-it");
      this.get("dialog").alert("messages/you-cannot-do-it");
    },

    showConfirm() {
      // It's the same as:
      // this.get("dialog").show("dialog/confirm", "messages/confirm-deletion");
      this.get("dialog").confirm("messages/confirm-deletion").then(() => {
        this.get("model").removeRecord().save();
      });
    },

    showBlank() {
      // It's the same as:
      // this.get("dialog").show("dialog/blank", "messages/some-message");
      this.get("dialog").blank("messages/some-message");
    }

  }

});
