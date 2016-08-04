import Ember from "ember";

export default Ember.Route.extend({

  actions: {

    setLanguageCode(languageCode) {
      this.get('locale').setLanguageCode(languageCode);
    }

  }

});
