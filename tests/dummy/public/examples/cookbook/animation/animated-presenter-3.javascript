import Ember from 'ember';
import Presenter from 'ember-dialog/components/presenter';

export default Presenter.extend({

  accept() {
    this.$(".ember-dialog-dialog").removeClass("animation__fade");
    Ember.run.later(this, "_accept", 500);
  },

  decline() {
    this.$(".ember-dialog-dialog").removeClass("animation__fade");
    Ember.run.later(this, "_decline", 500);
  },

  willInsertElement() {
    this.$(".ember-dialog-dialog").addClass("animation");
    return this._super(...arguments);
  },

  didInsertElement() {
    Ember.run.scheduleOnce("afterRender", this, () => {
      this.$(".ember-dialog-dialog").addClass("animation__fade");
    });
    return this._super(...arguments);
  }

});
