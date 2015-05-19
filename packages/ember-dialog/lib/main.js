/**
  Ember Dialog
  @module ember-dialog
  @main ember-dialog
*/
import "ember-dialog/ember-initializer";
import setupContainer from "ember-dialog/setup-container";

import Dialog from "ember-dialog/core";

import { Manager } from "ember-dialog/system/manager";
import { Presenter } from "ember-dialog/components/presenter";

Dialog.Manager = Manager;
Dialog.Presenter = Presenter;

Dialog._setupContainer = setupContainer;

Ember.lookup.Dialog = Dialog;

export default Dialog;
