import { Manager } from "ember-dialog/system/manager";

/**
  Configures a registry with injections on Ember applications
  for the Ember-Data store. Accepts an optional namespace argument.
  @method initializeStoreInjections
  @param {Ember.Registry} registry
*/
export default function initializeDialogManager(registry) {
  registry.register('dialog:manager', Manager, { singleton: true });
  registry.injection('controller', 'dialogManager', 'dialog:manager');
  registry.injection('dialog:presenter', 'dialogManager', 'dialog:manager');
}
