import Ember from 'ember';
import ContextMixin from 'ember-dialog/mixins/context';
import Configuration from 'ember-dialog/configuration';

const { guidFor } = Ember;

/**
 * The built in string object.
 * @external Ember.RSVP.Promise
 * @see {@link http://emberjs.com/api/classes/RSVP.Promise.html}
 */

/**
 * @module ember-dialog/services/dialog
 * @augments Ember.Service
 * @uses module:ember-dialog/mixins/context
 */
export default Ember.Service.extend(Ember.Evented, {

  /**
   * The DOM selector that used to append dialogs to.
   * @type {String}
   */
  rootElement: 'body',

  /**
   * @type {Array}
   */
  dialogs: Ember.A(),

  /**
   * @type {Object}
   */
  defaults: {
    acceptHandler: 'accept',
    declineHandler: 'decline',
    title: '',
    className: ''
  },

  /**
   * @method
   */
  init() {
    this.on("created", presenter => this.created(presenter));
    return this._super(...arguments);
  },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   */
  remove(presenter) {
    this.set("dialogs", this.get("dialogs").filter(item => item.id !== guidFor(presenter)));
  },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   */
  declined(presenter) {
    presenter.destroy();
    this.remove(presenter);
  },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   */
  accepted(presenter) {
    presenter.destroy();
    this.remove(presenter);
  },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   */
  created(presenter) {
    this.get("dialogs").push({ id: guidFor(presenter), presenter });
    presenter.one("declined", presenter => this.accepted(presenter));
    presenter.one("accepted", presenter => this.declined(presenter));
  },

  /**
   * @method
   * @param {String} layoutName
   * @param {String} templateName
   * @param {Object} context
   * @param {Object} options
   * @return {external:Promise}
   */
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

    /**
     * Presenter created
     * @event module:ember-dialog/services/dialog~created
     * @type {module:ember-dialog/components/presenter}
     */
    Ember.run.scheduleOnce("sync", this, () => { this.trigger("created", presenter); });

    return new Ember.RSVP.Promise((resolve, reject) => {
      presenter.reopen({ resolve, reject });
    });

  },

  /**
   * @method
   * @param {String} templateName
   * @param {Object} context
   * @param {Object} options
   * @return {external:Promise}
   */
  alert(templateName, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/alert", templateName, context, options);
  },

  /**
   * @method
   * @param {String} templateName
   * @param {Object} context
   * @param {Object} options
   * @return {external:Promise}
   */
  confirm(templateName, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/confirm", templateName, context, options);
  },

  /**
   * @method
   * @param {String} templateName
   * @param {Object} context
   * @param {Object} options
   * @return {external:Promise}
   */
  blank(templateName, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/blank", templateName, context, options);
  }

});
