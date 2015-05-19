/* jshint node: true */

var es6                   = require('broccoli-es6-module-transpiler');
var AMDFormatter          = require('es6-module-transpiler-amd-formatter');
var PackageResolver       = require('es6-module-transpiler-package-resolver');
var concat                = require('broccoli-concat');
var uglify                = require('broccoli-uglify-js');
var es3SafeRecast         = require('broccoli-es3-safe-recast');
var env                   = process.env.EMBER_ENV;
var amdBuild              = require('./lib/amd-build');
var pickFiles             = require('broccoli-static-compiler');
var merge                 = require('broccoli-merge-trees');
var moveFile              = require('broccoli-file-mover');
var wrap                  = require('broccoli-wrap');
var jshint                = require('broccoli-jshint');
var defeatureify          = require('broccoli-defeatureify');
var version               = require('git-repo-version')(10);
var yuidoc                = require('broccoli-yuidoc');
var replace               = require('broccoli-replace');
var stew                  = require('broccoli-stew');
var path                  = require('path');
var fs                    = require('fs');
var jscsTree              = require('broccoli-jscs');
var EmberTemplateCompiler = require('./bower_components/ember/ember-template-compiler');
var HtmlbarsCompiler      = require('ember-cli-htmlbars');
var templateCompiler      = require('broccoli-ember-hbs-template-compiler');
var compileSass           = require('broccoli-sass');

function minify(tree, name){
  var config = require('./config/ember-defeatureify');
  tree = defeatureify(tree, {
    debugStatements: config.options.debugStatements,
    enableStripDebug: config.stripDebug
  });
  tree = moveFile(tree, {
    srcFile: name + '.js',
    destFile: '/' + name + '.prod.js'
  });
  tree = removeSourceMappingURL(tree);
  var uglified = moveFile(uglify(tree, {mangle: true}),{
    srcFile: name + '.prod.js',
    destFile: '/' + name + '.min.js'
  });
  return merge([uglified, tree], {overwrite: true});
}

function testTree(packageName){
  var test = pickFiles('packages/' + packageName + '/tests', {
    srcDir: '/',
    files: [ '**/*.js' ],
    destDir: '/' + packageName
  });
  var jshinted = jshint('packages/' + packageName + '/', {
    jshintrcPath: path.join(__dirname, '.jshintrc')
  });
  jshinted = wrap(jshinted, {
    wrapper: [ "if (!QUnit.urlParams.nojshint) {\n", "\n}"],
  });
  jshinted = pickFiles(jshinted, {
    files: ['{lib,tests}/**/*.js'],
    srcDir: '/',
    destDir: '/' + packageName + '-jshint'
  });
  test = es6(test, {
    inputFiles: ['{lib,tests}/**/*.js'],
    output: '/' + packageName + '-tests.js',
    resolvers: [PackageResolver],
    formatter: 'bundle'
  });
  // jshinted = pickFiles(jshinted, {
  //   files: ['{lib,tests}/**/*.js'],
  //   srcDir: '/',
  //   destDir: '/' + packageName + '-jshint'
  // });
  return merge([jshinted, test]);
}

var yuidocTree = yuidoc('packages', {
  srcDir: '/',
  destDir: 'docs',
  yuidoc: {
    "name": "The ember-dialog API",
    "description": "The ember-dialog API: a data persistence library for Ember.js",
    "version": version,
    "logo": "http://f.cl.ly/items/1A1L432s022u1O1q1V3p/ember%20logo.png",
    "url": "https://github.com/emberjs/data",
    "options": {
      "paths": [
        "packages/ember-dialog/lib"
      ],
      "exclude": "vendor",
      "outdir":   "docs/build"
    }
  }
});

// Excludes tests files from package path
function package(packagePath, vendorPath) {
  vendorPath = vendorPath || 'packages/';
  return pickFiles(vendorPath + packagePath, {
    files: [ 'lib/**/*.js' ],
    srcDir: '/',
    destDir: '/' + packagePath
  });
}

