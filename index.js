/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-dialog',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    this._super.included(app);
    app.import('vendor/ember-dialog/register-version.js');
  }

};
