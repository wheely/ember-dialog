import Ember from 'ember';
import ContextMixin from 'ember-dialog/mixins/context';
import Configuration from 'ember-dialog/configuration';

const { guidFor } = Ember;

export default Ember.Service.extend(Ember.Evented, {

  rootElement: 'body',

  dialogs: Ember.A(),

  defaults: {
    acceptLabel: 'yes',
    declineLabel: 'no',
    acceptClass: 'btn-primary',
    declineClass: 'btn-default',
    acceptHandler: 'accept',
    declineHandler: 'decline',
    title: '',
    className: ''
  },

  init() {
    this.on("created", presenter => this.created(presenter));
    return this._super(...arguments);
  },

  remove(presenter) {
    this.set("dialogs", this.get("dialogs").filter(item => item.id !== guidFor(presenter)));
  },

  declined(presenter) {
    presenter.destroy();
    this.remove(presenter);
  },

  accepted(presenter) {
    presenter.destroy();
    this.remove(presenter);
  },

  created(presenter) {
    this.get("dialogs").push({ id: guidFor(presenter), presenter });
    presenter.one("declined", presenter => this.accepted(presenter));
    presenter.one("accepted", presenter => this.declined(presenter));
  },

  show(layoutName, templateName, context, options = {}) {

    // Getting presenter class to create its instance that we'll show.
    var Presenter = this.container.lookupFactory("component:presenter");

    Presenter = Presenter.extend(ContextMixin);

    // const registry = this.container._registry;
    // const isExists = registry.resolver("template:" + templateName);

    options = Ember.merge(this.get("defaults"), options);
    options = Ember.merge(options, { layoutName, templateName });

    // Creating instance
    const presenter = Presenter.create(options);
    presenter.context.set("contextObject", context || Ember.Object.create());

    // Show it to user
    Ember.run(() => presenter.appendTo(this.get("rootElement")));

    Ember.run.scheduleOnce("sync", this, () => { this.trigger("created", presenter); });

    return new Ember.RSVP.Promise((resolve, reject) => {
      presenter.reopen({ resolve, reject });
    });

  },

  alert(template, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/alert", template, context, options);
  },

  confirm(template, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/confirm", template, context, options);
  },

  blank(template, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/blank", template, context, options);
  }

});
