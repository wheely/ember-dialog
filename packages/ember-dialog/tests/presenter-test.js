/* global startApp */

var run = Ember.run, manager, app;

module("presenter", {
  setup: function() {
    app = startApp();
    manager = app.registry.lookup('dialog:manager');
    run(manager, manager.reset);
  },
  teardown: function() {
    run(app, app.destroy);
    run(manager, manager.destroy);
  }
});

test("The dialog should throw an exception when compiler wasn't included", function() {
  var __originCompile = Ember.Handlebars.compile;
  Ember.Handlebars.compile = function(view) { throw ""; };
  run(function() {
    var template = "Hello I'm template";
    throws(function() { manager.alert(template); });
    Ember.Handlebars.compile = __originCompile;
  });
});
