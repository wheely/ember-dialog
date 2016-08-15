import Ember from 'ember';
import Configuration from 'ember-dialog/configuration';
import { module, test } from 'qunit';

module('Unit | configuration');

test('it works', function(assert) {
  Configuration.internal = "some";
  Configuration.load({ foo: "bar" });
  assert.equal(Ember.get(Configuration, "foo"), "bar");
  assert.equal(Ember.get(Configuration, "internal"), "some");
});
