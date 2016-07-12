/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-dialog',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    this._super.included(target);
    app.import('vendor/ember-dialog/register-version.js');
  },

  // @see https://github.com/ember-cli/ember-cli/issues/4918
  hintingEnabled: function() {
    return false;
  }

};
