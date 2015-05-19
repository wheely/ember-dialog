/* global startApp */

var run = Ember.run, manager, app;

module("manager", {
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

test("The dialog manager should have one dialog after creation and zero after closing.", function() {
  expect(3);

  var doneOnCreate = async(function() {
    ok(Ember.isEqual(manager.dialogsList.length, 1), "the dialog manager have only 1 dialog created after creation");
  });

  var doneOnInsert = async(function(dialog) {
    var rootElementSelector = Ember.get(manager, 'rootElement'),
        rootElement = Ember.$(rootElementSelector),
        dialogElement = dialog.$(),
        isDialogInserted = dialogElement.closest(rootElement).size() > 0;
    ok(isDialogInserted, "the dialog has been inserted into the page");
  });

  var doneOnClose = async(function() {
    ok(Ember.isEqual(manager.dialogsList.length, 0), "the dialog manager doesn't have any dialogs after closing");
  });

  run(function() {
    manager.alert("Some template goes here");
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      doneOnCreate();
      doneOnInsert(dialog);
      dialog.close().then(doneOnClose);
    });
  });

});

test("The dialog manager should have 2 dialogs after creation 2 dialogs.", function() {

  run(function() {
    manager.alert("Some template goes here 1");
    manager.alert("Some template goes here 2");
    run.scheduleOnce('afterRender', this, function() {
      ok(Ember.isEqual(manager.dialogsList.length, 2), "the dialog manager have 2 dialogs opened");
    });
  });

});

test("The dialog take options passed to a manager on creation.", function() {

  var title = "dialog-class-name-to-test",
      acceptClass = "test-accept-button-class";

  run(function() {
    manager.alert("Some template goes here", null, {title: title, acceptClass: acceptClass});
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      ok(dialog.get('title') === title, "the dialog has got a title");
      ok(dialog.get('acceptClass') === acceptClass, "the dialog has got a accept button сlass");
      dialog.close();
    });
  });

});

test("The dialog manager shouldn't contain any dialogs after closeAll operation.", function() {
  run(function() {
    manager.alert("Some template goes here");
    manager.alert("Some template goes here");
    manager.alert("Some template goes here");
    manager.alert("Some template goes here");
    run.scheduleOnce('afterRender', this, function() {
      manager.closeAll();
      ok(Ember.isEmpty(manager.dialogsList), "the dialog doesn't have any dialog created");
    });
  });
});

test("The dialog should create instances on its own.", function() {
  run(function() {
    manager.alert("Some template goes here", null);
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      ok(Ember.typeOf(dialog.controller) === "instance", "the dialog created controller");
      ok(Ember.typeOf(dialog.body) === "class", "the dialog created view");
    });
  });
});

test("The dialog should place a plain text into body.", function() {
  run(function() {
    var text = "Text for test";
    manager.alert(text);
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      var bodyText = dialog.$('.dialog-body').text().trim();
      ok(bodyText === text, "the dialog contain plain text in it");
    });
  });
});

test("The dialog should place a html into body.", function() {
  run(function() {
    var text = "<b>Text for test</b>";
    manager.alert(text);
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      var bodyText = dialog.$('.dialog-body').html().trim();
      ok(bodyText === text, "the dialog contain plain text in it");
    });
  });
});

test("The dialog should work with a templates.", function() {
  run(function() {
    var templatePath = "test-template";
    var text = 'TEST';
    Ember.TEMPLATES[templatePath] = Ember.Handlebars.compile(text);
    manager.alert(templatePath);
    run.scheduleOnce('afterRender', this, function() {
      delete Ember.TEMPLATES[templatePath];
      var dialog = manager.getDialog(manager.get('active'));
      var bodyText = dialog.$('.dialog-body').text().trim();
      ok(bodyText === text, "the dialog contain template's text in it");
    });
  });
});

test("The dialog should work with a dynamically parts of template.", function() {
  run(function() {
    var templatePath = "test-template";
    var text = 'The title is: {{view.dialog.title}}';
    Ember.TEMPLATES[templatePath] = Ember.Handlebars.compile(text);
    manager.alert(templatePath, null, {title: 'aaa'});
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      var bodyText = dialog.$('.dialog-body').text().trim();
      ok(bodyText === "The title is: aaa", "the dialog contain variables from the dialog component");
      delete Ember.TEMPLATES[templatePath];
    });
  });
});

test("The dialog should has the controller's data", function() {
  run(function() {
    var templatePath = "test-template";
    var text = "var 1: {{variable_one}}; var 2: {{variable_two}}";
    Ember.TEMPLATES[templatePath] = Ember.Handlebars.compile(text);
    manager.alert(templatePath, Ember.Controller.create({variable_one: 111, variable_two: 222}));
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      var bodyText = dialog.$('.dialog-body').text().trim();
      ok(bodyText === "var 1: 111; var 2: 222", "the dialog contain variables from controller");
      delete Ember.TEMPLATES[templatePath];
    });
  });
});

test("The active dialog sets right", function() {
  run(function() {
    var dialog_1, dialog_2;
    manager.alert("Dialog window 1");
    dialog_1 = manager.get('active');
    manager.alert("Dialog window 1");
    dialog_2 = manager.get('active');
    run.scheduleOnce('afterRender', this, function() {
      ok(dialog_2 === manager.get('active'), "the active dialog sets right after creating another one");
      var dialog = manager.getDialog(dialog_2);
      dialog.close();
      ok(dialog_1 === manager.get('active'), "the active dialog sets right after closing another one");
    });
  });
});
