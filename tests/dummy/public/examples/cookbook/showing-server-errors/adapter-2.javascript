import DS from "ember-data";
import Config from "../config/environment";

export default DS.RESTAdapter.extend({

  dialog: Ember.inject.service(),

  handleResponse: function(status, headers, payload) {

    if (this.isInvlid(status, headers, payload)) {
      this.get("dialog").show('dialog/top-error', 'messages/titled', null, {
        title: "Internal Server Error",
        text: payload.error
      });
    }

    return this._super(...arguments);

  }

});
