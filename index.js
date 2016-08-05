/* jshint node: true */
/* jshint ignore:start */
"use strict";

module.exports = {

  name: "ember-dialog",

  isDevelopingAddon() {
    return true;
  },

  included(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    this._super.included(target);
    app.import("vendor/ember-dialog/register-version.js");
  },

  // @see https://github.com/ember-cli/ember-cli/issues/4918
  hintingEnabled() {
    return false;
  }

};
