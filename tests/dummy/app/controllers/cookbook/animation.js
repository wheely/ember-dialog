import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';

export default Ember.Controller.extend({

  actions: {
    showDialog() {
      this.get("dialog").alert(hbs`Dialog's body`, this);
    },
    showAnimatedDialog() {
      this.get("dialog").alert(hbs`Dialog's body`, this, undefined, "presenter-animated");
    },
    showAnimation(animationToShow, animationToHide, delay=1000) {
      this.get("dialog").alert(hbs`Dialog's body`, this, {animationToShow, animationToHide, delay}, "presenter-animate-css");
    }
  }

});
