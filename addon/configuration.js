import Ember from 'ember';

const { get, set } = Ember;

export default {

  load(config) {
    let wrappedConfig = Ember.Object.create(config);
    for (let property in wrappedConfig) {
      if (wrappedConfig.hasOwnProperty(property)) {
        let value = get(wrappedConfig, property);
        if (Ember.typeOf(get(this, property)) === 'undefined') {
          set(this, property, value);
        }
      }
    }
  }

};
