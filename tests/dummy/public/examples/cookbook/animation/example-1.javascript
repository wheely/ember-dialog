import DialogManager from "ember-dialog/services/dialog";

export default DialogManager.extend({

  fade(template, context) {
    return this.alert(template, context, { animate: "fade" }, "presenter-animated");
  },

  slide(template, context) {
    return this.alert(template, context, { animate: "fade" }, "presenter-animated");
  }

});
