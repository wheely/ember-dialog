import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  count: 0,
  showDialog: Ember.on('init', function() {
    const template = hbs`Dialog will be closed after 10 trying (you tried {{contextObject.count}})`;
    const promise = this.get("dialog").confirm(template, this);
    promise.then(() => {
      alert("10 reached!");
    })
  }),

  actions: {
    accept(presenter) {
      this.incrementProperty("count");
      if (this.get("count") >= 10) {
        presenter.accept();
      }
    }
  }
});
