import Ember from "ember";

export default Ember.Controller.extend({

  init() {
    this._super(...arguments);
    this.showGreeting();
  },

  showGreeting() {
    const dialog = this.get("dialog");
    dialog.alert("messages/hello-world");
  }

});
