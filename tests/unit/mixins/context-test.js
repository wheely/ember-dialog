import Ember from 'ember';
import ContextMixin from '../../../mixins/context';
import { module, test } from 'qunit';

module('Unit | Mixin | context');

// Replace this with your real tests.
test('it works', function(assert) {
  let ContextObject = Ember.Object.extend(ContextMixin);
  let subject = ContextObject.create();
  assert.ok(subject);
});
