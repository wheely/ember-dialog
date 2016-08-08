import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {
    showAutoHideDialog() {
      this.get("dialog").one("created", presenter => {
        Ember.run.later(presenter, "accept", 500);
      });
      this.get("dialog").alert(hbs`Dialog's body`);
    },
    showNotice() {
      this.get("dialog").one("created", presenter => {
        Ember.run.later(presenter, "accept", 500);
      });
      this.get("dialog").show("cookbook/creating-notices/partials/notice", hbs`Dialog's body`, null, { root: ".notices" });
    }
  }

});
