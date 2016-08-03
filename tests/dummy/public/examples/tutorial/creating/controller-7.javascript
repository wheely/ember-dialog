import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({
  count: 0,
  showDialog: Ember.on('init', function() {
    const promise = this.get("dialog").confirm(hbs`Count {{contextObject.count}}`, this);
    promise.then(() => {
      alert("10 reached!");
    })
  }),

  actions: {
    accept(presenter) {
      this.incrementProperty("count");
      if (this.get("count") > 10) {
        presenter.accept();
      }
    }
  }
});
