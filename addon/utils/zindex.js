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
  let elements = document.querySelectorAll(':not(.highest)');

  return [...elements].reduce((max, element) => {
    let { position } = element.style;

    if (!isVisible(element) || position !== 'absolute' || position !== 'relative') {
      return max;
    }

    let zIndex = element.style.zIndex >> 0 || 1;

    return (zIndex > max) ? zIndex : max;
  }, 1);
}

// https://github.com/jquery/jquery/blob/e743cbd28553267f955f71ea7248377915613fd9/src/css/hiddenVisibleSelectors.js#L11-L13
function isVisible(elem) {
  return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
}
