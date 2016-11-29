/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: "dummy",
    environment: environment || "development",
    rootURL: "/",
    locationType: process.env.LOCATION_TYPE || "hash",
    contentSecurityPolicy: {
      "default-src": "'none'",
      "script-src": "'self' 'unsafe-eval' 'unsafe-inline' http://localhost:33630 http://127.0.0.1:33630 http://localhost:2100 http://127.0.0.1:2100 http://cdnjs.cloudflare.com https://www.google-analytics.com",
      "font-src": "'self' data: https://fonts.gstatic.com",
      "connect-src": "'self' ws://*:33630 http://localhost:2100 ws://localhost:2100",
      "img-src": "'self' data: https://s3.amazonaws.com https://www.google-analytics.com",
      "style-src": "'self' 'unsafe-inline' http://cdnjs.cloudflare.com",
      "media-src": "'self'"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    i18n: {
      defaultLocale: "en"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
  }

  return ENV;
};
