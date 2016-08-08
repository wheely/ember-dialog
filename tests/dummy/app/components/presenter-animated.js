import Ember from 'ember';
import Presenter from 'ember-dialog/components/presenter';

export default Presenter.extend({

  animation: "animation__fadeIn",

  delay: 500,

  accept() {
    this.$(".ember-dialog-dialog").removeClass(this.get("animation"));
    Ember.run.later(this, "_accept", this.get("delay"));
  },

  decline() {
    this.$(".ember-dialog-dialog").removeClass(this.get("animation"));
    Ember.run.later(this, "_decline", this.get("delay"));
  },

  willInsertElement() {
    this.$(".ember-dialog-dialog").addClass("animation");
    return this._super(...arguments);
  },

  didInsertElement() {
    Ember.run.scheduleOnce("afterRender", this, () => {
      this.$(".ember-dialog-dialog").addClass(this.get("animation"));
    });
    return this._super(...arguments);
  }

});
