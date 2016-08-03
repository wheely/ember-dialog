/* global Prism */

export default function() {
  if (Prism) {
    Ember.run.scheduleOnce("afterRender", Prism, () => {
      Prism.highlightAll();
      Prism.fileHighlight();
    });
  }
}
