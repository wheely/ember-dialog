import DialogManager from 'ember-dialog/services/dialog-manager';
import DialogComponent from 'ember-dialog/components/dialog';

var initialize = function(container, application) {
    application.register('component:dialog', DialogComponent);
    application.register('dialog:manager', DialogManager, {singleton: true});
    application.inject('controller', 'dialogManager', 'dialog:manager');
    application.inject('component:dialog', 'dialogManager', 'dialog:manager');
};

export default {
  name: 'dialog-manager',
  initialize: initialize
};
