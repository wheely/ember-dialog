import { Presenter } from 'ember-dialog/components/presenter';

export default function initializeDialogComponent(registry) {
  registry.register('dialog:presenter', Presenter);
}
