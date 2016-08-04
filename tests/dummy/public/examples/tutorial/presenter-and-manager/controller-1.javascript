import Ember from "ember";

export default Ember.Controller.extend({
  username: "Vladimir Milkov",
  actions: {
    showGreeting() {
      this.get("dialog").show(
        "dialog/information",
        "messages/greeting",
        this
      );
    },
    showNickname() {
      this.set("username", "ajile");
    }
  }
});
