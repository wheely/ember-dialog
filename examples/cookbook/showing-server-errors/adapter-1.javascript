import DS from "ember-data";
import Config from "../config/environment";

export default DS.RESTAdapter.extend({

  dialog: Ember.inject.service(),

  session: Ember.inject.service(),

  handleResponse: function(status, headers, payload) {

    // Unauthenticated request error
    if (Ember.isEqual(status, 401)) {

      // Showing error in a dialog
      const promise = this.get("dialog").alert("messages/error-unauthenticated");

      promise.then(() => {
        this.get("session").invalidate();
      })

    }

    return this._super(...arguments);

  }

});
