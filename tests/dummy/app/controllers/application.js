import Ember from "ember";

export default Ember.Controller.extend({

  isOpened: false,

  actions: {

    toggleLanguage() {
      this.toggleProperty("isOpened");
    },

    setLanguageCode(languageCode) {
      this.get('locale').setLanguageCode(languageCode);
      this.toggleProperty("isOpened");
    },

    accept(presenter) {
      presenter.accept();
    }

  }

});
