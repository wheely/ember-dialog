import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  username: "Vladimir Milkov",
  actions: {
    showGreeting() {
      this.get("dialog").show(
        "dialog/information",
        hbs`Hi, {{contextObject.username}}`,
        this
      );
    }
  }
});
