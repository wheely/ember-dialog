/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-dialog',
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
  included: function(app) {
    this._super.included(app);

    var options = {
      exports: {
        'ember-dialog': [
          'default'
        ]
      }
    };

    app.import({
      development: app.bowerDirectory + '/ember-dialog/ember-dialog.js',
      production: app.bowerDirectory + '/ember-dialog/ember-dialog.prod.js'
    }, options);
    // Source maps
    app.import({
      development: app.bowerDirectory + '/ember-dialog/ember-dialog.js.map'
    }, {destDir: 'assets'});
  }
};
