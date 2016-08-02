import Ember from "ember";

export default Ember.Controller.extend({
  username: "Vladimir Milkov",
  showGreeting: Ember.on('init', function() {
    alert("Hello, " + this.get("username"));
  })
});
