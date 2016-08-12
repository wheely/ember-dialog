/* globals blanket, module */

var options = {
  modulePrefix: "ember-dialog",
  filter: "//.*ember-dialog/.*/",
  antifilter: "//.*(tests|template).*/",
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ["json", "html", "lcov"],
    autostart: true
  }
};
if (typeof exports === "undefined") {
  blanket.options(options);
} else {
  module.exports = options;
}
