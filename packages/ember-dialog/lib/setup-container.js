import initializeDialogManager from 'ember-dialog/initializers/manager';
import initializeDialogPresenter from 'ember-dialog/initializers/presenter';

export default function setupContainer(container, application) {
  // application is not a required argument. This ensures
  // testing setups can setup a container without booting an
  // entire ember application.

  initializeDialogManager(container, application);
  initializeDialogPresenter(container, application);
}
