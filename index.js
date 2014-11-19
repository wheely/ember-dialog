Ember.onLoad('Ember.Application', function(Application) {
    var initializer = require("ember-dialog/initializers/dialog-manager")['default'];
    Application.initializer(initializer);
});