function packageAddon(packagePath, vendorPath) {
  return stew.rename(pickFiles(vendorPath + packagePath, {
    files: [ '**/*.js' ],
    srcDir: '/addon',
    destDir: '/' + packagePath + '/lib'
  }), 'index.js', 'main.js');
}

var packages = merge([
  package('ember-dialog'),
  package('ember')
]);

var globalBuild, templateTree;

/**
  The method is redefined to make building templates into Ember's TEMPLATES namespace,
  where they will be found by default Ember's template resolver.
*/
HtmlbarsCompiler.prototype.processString = function (string, relativePath) {
  // Getting the pure path to the template
  var path = relativePath.replace('ember-dialog/templates/', '').replace('.hbs', '');

  // Build the template by HTMLBar builder and put the result into Ember's namespace.
  return 'Ember.TEMPLATES["' + path + '"] = Ember.HTMLBars.template(' + this.precompile(string, { moduleName: relativePath }) + ');';
};


// Bundle formatter for smaller payload
if (env === 'production') {

  templateTree = pickFiles('packages/ember-dialog/lib', {
    srcDir: '/templates/',
    files: ['**/*.hbs'],
    destDir: '/ember-dialog/templates/'
  });

  templateTree = new HtmlbarsCompiler(templateTree, {
    isHTMLBars: true,
    templateCompiler: EmberTemplateCompiler
  });

  packages = merge([packages, templateTree], {overwrite: true});

  globalBuild = es6(packages, {
    inputFiles: ['ember-dialog'],
    output: '/ember-dialog.js',
    resolvers: [PackageResolver],
    formatter: 'bundle'
  });

} else {
// Use AMD for faster rebuilds in dev
  globalBuild = amdBuild(packages, HtmlbarsCompiler, EmberTemplateCompiler);
}

var sassFiles = pickFiles('packages/ember-dialog/lib/styles', {srcDir: '/', destDir: 'ember-dialog/sass'});

var styleFiles = compileSass([sassFiles], 'ember-dialog/sass/main.scss', 'ember-dialog.css', {outputStyle: 'compressed'});

var testFiles = merge([
  testTree('ember-dialog'),
]);

if (env === 'production'){
  testFiles = es3SafeRecast(testFiles);
}

testFiles = concat(testFiles, {
  inputFiles: ['**/*.js'],
  separator: '\n',
  // wrapInEval: true,
  wrapInFunction: true,
  outputFile: '/ember-dialog-tests.js'
});

var testRunner = pickFiles('tests', {
  srcDir: '/',
  files: [ '**/*' ],
  destDir: '/'
});

var bower = pickFiles('bower_components', {
  srcDir: '/',
  destDir: '/bower_components'
});

var configurationFiles = pickFiles('config/package-manager-files', {
  srcDir: '/',
  destDir: '/',
  files: [ '**/*.json' ]
});

function versionStamp(tree) {
  return replace(tree, {
    files: ['**/*'],
    patterns: [{
      match: /VERSION_STRING_PLACEHOLDER/g,
      replacement: version
    }]
  });
}

function removeSourceMappingURL(tree) {
  return replace(tree, {
    files: ['**/*'],
    patterns: [{
      match: /\/\/(.*)sourceMappingURL=(.*)/g,
      replacement: ''
    }]
  });
}

configurationFiles = versionStamp(configurationFiles);

var jscsFiles = jscsTree("packages");

var trees = [
  testFiles,
  testRunner,
  bower,
  configurationFiles,
  jscsFiles
];

globalBuild = versionStamp(globalBuild);
if (env === 'production') {
  globalBuild = es3SafeRecast(globalBuild);
  var minifiedGlobals = minify(globalBuild, 'ember-dialog');
  trees.push(yuidocTree);
  trees.push(minifiedGlobals);
}

trees.push(globalBuild);
trees.push(styleFiles);

module.exports = merge(trees, {overwrite: true});
