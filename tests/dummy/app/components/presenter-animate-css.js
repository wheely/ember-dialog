import Ember from 'ember';
import Presenter from 'ember-dialog/components/presenter';

export default Presenter.extend({

  animationToShow: "animation__fadeIn",
  animationToHide: "animation__fadeIn",

  delay: 500,

  accept() {
    this.$(".dialog-content").addClass(this.get("animationToHide"));
    Ember.run.later(this, "_accept", this.get("delay"));
  },

  decline() {
    this.$(".dialog-content").addClass(this.get("animationToHide"));
    Ember.run.later(this, "_decline", this.get("delay"));
  },

  didRender() {
    this.$(".dialog-content").addClass("animated");
    return this._super(...arguments);
  },

  didInsertElement() {
    Ember.run.scheduleOnce("afterRender", this, () => {
      this.$(".dialog-content").addClass(this.get("animationToShow"));
    });
    return this._super(...arguments);
  }

});
