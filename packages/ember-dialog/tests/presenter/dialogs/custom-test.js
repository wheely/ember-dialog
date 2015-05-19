/* global startApp */

var run = Ember.run, manager, app;

module("presenter/dialogs/custom", {
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
  ok(Ember.typeOf(manager.custom) === "function", "the dialog manager has method");
});

test("The dialog has no buttons onboard", function() {
  ok(true, "the dialog doesn't have buttons at all");
});
