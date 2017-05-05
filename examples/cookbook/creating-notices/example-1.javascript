import DialogManager from "ember-dialog/services/dialog";

export default DialogManager.extend({

  notice(template, context, options) {

    const layout = "cookbook/creating-notices/partials/notice";
    options = Ember.merge({ root: ".notices", delay: 500 }, options);

    this.one("created", presenter => {
      Ember.run.later(presenter, "accept", options.delay)
    });

    return this.show(layout, template, context, options);
  }

});
