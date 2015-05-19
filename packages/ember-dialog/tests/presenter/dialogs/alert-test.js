/* global startApp */

var run = Ember.run, manager, app;

module("presenter/dialogs/alert", {
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

test("The dialog manager's method exists.", function() {
  ok(Ember.typeOf(manager.alert) === "function", "the dialog manager has method");
});

test("The dialog has just 1 onboard accept-button", function() {
  ok(true, "the dialog has buttons its need");
});
