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
    assert.equal($(".dialog-layout").length, 1, "Opened dialog");
  });
});

test('it exists once', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`, {}, {id: "1"});
    service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`, {}, {id: "1"});
    assert.equal($(".dialog-layout").length, 2, "Dialog with id 1 opened once");
  });
});

test('it exists twice without setting id', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`);
    service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`);
    assert.equal($(".dialog-layout").length, 4, "New Dialog with no id opened twice");
  });
});

test('it exists twice with two different ids', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`, {}, {id: "2"});
    service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`, {}, {id: "3"});
    assert.equal($(".dialog-layout").length, 6, "New Dialog with different ids (1, 2) opened twice");
  });
});

test('distory all opened dialogs', function(assert) {
  let service = this.subject();
  Ember.run(() => {
    service.destroyAllPresenter();
    assert.equal($(".dialog-layout").length, 0, "All dialogs have been destroyed");
  });
});
