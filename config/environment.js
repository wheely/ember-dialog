/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    LOG_DIALOG: true,
    baseURL: process.env.BASE_URL || '/',
    'ember-dialog': {
      layoutPath: "layouts"
    }
  };
};
