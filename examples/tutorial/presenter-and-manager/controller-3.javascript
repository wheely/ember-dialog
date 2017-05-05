import Ember from "ember";
import greeting from '../templates/messages/greeting';

export default Ember.Controller.extend({
  username: "Vladimir Milkov",
  actions: {
    showGreeting() {
      this.get("dialog").show(
        "dialog/information",
        greeting,
        this
      );
    }
  }
});
