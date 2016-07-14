import Ember from 'ember';
import ContextMixin from 'ember-dialog/mixins/context';
import Configuration from 'ember-dialog/configuration';

const { guidFor } = Ember;

/**
 * The built in string object.
 * @external Ember/RSVP/Promise
 * @see {@link http://emberjs.com/api/classes/RSVP.Promise.html}
 */

/**
 * @module ember-dialog/services/dialog
 * @augments Ember.Service
 * @augments Ember.Evented
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
   * @protected
   */
  dialogs: Ember.A(),

  /**
   * @property {String} title       Dialog window's title
   * @property {String} className   CSS class name
   * @protected
   */
  defaults: {
    title: '',
    className: ''
  },

  init() {
    this.on("created", presenter => this.created(presenter));
    return this._super(...arguments);
  },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   */
  add(presenter) {
    this.get("dialogs").push({ id: guidFor(presenter), presenter });
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
  created(presenter) {
    this.add(presenter);
    presenter.one("declined", presenter => this.accepted(presenter));
    presenter.one("accepted", presenter => this.declined(presenter));
  },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   * @listens module:ember-dialog/components/presenter~accepted
   */
  accepted(presenter) { this.destroyPresenter(presenter); },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   * @listens module:ember-dialog/components/presenter~declined
   */
  declined(presenter) { this.destroyPresenter(presenter); },

  /**
   * @method
   * @fires module:ember-dialog/services/dialog~destroyed
   * @param {module:ember-dialog/components/presenter} presenter
   */
  destroyPresenter(presenter) {

    presenter.destroy();
    this.remove(presenter);

    /**
     * Triggered when `presenter` destroyed. You may subscribe on this event to
     * make additional operations.
     *
     * @example
     *
     * export default Ember.Component.extend({
     *
     *   dialog: Ember.inject.service(),
     *
     *   didRender() {
     *     this.get("dialog").on("created", { className } => {
     *       this.$().addClass("__freeze-content");
     *       className && this.$().addClass(className);
     *     });
     *     this.get("dialog").on("destroyed", { className } => {
     *       this.$().removeClass("__freeze-content");
     *       className && this.$().removeClass(className);
     *     });
     *   }
     *
     * });
     *
     * @event module:ember-dialog/services/dialog~destroyed
     * @type {module:ember-dialog/components/presenter}
     */
    Ember.run.scheduleOnce("destroy", this, () => { this.trigger("destroyed", presenter); });

  },

  /**
   * @example
   * <caption>
   * Simple usage - post factum handling. It's the common case when you needed
   * just get result of the dialog closing. For example show user an inform
   * message or ask him to confirm an action.
   * </caption>
   *
   * export default Ember.Controller({
   *
   *   success() {
   *     // Showing user modal with message that record was successfully deleted.
   *     // Showing template `app/templates/messages/success-deletion.hbs`.
   *     this.get("dialog").show("dialog/alert", "messages/success-deletion");
   *   },
   *
   *   deleteRecord(record) {
   *     // Showing user a dialog window to confirm act. Template to show the
   *     // user `app/templates/messages/areyousure.hbs`. The template
   *     // should have few buttons: "Ok" and "Cancel". "Ok" button evaluates
   *     // `accept` action, "Cancel" evaluates `decline` action.
   *     const promise = this.get("dialog").show("dialog/confirm", "messages/areyousure");
   *
   *     // User pressed "Ok" button - promise resolved in this case
   *     promise.then(() => { record.deleteRecord(); return record.deleteRecord(); });
   *
   *     // Record was successfully deleted
   *     promise.then(() => { this.success(); });
   *
   *     return promise;
   *   }
   *
   * });
   *
   *
   * @example <caption>Passing a context to the template that will be shown to
   * user in the dialog.</caption>
   *
   * export default Ember.Controller({
   *
   *   username: Ember.computed.alias("session.username"),
   *
   *   hello() {
   *     const username = this.get("username");
   *
   *     // Showing user simple personal greeting. The username passed in
   *     // context object. This object's put into the `contextObject`
   *     // presenter's property and become available in the template.
   *     this.get("dialog").show("dialog/alert", "messages/hello", { username });
   *   }
   *
   * });
   *
   * @example <caption>The template in this case will look like.</caption>
   *
   * Hello, {{contextObject.username}}!
   *
   *
   * @example <caption>With context you're able to pass an action names of the
   * context that will be executed at first, before executing `accept` and
   * `decline` handlers of the dialog (presenter).</caption>
   *
   * export default Ember.Controller({
   *
   *   showForm() {
   *     const options = { actionName: "save" };
   *
   *     // Passing current controller as context and the name of it's action
   *     // on `accept`.
   *     const promise = this.get("dialog").show("dialog/confirm", "messages/user-form", this, options);
   *
   *     promise.then(() => {
   *       console.log("Model saved");
   *     });
   *   },
   *
   *   actions: {
   *
   *     save(presenter) {
   *       const model = this.get("model");
   *
   *       if ( Ember.isBlank(model.get("username")) ) {
   *         this.get("dialog").show("dialog/alert", "messages/error");
   *         return;
   *       }
   *
   *       // "Manually" closing `presenter`
   *       model.save(() => presenter.accept());
   *     }
   *
   *   }
   *
   * });
   *
   * @method
   * @fires module:ember-dialog/services/dialog~created
   * @param {String} layoutName       - Path to layout that used to showing message. Predefined layouts:
   *                                    `dialog/alert`, `dialog/confirm` and `dialog/blank`. Alert
   *                                    layout has only one button and can be closed as accepted only.
   *                                    Confirm layout has two buttons and can be close as accepted or
   *                                    declined. The blank layout hasn't any buttons at all and can
   *                                    be closed as accepted or declined. In any layouts available
   *                                    actions: 'accept' and 'decline'.
   * @param {String} templateName     - Path to template that will be shown in the dialog window.
   *                                    In the template is available `presenter` object as `this`
   *                                    and context that passed on creation as `contextObject`.
   * @param {Object} [context]        - An onject available in the template as `contextObject`.
   * @param {Object} [options={}]     - An object pass to presenter on creating.
   * @return {external:Ember/RSVP/Promise}
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
     * Triggered when `presenter` instance created. May be used to control
     * presenters outside the class.
     *
     * @example
     *
     * export default Ember.Component.extend({
     *
     *   dialog: Ember.inject.service(),
     *
     *   didRender() {
     *     this.get("dialog").on("created", { className } => {
     *       this.$().addClass("__freeze-content");
     *       className && this.$().addClass(className);
     *     });
     *     this.get("dialog").on("destroyed", { className } => {
     *       this.$().removeClass("__freeze-content");
     *       className && this.$().removeClass(className);
     *     });
     *   }
     *
     * });
     *
     * @event module:ember-dialog/services/dialog~created
     * @type {module:ember-dialog/components/presenter}
     */
    Ember.run.scheduleOnce("sync", this, () => { this.trigger("created", presenter); });

    return new Ember.RSVP.Promise((resolve, reject) => {
      presenter.reopen({ resolve, reject });
    });

  },

  /**
   * @example
   * <caption>
   * It is sugar. The [show]{@link module:ember-dialog/services/dialog~show} method with predefined layout.
   * </caption>
   *
   * export default Ember.Controller({
   *
   *   expired() {
   *     try { 1/0 } catch (e) {
   *       this.get("dialog").alert("messages/fatal-error", { text: e.message });
   *     }
   *   }
   *
   * });
   *
   * @method
   * @param {String} templateName
   * @param {Object} [context]
   * @param {Object} [options]
   * @return {external:Ember/RSVP/Promise}
   */
  alert(templateName, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/alert", templateName, context, options);
  },

  /**
   * @example
   * <caption>
   * It is sugar. The [show]{@link module:ember-dialog/services/dialog~show} method with predefined layout.
   * </caption>
   *
   * export default Ember.Controller({
   *
   *   remove() {
   *     const yes = () => { console.log("yes"); },
   *           no = () => { console.log("no"); }
   *     this.get("dialog").confirm("messages/yousure").then(yes, no);
   *   }
   *
   * });
   *
   * @method
   * @param {String} templateName
   * @param {Object} [context]
   * @param {Object} [options]
   * @return {external:Ember/RSVP/Promise}
   */
  confirm(templateName, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/confirm", templateName, context, options);
  },

  /**
   * @example
   * <caption>
   * It is sugar. The [show]{@link module:ember-dialog/services/dialog~show} method with predefined layout.
   * </caption>
   *
   * export default Ember.Controller({
   *
   *   showForm() {
   *     this.get("dialog").blank("forms/edit-user", this);
   *   }
   *
   * });
   *
   * @method
   * @param {String} templateName
   * @param {Object} [context]
   * @param {Object} [options]
   * @return {external:Ember/RSVP/Promise}
   */
  blank(templateName, context, options) {
    return this.show(Configuration["ember-dialog"].layoutPath + "/blank", templateName, context, options);
  }

});
