import Ember from 'ember';
import ContextMixin from 'ember-dialog/mixins/context';
import Configuration from 'ember-dialog/configuration';

const { guidFor, getOwner} = Ember;

const DEFAULT_COMPONENT_NAME = "presenter";

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
   * @property {String} className   CSS class name
   * @protected
   */
  defaults: {
    className: ''
  },

  init() {
    this.on("created", presenter => this.created(presenter));
    this.on("destroyed", presenter => this.destroyed(presenter));
    return this._super(...arguments);
  },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   */
  add(presenter) {
    var id = presenter.get("presenterId") || guidFor(presenter);
    this.set("dialogs", Ember.A(this.get("dialogs").filter(item => item.id !== id)));
    this.get("dialogs").pushObject({ id: id, presenter: presenter });
  },

  /**
   * @method
   * @param {module:ember-dialog/components/presenter} presenter
   */
  remove(presenter) {
    if (this.get('isDestroyed')) return;
    var id = presenter.get("presenterId") || guidFor(presenter);
    var dialogs = this.get("dialogs").filter((item) => {
      return item.id !== id;
    });
    this.set("dialogs", Ember.A(dialogs));
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
   */
  destroyed(presenter) {
    this.remove(presenter);
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
   * @fires module:ember-dialog/services/dialog~destroyAllPresenter
   */
  destroyAllPresenter(){
    this.get("dialogs").forEach(dialog => this.destroyPresenter(dialog.presenter));
  },
  /**
   * @method
   * @fires module:ember-dialog/services/dialog~destroyed
   * @param {module:ember-dialog/components/presenter} presenter
   */
  destroyPresenter(presenter) {

    presenter.destroy();
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
   * @param {String|HTMLBarTemplate} layout    - Path to layout that used to showing message. Predefined layouts:
   *                                             `dialog/alert`, `dialog/confirm` and `dialog/blank`. Alert
   *                                             layout has only one button and can be closed as accepted only.
   *                                             Confirm layout has two buttons and can be close as accepted or
   *                                             declined. The blank layout hasn't any buttons at all and can
   *                                             be closed as accepted or declined. In any layouts available
   *                                             actions: 'accept' and 'decline'.
   * @param {String|HTMLBarTemplate} template  - Path to template that will be shown in the dialog window.
   *                                             In the template is available `presenter` object as `this`
   *                                             and context that passed on creation as `contextObject`.
   * @param {Object} [context]                 - An onject available in the template as `contextObject`.
   * @param {Object} [options={}]              - An object pass to presenter on creating.
   * @param {String} [componentName="presenter"]  - The dialog component name
   * @return {external:Ember/RSVP/Promise}
   */
  show(layout, template, context, options = {}, componentName = DEFAULT_COMPONENT_NAME) {

    /* Generate presenterId from (layoutName + templateName) or provided id
       to make sure the dialog won't open multiple times */
    var presenterId = options.id || "";
    if(typeof layout === "string" && typeof template === "string"){
      presenterId = layout + "/" + template;
    }

    delete options.id;
    //check if dialog is already opened
    var presenterItem = this.get("dialogs").findBy("id", presenterId);
    if(presenterItem && presenterItem.presenter){
      return new Ember.RSVP.Promise((resolve, reject) => {
        presenterItem.presenter.reopen({ resolve, reject });
      }, "Dialog #" + presenterId + " promise");
    }

    // Getting presenter instance.
    var presenter = getOwner(this).lookup(["component", componentName].join(":"));
    Ember.assert("You have passed `componentName` argument, but component by this name doesn't exist.", presenter);

    presenter = presenter.reopen(ContextMixin);
    presenter = presenter.reopen({presenterId: presenterId, target: context});
    options = Ember.merge(Ember.copy(this.get("defaults")), options);
    if (Ember.typeOf(layout) === "object") {
      options = Ember.merge(options, { layout: layout });
    } else {
      options = Ember.merge(options, { layout: getOwner(this).lookup(["template", layout].join(":")) });
    }

    if (Ember.typeOf(template) === "object") {
      // The template will be included into the presenter's body as
      // dialog-body component
      options = Ember.merge(options, { template: template });
    } else {
      // The template will be included into the presenter's body as partial
      options = Ember.merge(options, { templateName: template });
    }

    presenter = presenter.reopen(options);
    presenter.set("contextObject", context || Ember.Object.create());

    presenterId = presenterId || guidFor(presenterId);
    this.get("dialogs").pushObject({ id: presenterId, presenter: presenter });
    // Show it to user
    Ember.run(() => presenter.appendTo(options.root || this.get("rootElement")));

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
    Ember.run.next(this, () => { this.trigger("created", presenter); });

    return new Ember.RSVP.Promise((resolve, reject) => {
      presenter.reopen({ resolve, reject });
    }, "Dialog #" + presenterId + " promise");

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
   * @param {String} template
   * @param {Object} [context]
   * @param {Object} [options]
   * @param {String} [componentName="presenter"]  - The dialog component name
   * @return {external:Ember/RSVP/Promise}
   */
  alert(template, context, options, componentName = DEFAULT_COMPONENT_NAME) {
    var scope = this;
    if (!this.show) { scope = this.get("dialog"); }
    const layout = Configuration["ember-dialog"].layoutPath + "/alert";
    return scope.show(layout, template, context, options, componentName);
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
   * @param {String} template
   * @param {Object} [context]
   * @param {Object} [options]
   * @param {String} [componentName="presenter"]  - The dialog component name
   * @return {external:Ember/RSVP/Promise}
   */
  confirm(template, context, options, componentName = DEFAULT_COMPONENT_NAME) {
    const layout = Configuration["ember-dialog"].layoutPath + "/confirm";
    return this.show(layout, template, context, options, componentName);
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
   * @param {String} template
   * @param {Object} [context]
   * @param {Object} [options]
   * @param {String} [componentName="presenter"]  - The dialog component name
   * @return {external:Ember/RSVP/Promise}
   */
  blank(template, context, options, componentName = DEFAULT_COMPONENT_NAME) {
    const layout = Configuration["ember-dialog"].layoutPath + "/blank";
    return this.show(layout, template, context, options, componentName);
  }

});
