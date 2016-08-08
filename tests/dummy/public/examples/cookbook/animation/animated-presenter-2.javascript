import Ember from 'ember';
import Presenter from 'ember-dialog/components/presenter';

export default Presenter.extend({

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
