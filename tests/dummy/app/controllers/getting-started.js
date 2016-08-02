import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {

    showAlert() {

      const template = hbs`Hello world {{title}} <span onclick={{action "showConfirm" target=contextObject}}>click</span>`;
      const context = this;
      const options = { title: "23151235" };

      this.get("dialog").alert(template, context, options);

    },

    showConfirm() {
      const promise = this.get("dialog").confirm("test-message", this, {
        title: "Are you sure?"
      });
    },

    showBlank() {
      const promise = this.get("dialog").blank("test-message", this);
    }

  }

});
