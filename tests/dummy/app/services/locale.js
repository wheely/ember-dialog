/* global localStorage */

import Ember from 'ember';
import Config from '../config/environment';

/**
  The localStorage.
  @external localStorage
  @see {@link https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage|LocalStorage}
*/

/**
  @module service/locale
*/

/**
  Anyone a storage object. May be the sessionStorage if you like so.
  @member storage
  @type {external:localStorage}
*/
var storage = localStorage;

/**
  The language code, dictionary of which is exist any way. If the `languageCode`
  doesn't exists in the {@link module:locale~storage|LocalStorage}, its will be created with this value.
  @member DEFAULT_LANGUAGE
  @type {String}
*/
var DEFAULT_LANGUAGE = 'en';

/**
  The language code gotten from browser's locale. The language will be
  sought in the available language list and if it will not be found, the
  [DEFAULT_LANGUAGE]{@link module:locale~DEFAULT_LANGUAGE} will be set as default, otherwise it will be set.
  @member DETERMINED_LANGUAGE
  @type {String}
*/
var DETERMINED_LANGUAGE = window.navigator.language.split('-').shift();

/**
  @class Locale
  @extends Ember.Service
  @mixes Ember.Evented
  @memberOf module:service/locale
  @fires module:service/locale.Locale#languageDidChange
*/
var Locale = Ember.Service.extend(Ember.Evented, {

  /**
    List of the languages, available for users. Every language has translation
    dictionary, you can find in the `public/i18n/` directory. Translation
    provided by i18n library.
    @name module:service/locale.Locale#languages
    @type Array
  */
  languages: Ember.A(Config.languages),

  /**
    Language code in the ISO 639‑1. If you don't understand what it means,
    please take a look at http://en.wikipedia.org/wiki/ISO_639-1.
    @name module:service/locale.Locale#languageCode
    @default 'en'
    @type {String}
  */
  languageCode: null,

  /**
    The selected language' record. The record is found in the list by
    `languageCode`. If you want to change the language you should change
    languageCode property, it cause changing of selected language.
    @example isRussian: computed.equal('locale.language.code', 'ru')
    @memberOf module:service/locale.Locale#
    @property {object}  language
    @property {number}  language.code     A ISO-3166-1-alpha-2 language code (e.g. ru, en)
    @property {number}  language.name     The language name
    @property {number}  language.options  An options of the language
    @type Object
  */
  language: Ember.computed("languageCode", function() {
    return this.get('languages').findBy('code', this.get('languageCode'));
  }).readOnly(),

  /**
    Called when language was changed.
    @event module:service/locale.Locale#languageDidChange
  */
  languageDidChange: Ember.observer("language", function() {
    this.trigger('languageDidChange', this.get('language'));
  }),

  /**
    Calls every time when `languageCode` changed. Puts the language code into
    the local storage, to pick up it in future.
    @name module:service/locale.Locale#_update
    @private
  */
  _update: Ember.observer("languageCode", function() {
    storage.languageCode = this.get('languageCode');
    Config.LOG_LOCALE && Ember.Logger.log("LOG_LOCALE: The language code has been changed to", storage.languageCode);  // jshint ignore: line
  }),

  /**
    Sate the object by locale data gotten from a local storage or up the
    defaults into the {@link module:locale~storage|LocalStorage}.
    @method module:service/locale.Locale#init
  */
  init: function() {

    // Grab the language code from a local storage.
    var languageCode = storage.languageCode,

        // The language list, available for user.
        languages = this.get('languages');

    // The language from a local storage isn't exist in the language list
    // or wasn't set at all.
    if (!languageCode || !languages.findBy('code', languageCode)) {
      // Searching a language in the list by the user's locale language code.
      if (languages.findBy('code', DETERMINED_LANGUAGE)) {
        // The determined language is fits (it was found in the language
        // list) - setting it up.
        languageCode = DETERMINED_LANGUAGE;
      } else {
        // Prefered language from a user's locale wasn't found in the
        // language list. Setting him a default language.
        languageCode = DEFAULT_LANGUAGE;
      }
    }

    // Set up the language code
    this.set('languageCode', languageCode);

    return this._super.apply(this, arguments);
  },

  /**
    @method module:service/locale.Locale#setLanguageCode
    @param {String} code  An [language code]{@link module:service/locale.Locale#language} (e.g. 'en', 'ru' etc.)
  */
  setLanguageCode: function(code) {
    this.set('languageCode', code);
  },

  /**
    @method module:service/locale.Locale#toString
    @return {String}
  */
  toString: function() {
    return "<(The Locale Service)>";
  }

});

export default Locale;
export var DETERMINED_LANGUAGE;
export var DEFAULT_LANGUAGE;
export var storage;
