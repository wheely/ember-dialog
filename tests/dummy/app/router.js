import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  didTransition() {
    this._super(...arguments);
    if (window.Prism) {
      Ember.run.scheduleOnce("afterRender", window.Prism, () => {
        Ember.run.later(this, () => {
          try {
            window.Prism.highlightAll();
            window.Prism.fileHighlight();
          } catch(e) {}
        }, 1000);
      });
    }
  }
});

Router.map(function() {
  this.route('getting-started', { path: '/' });
  this.route('cookbook', function () {
    this.route('creating');
    this.route('customization');
    this.route('prevent-closing');
    this.route('forms');
  });
});

export default Router;
