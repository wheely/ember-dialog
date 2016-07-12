import Config from '../config/environment';
import Configuration from 'ember-dialog/configuration';
import Presenter from 'ember-dialog/dialog/presenter';

export function initialize(application) {
  application.register('dialog:presenter', Presenter, { singleton: false });
  Configuration.load(Config);
}

export default {
  name: 'ember-dialog',
  initialize
};
