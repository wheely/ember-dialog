/*jshint node:true*/
"use strict";

module.exports = function(/* environment, appConfig */) {
  return {
    LOG_DIALOG: true,
    languages: [
      { code: "ru" },
      { code: "en" }
    ],
    "ember-dialog": {
      layoutPath: "layouts"
    }
  };
};
