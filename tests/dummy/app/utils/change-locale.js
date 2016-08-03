/* global Prism */
import Ember from "ember";

export default function() {
  if (Prism) {
    Ember.run.scheduleOnce("afterRender", Prism, () => {
      Prism.highlightAll();
      Prism.fileHighlight();
    });
  }
}
