'use strict';

define('dummy/tests/app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('dummy/tests/components/main-viewport.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | components/main-viewport.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/main-viewport.js should pass jshint.');
  });
});
define('dummy/tests/components/presenter-animate-css.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | components/presenter-animate-css.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/presenter-animate-css.js should pass jshint.');
  });
});
define('dummy/tests/components/presenter-animated.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | components/presenter-animated.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/presenter-animated.js should pass jshint.');
  });
});
define('dummy/tests/controllers/application.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('dummy/tests/controllers/cookbook/animation.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/cookbook/animation.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/cookbook/animation.js should pass jshint.');
  });
});
define('dummy/tests/controllers/cookbook/creating-notices.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/cookbook/creating-notices.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/cookbook/creating-notices.js should pass jshint.');
  });
});
define('dummy/tests/controllers/cookbook/showing-server-errors.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/cookbook/showing-server-errors.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/cookbook/showing-server-errors.js should pass jshint.');
  });
});
define('dummy/tests/controllers/getting-started.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/getting-started.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/getting-started.js should pass jshint.');
  });
});
define('dummy/tests/controllers/index.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass jshint.');
  });
});
define('dummy/tests/controllers/tutorial/creating-dialog-templates.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/tutorial/creating-dialog-templates.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/tutorial/creating-dialog-templates.js should pass jshint.');
  });
});
define('dummy/tests/controllers/tutorial/creating.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/tutorial/creating.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/tutorial/creating.js should pass jshint.');
  });
});
define('dummy/tests/controllers/tutorial/interrupt-closing.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/tutorial/interrupt-closing.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/tutorial/interrupt-closing.js should pass jshint.');
  });
});
define('dummy/tests/controllers/tutorial/presenter-and-manager.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/tutorial/presenter-and-manager.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/tutorial/presenter-and-manager.js should pass jshint.');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    _ember.default.run(application, 'destroy');
  }
});
define('dummy/tests/helpers/destroy-app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('dummy/tests/helpers/ember-i18n/test-helpers', ['ember'], function (_ember) {
  'use strict';

  // example usage: find(`.header:contains(${t('welcome_message')})`)
  _ember.default.Test.registerHelper('t', function (app, key, interpolations) {
    var i18n = app.__container__.lookup('service:i18n');
    return i18n.t(key, interpolations);
  });

  // example usage: expectTranslation('.header', 'welcome_message');
  _ember.default.Test.registerHelper('expectTranslation', function (app, element, key, interpolations) {
    var text = app.testHelpers.t(key, interpolations);

    assertTranslation(element, key, text);
  });

  var assertTranslation = function () {
    if (typeof QUnit !== 'undefined' && typeof QUnit.assert.ok === 'function') {
      return function (element, key, text) {
        QUnit.assert.ok(find(element + ':contains(' + text + ')').length, 'Found translation key ' + key + ' in ' + element);
      };
    } else if (typeof expect === 'function') {
      return function (element, key, text) {
        var found = !!find(element + ':contains(' + text + ')').length;
        expect(found).to.equal(true);
      };
    } else {
      return function () {
        throw new Error("ember-i18n could not find a compatible test framework");
      };
    }
  }();
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        (0, _destroyApp.default)(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('dummy/tests/helpers/module-for-acceptance.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('dummy/tests/helpers/resolver', ['exports', 'ember-resolver', 'dummy/config/environment'], function (exports, _emberResolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _emberResolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/resolver.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var application = void 0;

    var attributes = _ember.default.merge({}, _environment.default.APP);
    attributes = _ember.default.merge(attributes, attrs); // use defaults, but you can override;

    _ember.default.run(function () {
      application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('dummy/tests/helpers/start-app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('dummy/tests/instance-initializers/locale.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | instance-initializers/locale.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/locale.js should pass jshint.');
  });
});
define('dummy/tests/locales/en/translations.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | locales/en/translations.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/en/translations.js should pass jshint.');
  });
});
define('dummy/tests/locales/ru/translations.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | locales/ru/translations.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/ru/translations.js should pass jshint.');
  });
});
define('dummy/tests/resolver.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('dummy/tests/router.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('dummy/tests/routes/application.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('dummy/tests/routes/cookbook/index.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/cookbook/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/cookbook/index.js should pass jshint.');
  });
});
define('dummy/tests/routes/getting-started.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/getting-started.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/getting-started.js should pass jshint.');
  });
});
define('dummy/tests/routes/tutorial.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/tutorial.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/tutorial.js should pass jshint.');
  });
});
define('dummy/tests/routes/tutorial/index.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/tutorial/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/tutorial/index.js should pass jshint.');
  });
});
define('dummy/tests/services/locale.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | services/locale.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/locale.js should pass jshint.');
  });
});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit'], function (_resolver, _emberQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
});
define('dummy/tests/test-helper.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('dummy/tests/unit/configuration-test', ['ember', 'ember-dialog/configuration', 'qunit'], function (_ember, _configuration, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | configuration');

  (0, _qunit.test)('it works', function (assert) {
    _configuration.default.internal = "some";
    _configuration.default.load({ foo: "bar" });
    assert.equal(_ember.default.get(_configuration.default, "foo"), "bar");
    assert.equal(_ember.default.get(_configuration.default, "internal"), "some");
  });
});
define('dummy/tests/unit/configuration-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/configuration-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/configuration-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/helpers/hash-test', ['ember-dialog/helpers/hash', 'qunit'], function (_hash, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | hash');

  (0, _qunit.test)('it works', function (assert) {
    var hash = { foo: "bar" };
    var result = _hash.default.compute(null, hash);
    assert.equal(result.foo, "bar");
  });
});
define('dummy/tests/unit/helpers/hash-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/helpers/hash-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/hash-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/mixins/context-test', ['ember', 'ember-dialog/mixins/context', 'qunit'], function (_ember, _context, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | context');

  (0, _qunit.test)('it works', function (assert) {
    var ContextObject = _ember.default.Object.extend(_context.default);
    var subject = ContextObject.create({
      acceptHandler: "accept",
      declineHandler: "decline",
      contextObject: {
        actions: {
          accept: function accept() {
            assert.ok(true);
          },
          decline: function decline() {
            assert.ok(true);
          }
        }
      }
    });
    subject.actions.accept.apply(subject);
    subject.actions.decline.apply(subject);
  });

  (0, _qunit.test)('makeArgsArray works', function (assert) {
    assert.equal((0, _context.makeArgsArray)(arguments, {}).length, 2);
  });

  (0, _qunit.test)('execAction works with self function', function (assert) {
    var context = {
      acceptHandler: "accept",
      accept: function accept() {
        assert.ok(true);
      },
      contextObject: {}
    };
    _context.execAction.call(context, 'accept', arguments);
  });

  (0, _qunit.test)('execAction works with action function', function (assert) {
    var context = {
      acceptHandler: "accept",
      contextObject: {
        actions: {
          accept: function accept() {
            assert.ok(true);
          }
        }
      }
    };
    _context.execAction.call(context, 'accept', arguments);
  });
});
define('dummy/tests/unit/mixins/context-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/mixins/context-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/context-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/services/dialog-test', ['ember', 'ember-qunit'], function (_ember, _emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:dialog', 'Unit | Service | dialog', {
    // Specify the other units that are required for this test.
    needs: ['component:presenter'],
    setup: function setup() {
      this.service = this.subject();
    },
    teardown: function teardown() {
      this.service.destroyAllPresenter();
    }
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var _this = this;

    _ember.default.run(function () {
      _this.service.show(_ember.default.HTMLBars.template({
        "id": "PpaKcPyw",
        "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dialog-layout\"],[13],[0,\"layout\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), _ember.default.HTMLBars.template({
        "id": "euNzviIx",
        "block": "{\"statements\":[[0,\"template\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      assert.equal($(".dialog-layout").length, 1, "Opened dialog");
    });
  });

  (0, _emberQunit.test)('it exists once', function (assert) {
    var _this2 = this;

    _ember.default.run(function () {
      _this2.service.show(_ember.default.HTMLBars.template({
        "id": "PpaKcPyw",
        "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dialog-layout\"],[13],[0,\"layout\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), _ember.default.HTMLBars.template({
        "id": "euNzviIx",
        "block": "{\"statements\":[[0,\"template\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), {}, { id: "1" });
      _this2.service.show(_ember.default.HTMLBars.template({
        "id": "PpaKcPyw",
        "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dialog-layout\"],[13],[0,\"layout\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), _ember.default.HTMLBars.template({
        "id": "euNzviIx",
        "block": "{\"statements\":[[0,\"template\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), {}, { id: "1" });
      assert.equal($(".dialog-layout").length, 1, "Dialog with id 1 opened once");
    });
  });

  (0, _emberQunit.test)('it exists twice without setting id', function (assert) {
    var _this3 = this;

    _ember.default.run(function () {
      _this3.service.show(_ember.default.HTMLBars.template({
        "id": "PpaKcPyw",
        "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dialog-layout\"],[13],[0,\"layout\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), _ember.default.HTMLBars.template({
        "id": "euNzviIx",
        "block": "{\"statements\":[[0,\"template\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      _this3.service.show(_ember.default.HTMLBars.template({
        "id": "PpaKcPyw",
        "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dialog-layout\"],[13],[0,\"layout\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), _ember.default.HTMLBars.template({
        "id": "euNzviIx",
        "block": "{\"statements\":[[0,\"template\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      assert.equal($(".dialog-layout").length, 2, "New Dialog with no id opened twice");
    });
  });

  (0, _emberQunit.test)('it exists twice with two different ids', function (assert) {
    var _this4 = this;

    _ember.default.run(function () {
      _this4.service.show(_ember.default.HTMLBars.template({
        "id": "PpaKcPyw",
        "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dialog-layout\"],[13],[0,\"layout\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), _ember.default.HTMLBars.template({
        "id": "euNzviIx",
        "block": "{\"statements\":[[0,\"template\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), {}, { id: "2" });
      _this4.service.show(_ember.default.HTMLBars.template({
        "id": "PpaKcPyw",
        "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dialog-layout\"],[13],[0,\"layout\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), _ember.default.HTMLBars.template({
        "id": "euNzviIx",
        "block": "{\"statements\":[[0,\"template\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }), {}, { id: "3" });
      assert.equal($(".dialog-layout").length, 2, "New Dialog with different ids (1, 2) opened twice");
    });
  });

  (0, _emberQunit.test)('distory all opened dialogs', function (assert) {
    var _this5 = this;

    _ember.default.run(function () {
      _this5.service.destroyAllPresenter();
      assert.equal($(".dialog-layout").length, 0, "All dialogs have been destroyed");
    });
  });
});
define('dummy/tests/unit/services/dialog-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/services/dialog-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/dialog-test.js should pass jshint.');
  });
});
define('dummy/tests/unit/utils/zindex-test', ['ember-dialog/utils/zindex', 'qunit'], function (_zindex, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | zindex');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _zindex.max)();
    assert.ok(result);
  });
});
define('dummy/tests/unit/utils/zindex-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/utils/zindex-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/zindex-test.js should pass jshint.');
  });
});
define('dummy/tests/utils/change-locale.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | utils/change-locale.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'utils/change-locale.js should pass jshint.');
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
