import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  connectedHandler() {
    const presenter = this.get("presenter");
    if (presenter) {
      // Closing dialog
      presenter.accept();

    }
  },

  disconnectedHandler() {
    this.get("dialog").one("created", presenter => {
      this.set("presenter", presenter);
    });
    // Showing dialog message with error
    const promise = this.get("dialog").alert(hbs`Connection lost`);
    promise.always(() => { this.set("presenter", null); });
  }

});
