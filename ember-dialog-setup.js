/* globals syncForTest */

;(function(){

  Ember.RSVP.configure('onerror', function(reason) {
    // only print error messages if they're exceptions;
    // otherwise, let a future turn of the event loop
    // handle the error.
    if (reason && reason instanceof Error) {
      Ember.Logger.log(reason, reason.stack);
      throw reason;
    }
  });


  var Application = Ember.Application;
  var Router = Ember.Router;

  var Resolver = require('ember/resolver');

  function startApp(attrs) {
    var App;

    Ember.ENV.LOG_DIALOG = false;

    var attributes = Ember.merge({
      // useful Test defaults
      rootElement: '#ember-testing',
      LOG_ACTIVE_GENERATION:false,
      LOG_VIEW_LOOKUPS: false,
      LOG_DIALOG: false,
      modulePrefix: 'ember-dialog',
      Resolver: Resolver
    }, attrs); // but you can override;

    Router.reopen({
      location: 'none'
    });

    Ember.run(function(){
      App = Application.create(attributes);
      App.setupForTesting();
      App.injectTestHelpers();
    });

    App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

    return App;
  }

  window.startApp = startApp;
  window.Resolver = Resolver;

})();
