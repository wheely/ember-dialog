/**
  @module ember-dialog
*/

/**
  All Ember Dialog methods and functions are defined inside of this namespace.
  @class Dialog
  @static
*/

/**
  @property VERSION
  @type String
  @default 'VERSION_STRING_PLACEHOLDER'
  @static
*/
/*jshint -W079 */
var Dialog = Ember.Namespace.create({
  VERSION: 'VERSION_STRING_PLACEHOLDER'
});

if (Ember.libraries) {
  Ember.libraries.registerCoreLibrary('Ember Dialog', Dialog.VERSION);
}

export default Dialog;
