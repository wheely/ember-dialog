import Ember from "ember";

export default Ember.Controller.extend({
  model: {
    first_name: "Vladimir",
    last_name: "Milkov",
    last_visit: "2016-08-03 15:52"
  },
  actions: {
    showDialog() {
      const context = this;
      this.get("dialog").show("dialog/alert", "messages/foo", context);
    },
    foo() {
      console.log("FOO");
    }
  }
});
