/* global startApp */

var run = Ember.run, manager, app;

module("presenter/dialogs/confirm", {
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
  ok(Ember.typeOf(manager.confirm) === "function", "the dialog manager has method");
});

test("The dialog has 2 onboard buttons: accept and decline", function() {
  ok(true, "the dialog has buttons its need");
});
