/* globals ENV, QUnit */

;(function (){
  window.Ember = window.Ember || {};

  Ember.config = {};
  Ember.testing = true;
  Ember.LOG_VERSION = false;

  window.ENV = { TESTING: true, LOG_VERSION: false };

  var extendPrototypes = QUnit.urlParams.extendprototypes;
  ENV['EXTEND_PROTOTYPES'] = !!extendPrototypes;

  window.async = function(callback, timeout) {
    var timer;
    stop();

    timer = setTimeout(function() {
      start();
      ok(false, "Timeout was reached");
    }, timeout || 200);

    return function() {
      clearTimeout(timer);

      start();

      var args = arguments;
      return Ember.run(function() {
        return callback.apply(this, args);
      });
    };
  };

  window.asyncEqual = function(a, b, message) {
    Ember.RSVP.all([ Ember.RSVP.resolve(a), Ember.RSVP.resolve(b) ]).then(async(function(array) {
      /*globals QUnit*/
      QUnit.push(array[0] === array[1], array[0], array[1], message);
    }));
  };

  window.invokeAsync = function(callback, timeout) {
    timeout = timeout || 1;

    setTimeout(async(callback, timeout+100), timeout);
  };

  QUnit.begin(function(){
    Ember.RSVP.configure('onerror', function(reason) {
      // only print error messages if they're exceptions;
      // otherwise, let a future turn of the event loop
      // handle the error.
      if (reason && reason instanceof Error) {
        Ember.Logger.log(reason, reason.stack);
        throw reason;
      }
    });
  });

  // Generate the jQuery expando on window ahead of time
  // to make the QUnit global check run clean
  jQuery(window).data('testing', true);

  window.warns = function(callback, regex){
    var warnWasCalled = false;
    var oldWarn = Ember.warn;
    Ember.warn = function Ember_assertWarning(message, test){
      if (!test) {
        warnWasCalled = true;
        if (regex) {
          ok(regex.test(message), 'the call to Ember.warn got an unexpected message: ' + message);
        }
      }
    };
    try {
      callback();
      ok(warnWasCalled, 'expected Ember.warn to warn, but was not called');
    } finally {
      Ember.warn = oldWarn;
    }
  };

  window.noWarns = function(callback){
    var oldWarn = Ember.warn;
    var warnWasCalled = false;
    Ember.warn = function Ember_noWarn(message, test){
      warnWasCalled = !test;
    };
    try {
      callback();
    } finally {
      ok(!warnWasCalled, 'Ember.warn warned when it should not have warned');
      Ember.warn = oldWarn;
    }
  };

})();
