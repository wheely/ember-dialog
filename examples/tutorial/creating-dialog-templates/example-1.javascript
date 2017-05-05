import DialogManager from "ember-dialog/services/dialog";

export default DialogManager.extend({

  red(template, context) {
    const options = { substrate: true };
    return this.show('red-corner-dialog', template, context, options);
  }

});
