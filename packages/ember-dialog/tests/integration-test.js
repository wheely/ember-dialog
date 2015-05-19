/* global startApp */

var Manager = Dialog.Manager;
var Presenter = Dialog.Presenter;
var run = Ember.run, app;

module("integration", {
  setup: function() { app = startApp(); },
  teardown: function() { run(app, app.destroy); }
});

test("The dialog manager should have one dialog after creation and zero after closing.", function() {
  ok(app.registry.lookup('dialog:manager') instanceof Manager, "the dialog manager is instantiated");
});

test("The dialog presenter should be registered in a container.", function() {
  ok(app.registry.lookup('dialog:presenter') instanceof Presenter, "the dialog presenter is injected");
});

test("The dialog manager should be injected into controllers.", function() {
  ok(app.registry._typeInjections.controller.findBy("fullName", "dialog:manager"), "the dialog manager is injected");
});

test("The base templates was injected.", function() {
  ok(app.registry.resolve('template:dialog'), "the templates is injected");
});
