const { $ } = Ember;

/**
 * @module ember-dialog/utils/zindex
 */

/**
 * Returns max `z-index` of the element on the page. May be used for creating
 * DOM element on top other elements.
 *
 * @example
 * import { max } from "ember-dialog/utils/zindex";
 *
 * export default Ember.Component.extend({
 *
 *   didRender() {
 *     this.$().css({'z-index': max() + 1});
 *   }
 *
 * });
 * @function
 * @return {Number}  Max `z-index` of the element on the page
 */
export function max() {
  var max = Math.max.apply(null, $.map($(':visible:not(.highest)'), function(element){
    if($(element).css('position') === 'absolute' || $(element).css('position') === 'relative'){
      return ($(element).css('z-index') >> 0) || 1;  // jshint ignore: line
    }
    return 0;
  }));
  return max;
}
