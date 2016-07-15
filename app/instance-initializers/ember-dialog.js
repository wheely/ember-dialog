import Config from '../config/environment';
import Configuration from 'ember-dialog/configuration';

export function initialize(application) {
  const registry = application.registry;
  Configuration.load(Config);
  registry.injection('controller', 'dialog', 'service:dialog');
}

export default {
  name: 'ember-dialog',
  initialize
};
