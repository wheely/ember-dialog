import Ember from 'ember';
import { max } from "ember-dialog/utils/zindex";

/**
 * @module ember-dialog/components/presenter
 * @augments Ember.Component
 */
export default Ember.Component.extend({

  /**
   * Dialog service puts given `context` into this property. It is available
   * from a dialog template.
   *
   * @example
   * <caption>
   * For example you may pass a context on creation the dialog and then get it
   * from a template.
   * </caption>
   * export default Ember.Controller({
   *   show() {
   *     this.get("dialog").show("dialog/alert", "message-template", { foo: 123 });
   *   }
   * });
   *
   * @example
   * <caption>
   * Context that was passed on creation of the dialog is available in the
   * template as `contextObject`.
   * </caption>
   * <div>Foo: {{contextObject.foo}}</div>
   *
   * @type {Object}
   */
  contextObject: {},

  /**
   * @type {String}
   */
  resolve: null,

  /**
   * @type {String}
   */
  reject: null,

  /**
   * @type {Boolean}
   */
  substrate: true,

  /**
   * Name of the action that evaluated on `contextObject` when user accepting
   * dialog window.
   *
   * @type {String}
   */
  acceptHandler: "accept",

  /**
   * Name of the action that evaluated on `contextObject` when user declining
   * dialog window.
   *
   * @type {String}
   */
  declineHandler: "decline",

  /**
   * @method
   * @fires module:ember-dialog/components/presenter~accepted
   */
  accept() { this._accept(); },

  /**
   * @method
   * @protected
   */
  _accept() {

    this.resolve();

    /**
     * @event module:ember-dialog/components/presenter~accepted
     * @type {module:ember-dialog/components/presenter}
     */
    this.trigger("accepted", this);

  },

  /**
   * @method
   * @fires module:ember-dialog/components/presenter~declined
   */
  decline() { this._decline(); },

  /**
   * @method
   * @protected
   */
  _decline() {

    this.reject();

    /**
     * @event module:ember-dialog/components/presenter~declined
     * @type {module:ember-dialog/components/presenter}
     */
    this.trigger("declined", this);

  },

  /**
   * @event
   */
  didRender() {

    // Biggest z-index
    const zindex = max();

    // Component element (wrapper of dialog-element)
    let { childNodes } = this.element;

    for (let node of childNodes) {
      // Set z-index biggest then biggenest
      if (node.style) {
        node.style.zIndex = zindex + 1;
      }
    }

  }

});
