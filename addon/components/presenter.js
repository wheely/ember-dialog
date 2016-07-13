import Ember from 'ember';
import { max } from "ember-dialog/utils/zindex";

/**
 * @module ember-dialog/components/presenter
 * @augments Ember.Component
 */
export default Ember.Component.extend({

  resolve: null,

  reject: null,

  acceptHandler: "accept",

  declineHandler: "decline",

  accept() {
    this.resolve();
    this.trigger("accepted", this);
  },

  decline() {
    this.reject();
    this.trigger("declined", this);
  },

  didRender() {

    // Biggest z-index
    const zindex = max();

    // Component element (wrapper of dialog-element)
    const dialog = this.$().children();

    // Set z-index biggest then biggenest
    dialog.css({'z-index': zindex + 1});

  }

});
