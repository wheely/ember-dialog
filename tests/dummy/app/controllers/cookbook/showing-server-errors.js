import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  startTimer: Ember.on("init", function() {
    // this.get("dialog").alert(hbs`Your token is expired. You will be transitioned to the login page.`, this);
  }),

  actions: {
    show401Error() {
      this.get("dialog").alert(hbs`Your token is expired. You will be transitioned to the login page.`, this);
    },
    showTopError() {
      this.get("dialog").one("created", dialog => Ember.run.later(dialog, "accept", 2000));
      this.get("dialog").show('cookbook/showing-server-errors/partials/top-error', 'cookbook/showing-server-errors/partials/plain', null, { title: "Internal Server Error", text: "Server is unavailable" });
    }
  }

});
