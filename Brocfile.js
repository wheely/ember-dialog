var filterTemplates = require('broccoli-template');
var pickFiles = require('broccoli-static-compiler');
var compileES6 = require('broccoli-es6-concatenator');
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees')
var findBowerTrees = require('broccoli-bower')
var uglifyJavaScript = require('broccoli-uglify-js')
var compileSass = require('broccoli-sass')
var unwatchedTree = require('broccoli-unwatched-tree');

function preprocess(tree) {
    // Wrap .hbs files by handlebar compile
    tree = filterTemplates(tree, {
        extensions: ['hbs', 'handlebars'],
        compileFunction: 'Ember.Handlebars.compile'
    });
    return tree;
}

var compiler = require('ember-template-compiler');
var broccoliTemplateBuilder = require('broccoli-template-builder');
var templates = 'app/templates';
    templatesAMD = broccoliTemplateBuilder(templates, {
        extensions: ['hbs'],
        outputFile: 'assets/ember.dialog.templates.js',
        namespace: 'Ember.TEMPLATES',
        compile: function (string) {
            var tmpl = string.replace(/\n/g, '').replace(/'/g, "\\'")
            return "Ember.Handlebars.compile('"+tmpl+"')";
        }
    });


/////////////////////////////////////////////////////////////////////
// Directory `app/`
/////////////////////////////////////////////////////////////////////
app = pickFiles('app', {srcDir: '/', destDir: 'ember-dialog'});
app = preprocess(app)


/////////////////////////////////////////////////////////////////////
// Directory `styles/`
/////////////////////////////////////////////////////////////////////
styles = pickFiles('styles', {srcDir: '/', destDir: 'ember-dialog'});
styles = preprocess(styles);



/////////////////////////////////////////////////////////////////////
// Directory `tests/`
/////////////////////////////////////////////////////////////////////
tests = pickFiles('tests', {srcDir: '/', destDir: 'ember-dialog/tests'});
tests = preprocess(tests)



/////////////////////////////////////////////////////////////////////
// Directory `vendor/`
/////////////////////////////////////////////////////////////////////
var vendor = 'vendor';



/////////////////////////////////////////////////////////////////////
// All together tree
/////////////////////////////////////////////////////////////////////
// Squash together
var sourceTrees = [app, styles, vendor];
    sourceTrees = sourceTrees.concat(findBowerTrees())
var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true })



/////////////////////////////////////////////////////////////////////
// SASS files build
/////////////////////////////////////////////////////////////////////
appCss = compileSass(sourceTrees, 'ember-dialog/app.scss', 'assets/ember.dialog.min.css', {outputStyle: 'compressed'})



/////////////////////////////////////////////////////////////////////
// ES6 Javascript files build
/////////////////////////////////////////////////////////////////////
var appJsAMD = compileES6(appAndDependencies, {
  // loaderFile: 'loader.js',
  ignoredModules: [
    'ember/resolver'
  ],
  inputFiles: [
    'ember-dialog/**/*.js'
  ],
  legacyFilesToAppend: [
    // 'jquery.js',
    // 'handlebars.js',
    // 'ember.js',
    // 'ember-resolver.js'
  ],
  wrapInEval: false,
  outputFile: '/assets/ember.dialog.min.js'
})


appJSbootstraper = pickFiles(unwatchedTree('.'), {srcDir: '/', files: ['index.js'], destDir: '/'});

appJsAMD = mergeTrees([appJsAMD, templatesAMD, appJSbootstraper]);
appJsAMD = uglifyJavaScript(appJsAMD, {mangle: false, compress: false});

var appJsAMD = concat(appJsAMD, {
    inputFiles: ['**/*.js'],
    outputFile: '/assets/ember.dialog.min.js',
    separator: '\n', // (optional, defaults to \n)
    wrapInEval: false, // (optional, defaults to false)
    wrapInFunction: false, // (optional, defaults to true)
    header: '/** Copyright Wheely Inc. 2014 **/', // (optional)
});

loader = pickFiles('vendor', {srcDir: '/', files: ['*.js'], destDir: '/assets'});



/////////////////////////////////////////////////////////////////////
// HTML files
/////////////////////////////////////////////////////////////////////
var html = pickFiles(app, { srcDir: '/ember-dialog', files: ['index.html'], destDir : '/'});

module.exports = mergeTrees([appJsAMD, appCss, html, loader])