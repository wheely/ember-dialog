/*jshint node:true*/
/* global require, module */
var EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    sassOptions: {
      includePaths: [
        "addon/styles"
      ]
    }
  });
  return app.toTree();
};
