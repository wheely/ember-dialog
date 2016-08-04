import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  count: 0,

  actions: {
    showDialog() {
      this.set("count", 0);
      const promise = this.get("dialog").confirm(hbs`You pressed 3/{{contextObject.count}} times`, this, {

        // This action of this controller will be executed when user press `yes` button.
        acceptHandler: "acceptClicked",

        // This action of this controller will be executed when user press `no` button.
        declineHandler: "declineClicked"

      });

      promise.then(() => {
        // Executed when dialog window closes by `yes` button
      });
    },

    acceptClicked(presenter) {
      // Closing dialog window
      this.get("count") >= 2 && presenter.accept(); // jshint ignore: line
      this.incrementProperty("count");
    },

    declineClicked() {
      this.get("dialog").alert(hbs`You can't decline this modal window. Please, press yes button.`);
    }
  }

});
