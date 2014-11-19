import DialogManagerInitializer from 'ember-dialog/initializers/dialog-manager';

var App = Ember.Application.extend();

// Set-up dialog manager
App.initializer(DialogManagerInitializer);

export default App;
