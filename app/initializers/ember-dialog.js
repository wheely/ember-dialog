import Config from '../config/environment';
import Configuration from 'ember-dialog/configuration';

export function initialize(application) {
  Configuration.load(Config);
}

export default {
  name: 'ember-dialog',
  initialize
};
