var pickFiles        = require('broccoli-static-compiler');
var concat           = require('broccoli-concat');
var es6              = require('broccoli-es6-module-transpiler');
var merge            = require('broccoli-merge-trees');
var PackageResolver  = require('es6-module-transpiler-package-resolver');
var AMDFormatter     = require('es6-module-transpiler-amd-formatter');
var fileCreator      = require('broccoli-file-creator');
var merge            = require('broccoli-merge-trees');
var replace          = require('broccoli-replace');
var HtmlbarsCompiler = require('ember-cli-htmlbars');

function amdES6Package(packages, HtmlbarsCompiler, EmberTemplateCompiler) {

  // var templateTree = pickFiles('packages/ember-dialog/lib', {
  //   srcDir: '/templates/',
  //   files: ['**/*.hbs'],
  //   destDir: '/ember-dialog/templates/'
  // });

  // templateTree = new HtmlbarsCompiler(templateTree, {
  //   templateCompiler: EmberTemplateCompiler
  // });

  // packages = merge([packages, templateTree], {overwrite: true});

  templateTree = pickFiles('packages/ember-dialog/lib', {
    srcDir: '/templates/',
    files: ['**/*.hbs'],
    destDir: '/ember-dialog/templates/'
  });

  templateTree = new HtmlbarsCompiler(templateTree, {
    isHTMLBars: true,
    templateCompiler: EmberTemplateCompiler
  });

  var es6Build = es6(packages, {
    inputFiles: ['ember-dialog'],
    output: '/ember-dialog/',
    resolvers: [PackageResolver],
    formatter: new AMDFormatter(),
    basePath: '/ember-dialog/',
    sourceRoot: '/ember-dialog/'
  });

  var bootFile = fileCreator('/boot.js', 'require("ember-dialog/lib/main");');

  var amdBuild = merge([es6Build, bootFile, templateTree]);

  amdBuild = concat(amdBuild, {
    inputFiles: ['ember-dialog/**/*.js', 'boot.js'],
    outputFile: '/ember-dialog.js',
    header: '(function(){',
    footer: '})();'
  });

  amdBuild = merge([es6Build, amdBuild]);

  return replace(amdBuild, {
    files: ['ember-dialog.js'],
    patterns: [
      {
        match: /\/lib/g,
        replacement: ''
      },
      {
        match: /\/main/g,
        replacement: ''
      }
    ]
  });
}

module.exports = amdES6Package;
