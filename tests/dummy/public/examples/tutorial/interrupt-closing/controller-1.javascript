import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {

    showDialog() {
      const promise = this.get("dialog").confirm(hbs`Press yes.`, this, {

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
      presenter.accept();
    },

    declineClicked(presenter) {
      this.get("dialog").alert(hbs`You can't decline this modal window. Please, press yes button.`);
    }

  }

});
