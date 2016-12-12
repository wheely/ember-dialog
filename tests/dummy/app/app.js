import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

Ember.LinkComponent.reopen({
  classNameBindings: ["isATag:w-link"],
  activeClass: "__w-state-selected",
  isATag: Ember.computed.equal("tagName", "a"),
  _invoke: function() {
    window.scrollTo(0, 0);
    return this._super(...arguments);
  }
});

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
