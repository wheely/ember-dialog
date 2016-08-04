import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    showDialog() {
      this.get("dialog").show("dialog/confirm", "messages/foo", this, {
        acceptHandler: "yesClicked",
        declineHandler: "noClicked",
        keydown: e => { console.log(e.keyCode); }
      });
    },
    yesClicked(presenter) {
      presenter.accept();
    },
    noClicked(presenter) {
      presenter.decline();
    }
  }
});
