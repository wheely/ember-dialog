import Ember from 'ember';
import LocaleService from '../services/locale';
import changeLocaleHandler from '../utils/change-locale';

function langHandler(container, locale) {
  var languageCode = locale.get('languageCode');
  container.lookup('service:i18n').set('locale', languageCode);
  changeLocaleHandler();
}

export function initialize(application) {
  const registry = application.registry;
  const container = application.container;
  registry.register('service:locale', LocaleService, { singleton: true });
  registry.injection('controller', 'locale', 'service:locale');
  registry.injection('route', 'locale', 'service:locale');
  registry.injection('component', 'locale', 'service:locale');
  registry.injection('model', 'locale', 'service:locale');

  // The global locale service (it's contain determined language)
  const locale = container.lookup('service:locale');

  // Set up application language
  langHandler(container, locale);

  // On changing language, change it everywhere
  locale.on('languageDidChange', this, Ember.run.bind(this, langHandler, container, locale));
}

export default { name: 'locale', initialize };
