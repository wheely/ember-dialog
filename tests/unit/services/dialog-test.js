import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:dialog', 'Unit | Service | dialog', {
  // Specify the other units that are required for this test.
  needs: ['component:presenter'],
  setup() {
    this.service = this.subject();
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  Ember.run(() => {
    this.service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`);
    assert.equal($(".dialog-layout").length, 1, "Opened dialog");
  });
});

test('it exists once', function(assert) {
  Ember.run(() => {
    this.service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`, {}, {id: "1"});
    this.service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`, {}, {id: "1"});
    assert.equal($(".dialog-layout").length, 1, "Dialog with id 1 opened once");
  });
});

test('it exists twice without setting id', function(assert) {
  Ember.run(() => {
    this.service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`);
    this.service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`);
    assert.equal($(".dialog-layout").length, 2, "New Dialog with no id opened twice");
  });
});

test('it exists twice with two different ids', function(assert) {
  Ember.run(() => {
    this.service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`, {}, {id: "2"});
    this.service.show(hbs`<div class="dialog-layout">layout</div>`, hbs`template`, {}, {id: "3"});
    assert.equal($(".dialog-layout").length, 2, "New Dialog with different ids (1, 2) opened twice");
  });
});

test('distory all opened dialogs', function(assert) {
  Ember.run(() => {
    this.service.destroyAllPresenter();
    assert.equal($(".dialog-layout").length, 0, "All dialogs have been destroyed");
  });
});
