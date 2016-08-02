import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  username: "Vladimir Milkov",
  showGreeting: Ember.on('init', function() {
    this.get("dialog").alert(hbs`Hello, {{contextObject.username}}`, this);
  })
});
