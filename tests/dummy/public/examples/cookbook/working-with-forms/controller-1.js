import Ember from "ember";

export default Ember.Controller.extend({

  error: null,

  model: { first_name: "", last_name: "" }

  actions: {

    showUserForm() {
      const promise = this.get("dialog").blank("forms/user", this, {
        acceptHandler: "saveUser",
        declineHandler: "cancel"
      });

      // Always when dialog closes
      promise.finally(() => {
        this.set("error", null);
      });
    },

    saveUser(presenter) {

      const user = this.get("model"),
            first_name = user.get("first_name"),
            last_name = user.get("last_name");

      if (Ember.isEmpty(first_name) || Ember.isEmpty(last_name)) {
        // Write down the error to controller
        this.set("error", "Form is invalid");
      } else {
        // Saving user and closing dialog window
        user.save().then(presenter.accept);
      }

    },

    cancel(presenter) {
      this.get("model").rollbackAttributes();
      presenter.decline();
    }

  }

});
