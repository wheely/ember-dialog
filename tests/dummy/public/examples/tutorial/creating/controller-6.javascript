import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  username: "Vladimir Milkov",
  remove: Ember.on('init', function() {
    const template = hbs`Press here if you are sure to delete user named {{contextObject.username}}`;
    const context = this;
    const options = { substrate: false };
    this.get("dialog").confirm(template, context, options);
  })
});
