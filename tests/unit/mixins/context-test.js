import Ember from 'ember';
import { default as ContextMixin, makeArgsArray, execAction } from 'ember-dialog/mixins/context';
import { module, test } from 'qunit';

module('Unit | Mixin | context');

test('it works', function(assert) {
  let ContextObject = Ember.Object.extend(ContextMixin);
  let subject = ContextObject.create({
    acceptHandler: "accept",
    declineHandler: "decline",
    contextObject: {
      _actions: {
        accept: () => {
          assert.ok(true);
        },
        decline: () => {
          assert.ok(true);
        }
      },
    }
  });
  subject.actions.accept.apply(subject);
  subject.actions.decline.apply(subject);
});

test('makeArgsArray works', function(assert) {
  assert.equal(makeArgsArray(arguments, {}).length, 2);
});

test('execAction works with self function', function(assert) {
  const context = {
    acceptHandler: "accept",
    accept: () => {
      assert.ok(true);
    },
    contextObject: {
    }
  };
  execAction.call(context, 'accept', arguments);
});

test('execAction works with action function', function(assert) {
  const context = {
    acceptHandler: "accept",
    contextObject: {
      _actions: {
        accept: () => {
          assert.ok(true);
        },
      },
    }
  };
  execAction.call(context, 'accept', arguments);
});
