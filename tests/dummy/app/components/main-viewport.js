import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const later = Ember.run.later;

export default Ember.Component.extend({

  layout: hbs`{{yield this}}`,

  classNameBindings: [":w-page", "sidebarOpened:w-page__nav-opened:w-page__nav-closed", "currentPath"],

  /**
    Is application's sidebar opened. Sidebar opening changed by `toggleSidebar`
    action, which can be called from the template like:

    @example
      <a href="#" {{action 'toggleSidebar'}}>Show sidebar</a>

    @property sidebarOpened
    @type Boolean
  */
  sidebarOpened: false,

 /**
   @example
     ...
     <div class="w-header_mobilenav-toddler {{if stateRotate '__w-state-rotate'}}">...</div>
     ...
   @property stateRotate
   @type Boolean
 */
 stateRotate: false,
 stateJoin: false,

 actions: {

   toggleSidebar() {

       this.toggleProperty('sidebarOpened');

       const { stateRotate, stateJoin } = this.getProperties("stateRotate", "stateJoin");

       if (stateRotate && stateJoin) {

         this.set("stateRotate", false);
         later(this, () => this.set("stateJoin", false), 200);

       } else if (!stateRotate && !stateJoin) {

         this.set("stateJoin", true);
         later(this, () => this.set("stateRotate", true), 200);

       }

     }

 }

});
