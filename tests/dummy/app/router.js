import Ember from 'ember';
import config from './config/environment';
import changeLocaleHandler from './utils/change-locale';

const Router = Ember.Router.extend({
  location: config.locationType,
  didTransition() {
    this._super(...arguments);
    changeLocaleHandler();
  }
});

Router.map(function() {
  this.route('getting-started', { path: '/' });
  this.route('cookbook', function () {
    this.route('customization');
    this.route('prevent-closing');
    this.route('forms');
  });
  this.route('tutorial', function () {
    this.route('creating');
    this.route('presenter-and-manager');
  });
});

export default Router;
