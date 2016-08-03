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
    this.route('animation');
    this.route('how-to-make-dialog-drag-n-dropable');
    this.route('showing-server-errors');
    this.route('creating-notices');
    this.route('working-with-forms');
  });
  this.route('tutorial', function () {
    this.route('creating');
    this.route('presenter-and-manager');
    this.route('advanced-creating-dialog');
    this.route('interrupt-closing');
    this.route('listening-events');
    this.route('creating-dialog-templates');
    this.route('customizing-dialog');
  });
});

export default Router;
