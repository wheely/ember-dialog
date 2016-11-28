import Ember from 'ember';
import LocaleService from '../services/locale';
import changeLocaleHandler from '../utils/change-locale';

function langHandler(appInstance, locale) {
  var languageCode = locale.get('languageCode');
  appInstance.lookup('service:i18n').set('locale', languageCode);
  changeLocaleHandler();
}

export function initialize(appInstance) {
  const { application } = appInstance;
  application.register('service:locale', LocaleService, { singleton: true });
  application.inject('controller', 'locale', 'service:locale');
  application.inject('route', 'locale', 'service:locale');
  application.inject('component', 'locale', 'service:locale');
  application.inject('model', 'locale', 'service:locale');

  // The global locale service (it's contain determined language)
  const locale = appInstance.lookup('service:locale');

  // Set up application language
  langHandler(appInstance, locale);

  // On changing language, change it everywhere
  locale.on('languageDidChange', this, Ember.run.bind(this, langHandler, appInstance, locale));
}

export default { name: 'locale', initialize };
