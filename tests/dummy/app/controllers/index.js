import Ember from "ember";

export default Ember.Controller.extend({

  actions: {

    showAlert() {
      const promise = this.get("dialog").alert("test-message", this, { title: "Reporting a problem" });
      promise.then(() => console.log("ACCEPT"), () => console.log("DECLINE"));
    },

    showConfirm() {
      const promise = this.get("dialog").confirm("test-message", this, { title: "Reporting a problem" });
      promise.then(() => console.log("ACCEPT"), () => console.log("DECLINE"));
    },

    showBlank() {
      const promise = this.get("dialog").blank("test-message", this, { title: "Reporting a problem" });
      promise.then(() => console.log("ACCEPT"), () => console.log("DECLINE"));
    },

    accept(presenter) {
      presenter.accept();
    }

  }

});
