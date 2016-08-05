/* global alert */
import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  username: "Vladimir Milkov",

  count: 0,

  actions: {

    simpleAlert() {
      alert("Hello, " + this.get("username"));
    },

    dialogAlert() {
      this.get("dialog").alert(hbs`Hello, {{contextObject.username}}`, this);
    },

    confirmDeletion() {
      asad = 123
      const promise = this.get("dialog").confirm(hbs`Are you sure?`);
      promise.then(() => { alert("Remove"); });
      promise.catch(() => { alert("Cancel"); });
    },

    showDialog() {
      const template = hbs`Dialog will be closed after 10 trying (you tried {{contextObject.count}})`;
      const promise = this.get("dialog").confirm(template, this);
      promise.then(() => {
        alert("10 reached!");
      });
    },

    accept(presenter) {
      this.incrementProperty("count");
      if (this.get("count") >= 10) {
        presenter.accept();
      }
    }

  }

});
