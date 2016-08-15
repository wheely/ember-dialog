import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:dialog', 'Unit | Service | dialog', {
  // Specify the other units that are required for this test.
  needs: ['component:presenter']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`);
    assert.equal($(".dialog-layout").size(), 1);
  });
});
