import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  remove: Ember.on('init', function() {
    const promise = this.get("dialog").confirm(hbs`Are you sure?`);
    promise.then(() => { alert("Remove"); })
    promise.catch(() => { alert("Cancel"); })
  })
});
