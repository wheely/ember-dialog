/* global startApp */

var run = Ember.run, manager, app;

module("presenter/inheriting", {
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

test("Test keeper", function() {
  ok(true, "placeholder");
});
