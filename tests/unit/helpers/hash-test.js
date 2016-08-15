import HashHelper from 'ember-dialog/helpers/hash';
import { module, test } from 'qunit';

module('Unit | Helper | hash');

test('it works', function(assert) {
  const hash = { foo: "bar" };
  const result = HashHelper.compute(null, hash);
  assert.equal(result.foo, "bar");
});
