"use strict";



define('dummy/app', ['exports', 'ember', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  _ember.default.LinkComponent.reopen({
    classNameBindings: ["isATag:w-link"],
    activeClass: "__w-state-selected",
    isATag: _ember.default.computed.equal("tagName", "a"),
    _invoke: function _invoke() {
      window.scrollTo(0, 0);
      return this._super.apply(this, arguments);
    }
  });

  App = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('dummy/components/dialog-body', ['exports', 'ember-dialog/components/dialog-body'], function (exports, _dialogBody) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dialogBody.default;
    }
  });
});
define('dummy/components/main-viewport', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var later = _ember.default.run.later;

  exports.default = _ember.default.Component.extend({

    layout: _ember.default.HTMLBars.template({
      "id": "Pn2rxizL",
      "block": "{\"statements\":[[18,\"default\",[[28,[null]]]]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}",
      "meta": {}
    }),

    classNameBindings: [":w-page", "sidebarOpened:w-page__nav-opened:w-page__nav-closed", "currentPath"],

    /**
      Is application's sidebar opened. Sidebar opening changed by `toggleSidebar`
      action, which can be called from the template like:
       @example
        <a href="#" {{action 'toggleSidebar'}}>Show sidebar</a>
       @property sidebarOpened
      @type Boolean
    */
    sidebarOpened: false,

    /**
      @example
        ...
        <div class="w-header_mobilenav-toddler {{if stateRotate '__w-state-rotate'}}">...</div>
        ...
      @property stateRotate
      @type Boolean
    */
    stateRotate: false,
    stateJoin: false,

    actions: {
      toggleSidebar: function toggleSidebar() {
        var _this = this;

        this.toggleProperty('sidebarOpened');

        var _getProperties = this.getProperties("stateRotate", "stateJoin"),
            stateRotate = _getProperties.stateRotate,
            stateJoin = _getProperties.stateJoin;

        if (stateRotate && stateJoin) {

          this.set("stateRotate", false);
          later(this, function () {
            return _this.set("stateJoin", false);
          }, 200);
        } else if (!stateRotate && !stateJoin) {

          this.set("stateJoin", true);
          later(this, function () {
            return _this.set("stateRotate", true);
          }, 200);
        }
      }
    }

  });
});
define('dummy/components/presenter-animate-css', ['exports', 'ember', 'ember-dialog/components/presenter'], function (exports, _ember, _presenter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _presenter.default.extend({

    animationToShow: "animation__fadeIn",
    animationToHide: "animation__fadeIn",

    delay: 500,

    accept: function accept() {
      this.$(".dialog-content").addClass(this.get("animationToHide"));
      _ember.default.run.later(this, "_accept", this.get("delay"));
    },
    decline: function decline() {
      this.$(".dialog-content").addClass(this.get("animationToHide"));
      _ember.default.run.later(this, "_decline", this.get("delay"));
    },
    didRender: function didRender() {
      this.$(".dialog-content").addClass("animated");
      return this._super.apply(this, arguments);
    },
    didInsertElement: function didInsertElement() {
      var _this = this;

      _ember.default.run.scheduleOnce("afterRender", this, function () {
        _this.$(".dialog-content").addClass(_this.get("animationToShow"));
      });
      return this._super.apply(this, arguments);
    }
  });
});
define('dummy/components/presenter-animated', ['exports', 'ember', 'ember-dialog/components/presenter'], function (exports, _ember, _presenter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _presenter.default.extend({

    animation: "animation__fadeIn",

    delay: 500,

    accept: function accept() {
      this.$(".ember-dialog-dialog").removeClass(this.get("animation"));
      _ember.default.run.later(this, "_accept", this.get("delay"));
    },
    decline: function decline() {
      this.$(".ember-dialog-dialog").removeClass(this.get("animation"));
      _ember.default.run.later(this, "_decline", this.get("delay"));
    },
    didRender: function didRender() {
      this.$(".ember-dialog-dialog").addClass("animation");
      return this._super.apply(this, arguments);
    },
    didInsertElement: function didInsertElement() {
      var _this = this;

      _ember.default.run.scheduleOnce("afterRender", this, function () {
        _this.$(".ember-dialog-dialog").addClass(_this.get("animation"));
      });
      return this._super.apply(this, arguments);
    }
  });
});
define('dummy/components/presenter', ['exports', 'ember-dialog/components/presenter'], function (exports, _presenter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _presenter.default;
    }
  });
});
define("dummy/controllers/application", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    isOpened: false,

    actions: {
      toggleLanguage: function toggleLanguage() {
        this.toggleProperty("isOpened");
      },
      setLanguageCode: function setLanguageCode(languageCode) {
        this.get('locale').setLanguageCode(languageCode);
        this.toggleProperty("isOpened");
      },
      accept: function accept(presenter) {
        presenter.accept();
      }
    }

  });
});
define("dummy/controllers/cookbook/animation", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    actions: {
      showDialog: function showDialog() {
        this.get("dialog").alert(_ember.default.HTMLBars.template({
          "id": "0BWVYSIN",
          "block": "{\"statements\":[[0,\"Dialog's body\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }), this);
      },
      showAnimatedDialog: function showAnimatedDialog() {
        this.get("dialog").alert(_ember.default.HTMLBars.template({
          "id": "0BWVYSIN",
          "block": "{\"statements\":[[0,\"Dialog's body\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }), this, undefined, "presenter-animated");
      },
      showAnimation: function showAnimation(animationToShow, animationToHide) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

        this.get("dialog").alert(_ember.default.HTMLBars.template({
          "id": "0BWVYSIN",
          "block": "{\"statements\":[[0,\"Dialog's body\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }), this, { animationToShow: animationToShow, animationToHide: animationToHide, delay: delay }, "presenter-animate-css");
      }
    }

  });
});
define("dummy/controllers/cookbook/creating-notices", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    actions: {
      showAutoHideDialog: function showAutoHideDialog() {
        this.get("dialog").one("created", function (presenter) {
          _ember.default.run.later(presenter, "accept", 500);
        });
        this.get("dialog").alert(_ember.default.HTMLBars.template({
          "id": "0BWVYSIN",
          "block": "{\"statements\":[[0,\"Dialog's body\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }));
      },
      showNotice: function showNotice() {
        this.get("dialog").one("created", function (presenter) {
          _ember.default.run.later(presenter, "accept", 500);
        });
        this.get("dialog").show("cookbook/creating-notices/partials/notice", _ember.default.HTMLBars.template({
          "id": "0BWVYSIN",
          "block": "{\"statements\":[[0,\"Dialog's body\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }), null, { root: ".notices" });
      }
    }

  });
});
define("dummy/controllers/cookbook/showing-server-errors", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    startTimer: _ember.default.on("init", function () {
      // this.get("dialog").alert(hbs`Your token is expired. You will be transitioned to the login page.`, this);
    }),

    actions: {
      show401Error: function show401Error() {
        this.get("dialog").alert(_ember.default.HTMLBars.template({
          "id": "pd1ksuMp",
          "block": "{\"statements\":[[0,\"Your token is expired. You will be transitioned to the login page.\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }), this);
      },
      showTopError: function showTopError() {
        this.get("dialog").one("created", function (dialog) {
          return _ember.default.run.later(dialog, "accept", 2000);
        });
        this.get("dialog").show('cookbook/showing-server-errors/partials/top-error', 'cookbook/showing-server-errors/partials/plain', null, { title: "Internal Server Error", text: "Server is unavailable" });
      }
    }

  });
});
define("dummy/controllers/getting-started", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    actions: {
      showAlert: function showAlert() {
        this.get("dialog").alert("test-message", this, {
          title: "Alert"
        });
      },
      showConfirm: function showConfirm() {
        this.get("dialog").confirm("test-message", this, {
          title: "Are you sure?"
        });
      },
      showBlank: function showBlank() {
        this.get("dialog").blank("test-message", this);
      }
    }

  });
});
define("dummy/controllers/index", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    actions: {
      showAlert: function showAlert() {
        var promise = this.get("dialog").alert("test-message", this, { title: "Reporting a problem" });
        promise.then(function () {
          return console.log("ACCEPT");
        }, function () {
          return console.log("DECLINE");
        });
      },
      showConfirm: function showConfirm() {
        var promise = this.get("dialog").confirm("test-message", this, { title: "Reporting a problem" });
        promise.then(function () {
          return console.log("ACCEPT");
        }, function () {
          return console.log("DECLINE");
        });
      },
      showBlank: function showBlank() {
        var promise = this.get("dialog").blank("test-message", this, { title: "Reporting a problem" });
        promise.then(function () {
          return console.log("ACCEPT");
        }, function () {
          return console.log("DECLINE");
        });
      },
      accept: function accept(presenter) {
        presenter.accept();
      }
    }

  });
});
define("dummy/controllers/tutorial/creating-dialog-templates", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({
    actions: {
      showDialog: function showDialog() {
        this.get("dialog").show("tutorial/creating-dialog-templates/partials/template-1", _ember.default.HTMLBars.template({
          "id": "cKBdQ7J9",
          "block": "{\"statements\":[[0,\"An template content\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }));
      }
    }
  });
});
define("dummy/controllers/tutorial/creating", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    username: "Vladimir Milkov",

    count: 0,

    actions: {
      simpleAlert: function simpleAlert() {
        alert("Hello, " + this.get("username"));
      },
      dialogAlert: function dialogAlert() {
        this.get("dialog").alert(_ember.default.HTMLBars.template({
          "id": "iY9JlDMU",
          "block": "{\"statements\":[[0,\"Hello, \"],[1,[28,[\"contextObject\",\"username\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }), this);
      },
      confirmDeletion: function confirmDeletion() {
        var promise = this.get("dialog").confirm(_ember.default.HTMLBars.template({
          "id": "ViQ8N9fK",
          "block": "{\"statements\":[[0,\"Are you sure?\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }));
        promise.then(function () {
          alert("Remove");
        });
        promise.catch(function () {
          alert("Cancel");
        });
      },
      showDialog: function showDialog() {
        var template = _ember.default.HTMLBars.template({
          "id": "4ca9wtlT",
          "block": "{\"statements\":[[0,\"Dialog will be closed after 10 trying (you tried \"],[1,[28,[\"contextObject\",\"count\"]],false],[0,\")\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        });
        var promise = this.get("dialog").confirm(template, this, { acceptHandler: "acceptAfter" });
        promise.then(function () {
          alert("10 reached!");
        });
      },
      acceptAfter: function acceptAfter(presenter) {
        this.incrementProperty("count");
        if (this.get("count") >= 10) {
          presenter.accept();
        }
      }
    }

  });
});
define("dummy/controllers/tutorial/interrupt-closing", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    count: 0,

    actions: {
      showDialog: function showDialog() {
        this.set("count", 0);
        var promise = this.get("dialog").confirm(_ember.default.HTMLBars.template({
          "id": "oIChWy3V",
          "block": "{\"statements\":[[0,\"You pressed 3/\"],[1,[28,[\"contextObject\",\"count\"]],false],[0,\" times\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }), this, {

          // This action of this controller will be executed when user press `yes` button.
          acceptHandler: "acceptClicked",

          // This action of this controller will be executed when user press `no` button.
          declineHandler: "declineClicked"

        });

        promise.then(function () {
          // Executed when dialog window closes by `yes` button
        });
      },
      acceptClicked: function acceptClicked(presenter) {
        // Closing dialog window
        this.get("count") >= 2 && presenter.accept(); // jshint ignore: line
        this.incrementProperty("count");
      },
      declineClicked: function declineClicked() {
        this.get("dialog").alert(_ember.default.HTMLBars.template({
          "id": "kbLLZNSg",
          "block": "{\"statements\":[[0,\"You can't decline this modal window. Please, press yes button.\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }));
      }
    }

  });
});
define("dummy/controllers/tutorial/presenter-and-manager", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Controller.extend({

    seconds: 0,

    username: "Vladimir Milkov",

    startTimer: _ember.default.on("init", function () {
      var _this = this;

      setInterval(function () {
        _this.incrementProperty("seconds");
      }, 1000);
    }),

    actions: {
      showGreeting: function showGreeting() {
        this.get("dialog").show("examples/dialog/information", "examples/messages/greeting", this);
      },
      showNickname: function showNickname() {
        this.set("username", "ajile");
      },
      showPartial1: function showPartial1() {
        this.get("dialog").alert("tutorial/presenter-and-manager/partials/partial-1", this);
      }
    }

  });
});
define('dummy/helpers/app-version', ['exports', 'ember', 'dummy/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = _ember.default.Helper.helper(appVersion);
});
define('dummy/helpers/hash', ['exports', 'ember-dialog/helpers/hash'], function (exports, _hash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hash.default;
    }
  });
});
define('dummy/helpers/t', ['exports', 'ember-i18n/helper'], function (exports, _helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _helper.default;
    }
  });
});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/ember-i18n', ['exports', 'ember-i18n/initializers/ember-i18n'], function (exports, _emberI18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberI18n.default;
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/instance-initializers/ember-dialog', ['exports', 'dummy/config/environment', 'ember-dialog/configuration'], function (exports, _environment, _configuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {
    _configuration.default.load(_environment.default);
    application.inject('controller', 'dialog', 'service:dialog');
  }

  exports.default = {
    name: 'ember-dialog',
    initialize: initialize
  };
});
define('dummy/instance-initializers/ember-i18n', ['exports', 'ember-i18n/instance-initializers/ember-i18n'], function (exports, _emberI18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberI18n.default;
});
define('dummy/instance-initializers/locale', ['exports', 'ember', 'dummy/services/locale', 'dummy/utils/change-locale'], function (exports, _ember, _locale, _changeLocale) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;


  function langHandler(appInstance, locale) {
    var languageCode = locale.get('languageCode');
    appInstance.lookup('service:i18n').set('locale', languageCode);
    (0, _changeLocale.default)();
  }

  function initialize(appInstance) {
    var application = appInstance.application;

    application.register('service:locale', _locale.default, { singleton: true });
    application.inject('controller', 'locale', 'service:locale');
    application.inject('route', 'locale', 'service:locale');
    application.inject('component', 'locale', 'service:locale');
    application.inject('model', 'locale', 'service:locale');

    // The global locale service (it's contain determined language)
    var locale = appInstance.lookup('service:locale');

    // Set up application language
    langHandler(appInstance, locale);

    // On changing language, change it everywhere
    locale.on('languageDidChange', this, _ember.default.run.bind(this, langHandler, appInstance, locale));
  }

  exports.default = { name: 'locale', initialize: initialize };
});
define("dummy/locales/en/translations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    language: {
      "ru": "Русский",
      "en": "English"
    },
    navigation: {
      getting_started: "Getting started",
      tutorial: "Tutorial",
      cookbook: "Cookbook",
      docs: "Docs"
    },
    tutorial: {
      creating_first_dialog: "Creating Your First Dialog",
      presenter_and_manager: "Presenter and Manager",
      advanced_creating_dialog: "Advanced Creating Dialog",
      interrupt_closing: "Interrupt Closing",
      listening_events: "Listening Events",
      creating_dialog_templates: "Layouts and Templates",
      customizing_dialog: "Customizing dialog"
    },
    cookbook: {
      animation: "Animation",
      how_to_make_dialog_drag_n_dropable: "How to Make Dialog Drag'n'Dropable",
      showing_server_errors: "Showing Server Errors",
      creating_notices: "Creating Notices",
      working_with_forms: "Working with forms"
    }

  };
});
define("dummy/locales/ru/translations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    language: {
      ru: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
      en: "English"
    },
    navigation: {
      getting_started: "\u0417\u043D\u0430\u043A\u043E\u043C\u0441\u0442\u0432\u043E",
      tutorial: "\u0423\u0447\u0435\u0431\u043D\u0438\u043A",
      cookbook: "Cookbook",
      docs: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F"
    },
    tutorial: {
      creating_first_dialog: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u043E\u043A\u043D\u0430",
      presenter_and_manager: "Presenter \u0438 Manager",
      advanced_creating_dialog: "\u041D\u0430\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435 Dialog Manager",
      interrupt_closing: "\u041F\u0440\u0435\u0440\u044B\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F",
      listening_events: "\u0421\u043E\u0431\u044B\u0442\u0438\u044F",
      creating_dialog_templates: "\u0428\u0430\u0431\u043B\u043E\u043D\u044B",
      customizing_dialog: "\u0421\u0442\u0438\u043B\u0438 \u0438 \u043A\u0430\u0441\u0442\u043E\u043C\u0438\u0437\u0430\u0446\u0438\u044F"
    },
    cookbook: {
      animation: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438",
      how_to_make_dialog_drag_n_dropable: "\u041A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0434\u0438\u0430\u043B\u043E\u0433\u043E\u0432\u043E\u0435 \u043E\u043A\u043D\u043E \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0435\u043C\u044B\u043C",
      showing_server_errors: "\u041F\u043E\u043A\u0430\u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043D\u044B\u0445 \u043E\u0448\u0438\u0431\u043E\u043A \u0432 \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u043C \u043E\u043A\u043D\u0435",
      creating_notices: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u043E\u0442\u0438\u0441\u043E\u0432 \u0438 \u043F\u0440\u043E\u0447\u0438\u0445 \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u0448\u0435\u043A",
      working_with_forms: "\u0420\u0430\u0431\u043E\u0442\u0430 \u0441 \u0444\u043E\u0440\u043C\u0430\u043C\u0438"
    }

  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment', 'dummy/utils/change-locale'], function (exports, _ember, _environment, _changeLocale) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    didTransition: function didTransition() {
      this._super.apply(this, arguments);
      (0, _changeLocale.default)();
    }
  });

  Router.map(function () {
    this.route('getting-started', { path: '/' });
    this.route('cookbook', function () {
      this.route('animation');
      this.route('how-to-make-dialog-drag-n-dropable');
      this.route('showing-server-errors');
      this.route('creating-notices');
      this.route('working-with-forms');
    });
    this.route('tutorial', function () {
      this.route('creating');
      this.route('presenter-and-manager');
      this.route('advanced-creating-dialog');
      this.route('interrupt-closing');
      this.route('listening-events');
      this.route('creating-dialog-templates');
      this.route('customizing-dialog');
    });
  });

  exports.default = Router;
});
define("dummy/routes/application", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({

    actions: {
      setLanguageCode: function setLanguageCode(languageCode) {
        this.get('locale').setLanguageCode(languageCode);
      }
    }

  });
});
define("dummy/routes/cookbook/index", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    enter: function enter() {
      this.transitionTo("cookbook.animation");
      return this._super.apply(this, arguments);
    }
  });
});
define("dummy/routes/getting-started", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend();
});
define("dummy/routes/tutorial", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend();
});
define("dummy/routes/tutorial/index", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({
    enter: function enter() {
      this.transitionTo("tutorial.creating");
      return this._super.apply(this, arguments);
    }
  });
});
define('dummy/services/dialog', ['exports', 'ember-dialog/services/dialog'], function (exports, _dialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
});
define('dummy/services/i18n', ['exports', 'ember-i18n/services/i18n'], function (exports, _i18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _i18n.default;
    }
  });
});
define('dummy/services/locale', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DETERMINED_LANGUAGE = exports.DEFAULT_LANGUAGE = exports.storage = undefined;


  /**
    The localStorage.
    @external localStorage
    @see {@link https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage|LocalStorage}
  */

  /**
    @module service/locale
  */

  /**
    Anyone a storage object. May be the sessionStorage if you like so.
    @member storage
    @type {external:localStorage}
  */
  /* global localStorage */

  var storage = exports.storage = localStorage;

  /**
    The language code, dictionary of which is exist any way. If the `languageCode`
    doesn't exists in the {@link module:locale~storage|LocalStorage}, its will be created with this value.
    @member DEFAULT_LANGUAGE
    @type {String}
  */
  var DEFAULT_LANGUAGE = exports.DEFAULT_LANGUAGE = 'en';

  /**
    The language code gotten from browser's locale. The language will be
    sought in the available language list and if it will not be found, the
    [DEFAULT_LANGUAGE]{@link module:locale~DEFAULT_LANGUAGE} will be set as default, otherwise it will be set.
    @member DETERMINED_LANGUAGE
    @type {String}
  */
  var DETERMINED_LANGUAGE = exports.DETERMINED_LANGUAGE = window.navigator.language.split('-').shift();

  /**
    @class Locale
    @extends Ember.Service
    @mixes Ember.Evented
    @memberOf module:service/locale
    @fires module:service/locale.Locale#languageDidChange
  */
  var Locale = _ember.default.Service.extend(_ember.default.Evented, {

    /**
      List of the languages, available for users. Every language has translation
      dictionary, you can find in the `public/i18n/` directory. Translation
      provided by i18n library.
      @name module:service/locale.Locale#languages
      @type Array
    */
    languages: _ember.default.A(_environment.default.languages),

    /**
      Language code in the ISO 639‑1. If you don't understand what it means,
      please take a look at http://en.wikipedia.org/wiki/ISO_639-1.
      @name module:service/locale.Locale#languageCode
      @default 'en'
      @type {String}
    */
    languageCode: null,

    /**
      The selected language' record. The record is found in the list by
      `languageCode`. If you want to change the language you should change
      languageCode property, it cause changing of selected language.
      @example isRussian: computed.equal('locale.language.code', 'ru')
      @memberOf module:service/locale.Locale#
      @property {object}  language
      @property {number}  language.code     A ISO-3166-1-alpha-2 language code (e.g. ru, en)
      @property {number}  language.name     The language name
      @property {number}  language.options  An options of the language
      @type Object
    */
    language: _ember.default.computed("languageCode", function () {
      return this.get('languages').findBy('code', this.get('languageCode'));
    }).readOnly(),

    /**
      Called when language was changed.
      @event module:service/locale.Locale#languageDidChange
    */
    languageDidChange: _ember.default.observer("language", function () {
      this.trigger('languageDidChange', this.get('language'));
    }),

    /**
      Calls every time when `languageCode` changed. Puts the language code into
      the local storage, to pick up it in future.
      @name module:service/locale.Locale#_update
      @private
    */
    _update: _ember.default.observer("languageCode", function () {
      storage.languageCode = this.get('languageCode');
      _environment.default.LOG_LOCALE && _ember.default.Logger.log("LOG_LOCALE: The language code has been changed to", storage.languageCode); // jshint ignore: line
    }),

    /**
      Sate the object by locale data gotten from a local storage or up the
      defaults into the {@link module:locale~storage|LocalStorage}.
      @method module:service/locale.Locale#init
    */
    init: function init() {

      // Grab the language code from a local storage.
      var languageCode = storage.languageCode,


      // The language list, available for user.
      languages = this.get('languages');

      // The language from a local storage isn't exist in the language list
      // or wasn't set at all.
      if (!languageCode || !languages.findBy('code', languageCode)) {
        // Searching a language in the list by the user's locale language code.
        if (languages.findBy('code', DETERMINED_LANGUAGE)) {
          // The determined language is fits (it was found in the language
          // list) - setting it up.
          languageCode = DETERMINED_LANGUAGE;
        } else {
          // Prefered language from a user's locale wasn't found in the
          // language list. Setting him a default language.
          languageCode = DEFAULT_LANGUAGE;
        }
      }

      // Set up the language code
      this.set('languageCode', languageCode);

      return this._super.apply(this, arguments);
    },

    /**
      @method module:service/locale.Locale#setLanguageCode
      @param {String} code  An [language code]{@link module:service/locale.Locale#language} (e.g. 'en', 'ru' etc.)
    */
    setLanguageCode: function setLanguageCode(code) {
      this.set('languageCode', code);
    },

    /**
      @method module:service/locale.Locale#toString
      @return {String}
    */
    toString: function toString() {
      return "<(The Locale Service)>";
    }

  });

  exports.default = Locale;
});
define("dummy/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yEQcVeY6", "block": "{\"statements\":[[6,[\"main-viewport\"],null,null,{\"statements\":[[19,\"partials/sidebar\"],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"w-page_container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"w-header\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"w-header_mobilenav-toddler \",[33,[\"if\"],[[28,[\"view\",\"stateRotate\"]],\"__w-state-rotate\"],null]]]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"toggleSidebar\"],[[\"target\"],[[28,[\"view\"]]]]],null],[13],[0,\"\\n        \"],[11,\"span\",[]],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"w-header_project\"],[13],[0,\"ember-dialog\"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"w-header_nav\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"w-header_nav-right\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"w-header_nav-item\"],[13],[0,\"\\n\\n            \"],[11,\"div\",[]],[16,\"class\",[34,[\"w-dropdown \",[33,[\"if\"],[[28,[\"isOpened\"]],\"__w-state-opened\"],null]]]],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"w-flag\"],[16,\"data-country-code\",[34,[[28,[\"locale\",\"language\",\"code\"]]]]],[13],[14],[0,\"\\n              \"],[11,\"a\",[]],[16,\"class\",[34,[\"w-link__inverse w-link__inverse-pseudo w-link \",[33,[\"if\"],[[28,[\"isOpened\"]],\"__w-state-selected\"],null],\" \",[33,[\"if\"],[[28,[\"isOpened\"]],\"__w-state-clickable\"],null]]]],[5,[\"action\"],[[28,[null]],\"toggleLanguage\"]],[13],[1,[33,[\"t\"],[[33,[\"concat\"],[\"language.\",[28,[\"locale\",\"language\",\"code\"]]],null]],null],false],[14],[0,\"\\n              \"],[11,\"ul\",[]],[15,\"class\",\"w-dropdown_list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"locale\",\"languages\"]]],null,{\"statements\":[[0,\"                  \"],[11,\"li\",[]],[16,\"class\",[34,[\"w-dropdown_item \",[28,[\"page\",\"dropdownItemClassName\"]]]]],[13],[0,\"\\n                    \"],[11,\"a\",[]],[15,\"class\",\"w-dropdown_link\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",[28,[\"lang\",\"code\"]]]],[13],[0,\"\\n                      \"],[1,[33,[\"t\"],[[33,[\"concat\"],[\"language.\",[28,[\"lang\",\"code\"]]],null]],null],false],[0,\"\\n                    \"],[14],[0,\"\\n                  \"],[14],[0,\"\\n\"]],\"locals\":[\"lang\"]},null],[0,\"              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"w-app-nav\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"w-app-nav_table\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"w-app-nav_cell-items\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"w-app-nav_container\"],[13],[0,\"\\n            \"],[11,\"nav\",[]],[15,\"role\",\"navigation\"],[15,\"class\",\"w-app-nav_group w-app-nav_group__main w-app-nav_group__menu\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"w-app-nav_item\"],[13],[6,[\"link-to\"],[\"getting-started\"],[[\"activeClass\",\"class\"],[\"__w-state-selected\",\"w-app-nav_link w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.getting_started\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"w-app-nav_item\"],[13],[6,[\"link-to\"],[\"tutorial\"],[[\"activeClass\",\"class\"],[\"__w-state-selected\",\"w-app-nav_link w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.tutorial\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"w-app-nav_item\"],[13],[6,[\"link-to\"],[\"cookbook\"],[[\"activeClass\",\"class\"],[\"__w-state-selected\",\"w-app-nav_link w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.cookbook\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"w-app-nav_item\"],[13],[11,\"a\",[]],[15,\"href\",\"docs\"],[15,\"class\",\"w-app-nav_link w-link\"],[13],[1,[33,[\"t\"],[\"navigation.docs\"],null],false],[14],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"w-page_content\"],[13],[0,\"\\n    \"],[1,[26,[\"outlet\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[\"view\"]},null],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
define("dummy/templates/cookbook", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GJXot6Sm", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-4 left-nav\"],[13],[0,\"\\n      \"],[19,\"partials/left-nav\"],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8\"],[13],[0,\"\\n      \"],[1,[26,[\"outlet\"]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/cookbook.hbs" } });
});
define("dummy/templates/cookbook/animation", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kuQXXQC2", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"cookbook/animation/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/cookbook/animation.hbs" } });
});
define("dummy/templates/cookbook/animation/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "F3iWVYZt", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.animation\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/animation/partials/en.hbs" } });
});
define("dummy/templates/cookbook/animation/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "10WCOKQm", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.animation\"],null],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Примеры анимаций вы можете найти внизу страницы.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Диалоговые окна показываются и исчезают незамедлительно - поскольку при создании они вставляются в DOM, а при уничтожении удаляются. Поэтому чтобы анимировать появление и исчезание нужно немного изменить это поведение.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Анимирование появления: Окно должно создаваться с css классом, которое скрывает его, а через мгновение, после того как оно было вставлено в DOM страницы, к нему должен добавляться css-класс делающий его видимым (через анимацию).\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Анимирование исчезания: При закрытии окно должно выдергиваться из DOM страницы с задержкой, необходимой для анимирования его исчезания.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Для начала создадим css стили, которые будут отвечать за анимацию.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/styles/app.scss:\"],[14],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/animation.scss\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Далее нужно отнаследовать \"],[11,\"a\",[]],[15,\"href\",\"docs/module-ember-dialog_components_presenter.html\"],[15,\"class\",\"w-link\"],[13],[0,\"Presenter\"],[14],[0,\", добавлять css классы при создании и уничтожении.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/components/presenter-animated.js:\"],[14],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/animated-presenter-1.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"После того как окно отрендерилось, но еще не вставилось в DOM страницы нужно добавить css-класс, которое делает окно невидимым (в примере делаем opacity: 0). После того как элемент был вставлен в DOM добавляем еще один класс делающий окно видимым (делаем opacity: 1)\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/animated-presenter-2.javascript\"],[15,\"data-line\",\"6-16\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Если запустить пример окно плавно появится на экране, но при закрытии оно исчезнет без анимации (просто удалится из DOM). Чтобы добавить анимацию на закрытие окна нам нужно:\"],[14],[0,\"\\n\\n\"],[11,\"ul\",[]],[13],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"1. Удалять окно из DOM с задержкой, необходимой для css анимации\"],[14],[0,\"\\n  \"],[11,\"li\",[]],[13],[0,\"2. Удалять добавленный при создании css класс (чтобы opacity снова стал равен 0)\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Переопределим методы отвечающие за закрытие окна, добавим удаление css класса и задержку.\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/animated-presenter-3.javascript\"],[15,\"data-line\",\"6-14\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Все готово! Теперь окна созданные по компоненту \"],[11,\"code\",[]],[13],[0,\"presenter-animated\"],[14],[0,\" будут показываться и исчезать с анимацией.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Но как его вызвать? По умолчанию Dialog Manager создает экземпляр компонента \"],[11,\"code\",[]],[13],[0,\"presenter\"],[14],[0,\", чтобы создать окно \"],[11,\"code\",[]],[13],[0,\"presenter-animated\"],[14],[0,\" нужно указать его имя последним аргументом:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/controller-1.javascript\"],[15,\"data-line\",\"8\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showDialog\"],null],null],[13],[0,\"Показать presenter\"],[14],[0,\" \"],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimatedDialog\"],null],null],[13],[0,\"Показать presenter-animated\"],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Но если мы хотим добавить еще один вариант анимации, придется дублировать компонент? Нет, возможно определять анимацию при создании диалогового окна через \"],[11,\"code\",[]],[13],[0,\"options\"],[14],[0,\" следующим образом.\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/controller-3.javascript\"],[15,\"data-line\",\"8\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Для этого изменим немного компонент:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/animated-presenter-4.javascript\"],[15,\"data-line\",\"6,9,14,25\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Теперь можно указывать имя анимации:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/controller-2.javascript\"],[15,\"data-line\",\"8,9\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Но код создания окна с анимацией стал слишком длинным, давайте расширим Dialog Manager и упрячем имя анимации и компонента в него:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/example-1.javascript\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Теперь мы можем создавать анимированные окна так:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/animation/controller-4.javascript\"],[15,\"data-line\",\"8\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"h1\",[]],[15,\"class\",\"w-title\"],[13],[0,\"Использование сторонних библиотек\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  Также можно использовать различные сторонние библиотеки, например \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/daneden/animate.css/\"],[13],[0,\"animate.css\"],[14],[0,\". Попробуйте сами:\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"bounceIn\",\"bounceOut\",500],null],null],[13],[0,\"bounce\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"fadeIn\",\"fadeOut\",500],null],null],[13],[0,\"fade\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"flipInX\",\"flipOutX\",500],null],null],[13],[0,\"flipX\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"flipInY\",\"flipOutY\",500],null],null],[13],[0,\"flipY\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"lightSpeedIn\",\"lightSpeedOut\",1000],null],null],[13],[0,\"lightSpeed\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"rotateIn\",\"rotateOut\",1000],null],null],[13],[0,\"rotate\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"rollIn\",\"rollOut\",1000],null],null],[13],[0,\"roll\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"zoomIn\",\"zoomOut\",1000],null],null],[13],[0,\"zoom\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"slideInDown\",\"slideOutDown\",1000],null],null],[13],[0,\"slideDown\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"fadeIn\",\"hinge\",2000],null],null],[13],[0,\"hinge Out\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"pulse\",\"\",0],null],null],[13],[0,\"pulse\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"flash\",\"\",0],null],null],[13],[0,\"flash\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"rubberBand\",\"\",0],null],null],[13],[0,\"rubberBand\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"shake\",\"\",0],null],null],[13],[0,\"shake\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"headShake\",\"\",0],null],null],[13],[0,\"headShake\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"swing\",\"\",0],null],null],[13],[0,\"swing\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"tada\",\"\",0],null],null],[13],[0,\"tada\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"wobble\",\"\",0],null],null],[13],[0,\"wobble\"],[14],[0,\",\\n  \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAnimation\",\"jello\",\"\",0],null],null],[13],[0,\"jello\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Как вы понимаете наследуя presenter-компонент можно сделать анимацию на любой элемент (на подложку или на само окно) любой сложности.\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/animation/partials/ru.hbs" } });
});
define("dummy/templates/cookbook/creating-notices", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tbVjkFYA", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"cookbook/creating-notices/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/cookbook/creating-notices.hbs" } });
});
define("dummy/templates/cookbook/creating-notices/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "XZawm1kA", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.creating_notices\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/creating-notices/partials/en.hbs" } });
});
define("dummy/templates/cookbook/creating-notices/partials/notice", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1JM+j2eH", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"notice-dialog\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"notice-dialog-content\"],[15,\"tabindex\",\"-1\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"templateName\"]]],null,{\"statements\":[[0,\"      \"],[19,[28,[\"templateName\"]]],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[\"dialog-body\"],[[\"layout\",\"contextObject\",\"context\"],[[28,[\"template\"]],[28,[\"contextObject\"]],[28,[\"context\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[11,\"div\",[]],[13],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"accept\"],null],null],[13],[0,\"Close\"],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/cookbook/creating-notices/partials/notice.hbs" } });
});
define("dummy/templates/cookbook/creating-notices/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "M9TFEkNb", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.creating_notices\"],null],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Ember Dialog Addon позволяет создавать все виды всплывающих окон, включая различные нотисы. Реализация нотисов основывается на возможности программного закрытия окон, а также возможности их стилизации.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Для начала давайте разберемся с тем, как сделать автозакрытие окна. С помощью события \"],[11,\"code\",[]],[13],[0,\"created\"],[14],[0,\" Dialog Manager мы можем получить ссылку на объект окна и у него в нужный момент вызвать метод \"],[11,\"code\",[]],[13],[0,\"accept\"],[14],[0,\", который закроет его.\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/creating-notices/controller-1.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAutoHideDialog\"],null],null],[13],[0,\"Показать диалог с автозакрытием\"],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Мы создали окно, которое закрывается через 500ms, но это все еще не нотис. Осталось задизайнить его. Для этого создадим layout с нужными нам css классами и опишем стили для них.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/templates/dialog/notice.hbs:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/creating-notices/layout-1.handlebars\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/styles/dialog-notice.scss:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/creating-notices/notice.scss\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Далее нам надо создать div с классом notices на уровне \"],[11,\"code\",[]],[13],[0,\"body\"],[14],[0,\" (в файле \"],[11,\"code\",[]],[13],[0,\"app/index.html\"],[14],[0,\"). К этому элементу будут прикрепляться notice окна.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Создавая notice окна нужно указывать к какому элементу его нужно прикрепить - селектор элемента указывается так \"],[11,\"code\",[]],[13],[0,\"options.root\"],[14],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/creating-notices/controller-2.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showNotice\"],null],null],[13],[0,\"Выполнить\"],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Чтобы каждый раз к controller не писать логику автозакрытия, layout и селектор элемента к которому прикрепить нотис, мы можем создать специальный метод `notice` у Dialog Manager и упрятать всю эту логику туда:\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/services/dialog.js:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/creating-notices/example-1.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"После этого создавать notice окна мы сможем так:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/creating-notices/controller-3.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Приятного пользования!\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/creating-notices/partials/ru.hbs" } });
});
define("dummy/templates/cookbook/how-to-make-dialog-drag-n-dropable", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "l7vxypZs", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"cookbook/how-to-make-dialog-drag-n-dropable/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/cookbook/how-to-make-dialog-drag-n-dropable.hbs" } });
});
define("dummy/templates/cookbook/how-to-make-dialog-drag-n-dropable/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7rs9q3qf", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.how_to_make_dialog_drag_n_dropable\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/how-to-make-dialog-drag-n-dropable/partials/en.hbs" } });
});
define("dummy/templates/cookbook/how-to-make-dialog-drag-n-dropable/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IAmoLlDf", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.how_to_make_dialog_drag_n_dropable\"],null],false],[14],[0,\"\\n\\nTBD\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/how-to-make-dialog-drag-n-dropable/partials/ru.hbs" } });
});
define("dummy/templates/cookbook/showing-server-errors", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wuoKPTLK", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"cookbook/showing-server-errors/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/cookbook/showing-server-errors.hbs" } });
});
define("dummy/templates/cookbook/showing-server-errors/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xle83Hbm", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.showing_server_errors\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/showing-server-errors/partials/en.hbs" } });
});
define("dummy/templates/cookbook/showing-server-errors/partials/plain", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "x4sWT+iZ", "block": "{\"statements\":[[11,\"b\",[]],[13],[1,[26,[\"title\"]],false],[14],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[1,[26,[\"text\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/showing-server-errors/partials/plain.hbs" } });
});
define("dummy/templates/cookbook/showing-server-errors/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ZAjU9lcj", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.showing_server_errors\"],null],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Диалоговое окно отлично подходит для показа серверных или любых других фатальных ошибок. Например соединение по WebSoсket отвалилось или протух токен или...\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Token expired error\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Давайте сделаем показ ошибки токена. Сначала нам надо инъектить Dialog Manager в адаптер приложения и сделать вывод ошибки в модальном окне на 401 ответ от сервера.\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/showing-server-errors/adapter-1.javascript\"],[13],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/showing-server-errors/error-unauthenticated.handlebars\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Теперь при получении от сервера ответа со статусом 401 пользователь будет видеть сообщение:\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[13],[11,\"img\",[]],[15,\"src\",\"assets/dialog-session-expired.png\"],[15,\"style\",\"max-width:100%\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"После нажатия на кнопку \\\"OK\\\" сессия будет инвалидирована.\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Invalid request error\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Рассмотрим вариант показа любых ошибок от сервера вверху страницы. Для этого нам надо добавить логику показа ошибок в адапторе, создать новый шаблон layout и стили к нему.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/adapter/application.js:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/showing-server-errors/adapter-2.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/templates/dialog/top-error.hbs:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/showing-server-errors/top-error.handlebars\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/templates/messages/titled.hbs:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/showing-server-errors/titled.handlebars\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/styles/top-error-dialog.scss:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/showing-server-errors/top-error-dialog.scss\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Ошибка будет выглядеть следующим образом:\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[13],[11,\"img\",[]],[15,\"src\",\"assets/dialog-top-error.png\"],[15,\"style\",\"max-width:100%\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Осталось сделать автозакрытие этого окна. Для этого нам нужно подписаться на событие `created` диалогового менеджера - так мы получим ссылку на созданное диалоговое окно. Далее через какое-то время у диалога нужно вызвать метод \"],[11,\"code\",[]],[13],[0,\"accept\"],[14],[0,\" или \"],[11,\"code\",[]],[13],[0,\"reject\"],[14],[0,\" для того, чтобы его закрыть.\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/showing-server-errors/adapter-3.javascript\"],[15,\"data-line\",\"11\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showTopError\"],null],null],[13],[0,\"Посмотреть как работает\"],[14],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/showing-server-errors/partials/ru.hbs" } });
});
define("dummy/templates/cookbook/showing-server-errors/partials/top-error", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1bYolH0f", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"top-error-dialog\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"top-error-dialog-content\"],[15,\"tabindex\",\"-1\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"templateName\"]]],null,{\"statements\":[[0,\"      \"],[19,[28,[\"templateName\"]]],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[\"dialog-body\"],[[\"layout\",\"contextObject\",\"context\"],[[28,[\"template\"]],[28,[\"contextObject\"]],[28,[\"context\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/cookbook/showing-server-errors/partials/top-error.hbs" } });
});
define("dummy/templates/cookbook/working-with-forms", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "l8se13YL", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"cookbook/working-with-forms/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/cookbook/working-with-forms.hbs" } });
});
define("dummy/templates/cookbook/working-with-forms/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PznjRiQX", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.working_with_forms\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/working-with-forms/partials/en.hbs" } });
});
define("dummy/templates/cookbook/working-with-forms/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6sxqva0+", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"cookbook.working_with_forms\"],null],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Показ форм в модалках не тривиальная задача, поскольку:\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"— во-первых accept закрытие должно происходить на submit формы\"],[14],[0,\"\\n\"],[11,\"p\",[]],[13],[0,\"— во-вторых окно не должно закрываться пока форма не валидна\"],[14],[0,\"\\n\"],[11,\"p\",[]],[13],[0,\"— в-третьих если пользователь нажимает на кнопку Cancel нужно откатывать измененные поля модели\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"К счастью Ember Dialog позволяет следать и то и другое.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Чтобы сделать accept закрытие на submit формы мы можем использовать \"],[11,\"code\",[]],[13],[0,\"blank layout\"],[14],[0,\" для создания собственного интерфейса.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/templates/forms/user.hbs:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/working-with-forms/template-1.handlebars\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Accept закрытие на submit формы мы сделали, теперь нужно сделать проверку заполненности данных перед закрытием окна. И откадывание данных модели в случае отмены.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"app/controllers/user.js:\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/cookbook/working-with-forms/controller-1.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Для работы с формами и валидацией объектов в целом мы рекомендуем использовать \"],[11,\"a\",[]],[15,\"href\",\"https://github.com/ajile/ember-validation\"],[15,\"class\",\"w-link\"],[13],[0,\"ember-validation\"],[14],[0,\".\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/cookbook/working-with-forms/partials/ru.hbs" } });
});
define("dummy/templates/examples/dialog/information", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ZHsTcS31", "block": "{\"statements\":[[11,\"style\",[]],[15,\"type\",\"text/css\"],[13],[0,\"\\n.class_1 {\\n  padding: 10px;\\n  border: 1px solid #ddd;\\n  border-radius: 5px;\\n  z-index: 13;\\n  background: #f9f9f9;\\n  position: fixed;\\n  bottom: 0px;\\n  margin: 0;\\n  top: inherit;\\n  left: inherit;\\n  right: 30px;\\n  width: 100%;\\n}\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"ember-dialog-dialog class_1\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-1\"],[15,\"style\",\"text-align: right;\"],[13],[11,\"a\",[]],[15,\"class\",\"w-link\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"accept\"],null],null],[13],[0,\"X\"],[14],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-11\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"templateName\"]]],null,{\"statements\":[[0,\"        \"],[19,[28,[\"templateName\"]]],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"component\"],[\"dialog-body\"],[[\"layout\",\"contextObject\",\"context\"],[[28,[\"template\"]],[28,[\"contextObject\"]],[28,[\"context\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/examples/dialog/information.hbs" } });
});
define("dummy/templates/examples/messages/greeting", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fcNFEavJ", "block": "{\"statements\":[[0,\"Username is \"],[11,\"b\",[]],[13],[1,[28,[\"contextObject\",\"username\"]],false],[14],[0,\".\\n\"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showNickname\"],[[\"target\"],[[28,[\"contextObject\"]]]]],null],[13],[0,\"Show me nick\"],[14],[0,\".\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/examples/messages/greeting.hbs" } });
});
define("dummy/templates/getting-started", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6H81Fq8X", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-4 left-nav\"],[13],[0,\"\\n      \"],[19,\"partials/left-nav\"],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8\"],[13],[0,\"\\n      \"],[19,[33,[\"concat\"],[\"getting-started/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/getting-started.hbs" } });
});
define("dummy/templates/getting-started/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SZQSJmBP", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[0,\"Getting Started\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"A lightweight and powerful Ember Addon that allows you to easily create \"],[11,\"b\",[]],[13],[0,\"routable\"],[14],[0,\" dialog windows and control their closing. It consists of a service that is available from any object and a component which is a dialog-window itself.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"So how do they look like? See yourself: \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAlert\"],null],null],[13],[0,\"alert\"],[14],[0,\", \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showConfirm\"],null],null],[13],[0,\"confirm\"],[14],[0,\" and \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showBlank\"],null],null],[13],[0,\"blank\"],[14],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"With ember-dialog you can create any popups like dialogs, modals, notices, bubbles etc. We have decided do not include realization of all this features to the library for minification reasons. Instead of it we have written absolute documentation how you can make it your own (see \"],[6,[\"link-to\"],[\"cookbook\"],null,{\"statements\":[[1,[33,[\"t\"],[\"navigation.cookbook\"],null],false]],\"locals\":[]},null],[0,\" and \"],[6,[\"link-to\"],[\"tutorial\"],null,{\"statements\":[[1,[33,[\"t\"],[\"navigation.tutorial\"],null],false]],\"locals\":[]},null],[0,\"). You can look the library's code on github and get surprised how much code on aboard to realize all features, presented on this site.\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Installation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Installing the library is as easy as:\"],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/getting-started/installation-1.bash\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"You will see something like this:\"],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/getting-started/installation-2.bash\"],[13],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Concept\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"The principle of work is simple. Service is instructed to display a modal window (`show`, `alert`, `confirm` or `blank` methods), creates a component instance with required layout and template, then renders it, and attaches it to the body. At this point, it also creates a Promise, resolve и reject methods of which are put into the component, while promise is returned from method for the program that called the creation could know the result of window closing. The component has 2 actions on aboard: one for `resolved` closing, the other one for `rejected` closing. Actions are available within a template and can be called, for instance by clicking on the button (in a layout or in a template). When you call an action, one of the Promise's method is executed and an independent event is triggered: \\\"accepted\\\" or \\\"declined\\\". The dialog service destroys component instance and detaches it from the DOM on this events.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Let's say you want to ask a user to confirm an action. You should call `show` method of the dialog service with a layout path (you need a dialog window with two buttons - `dialog/confirm` layout is exactly what you need) and a template path you want to show the user in the modal window. Method creates and shows dialog window and returns a Promise, that will become resolved or rejected when the window is closed (it depends on the button user has clicked).\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/getting-started/example-1.javascript\"],[15,\"data-line\",\"7\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"The method `show` allows you to create dialogs with different layouts: with various number of buttons, ways of display etc. We have foreseen the most popular variants of the modal windows: alert, confirm and blank, so you don't have to write the same layout path in different places of the program. For instance:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/getting-started/example-2.javascript\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"What's next? You may visit page \"],[6,[\"link-to\"],[\"tutorial\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.tutorial\"],null],false]],\"locals\":[]},null],[0,\", \"],[6,[\"link-to\"],[\"cookbook\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.cookbook\"],null],false]],\"locals\":[]},null],[0,\" or dig the \"],[11,\"a\",[]],[15,\"href\",\"docs\"],[15,\"class\",\"w-link\"],[13],[0,\"docs\"],[14],[0,\". For any questions, please write issue, we will try to help you.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Good luck!\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/getting-started/partials/en.hbs" } });
});
define("dummy/templates/getting-started/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xYp0rOEc", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[0,\"Знакомство\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Легковесный и мощный Ember Addon позволяющий легко создавать \"],[11,\"b\",[]],[13],[0,\"кроссроутные\"],[14],[0,\" диалоговые окна и программно контролировать их закрытие. Он состоит из сервиса, через который они создаются, и компонента - непосредственно самого диалогового окна (с нужным лейаутом и шаблоном).\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Сразу к делу, как они выглядят? Можете сами взглянуть: \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAlert\"],null],null],[13],[0,\"alert\"],[14],[0,\", \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showConfirm\"],null],null],[13],[0,\"confirm\"],[14],[0,\" и \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showBlank\"],null],null],[13],[0,\"blank\"],[14],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"С помощью ember-dialog вы можете создавать любые всплавающие интерфейсы: диалоговые окна, модалки, предупреждения, баблы и т.п. Для минимизации кода библиотеки мы не стали включать их реализацию в проект, но постарались максимально подробно описать как это сделать в вашем проекте (см. разделы \"],[6,[\"link-to\"],[\"cookbook\"],null,{\"statements\":[[1,[33,[\"t\"],[\"navigation.cookbook\"],null],false]],\"locals\":[]},null],[0,\" и \"],[6,[\"link-to\"],[\"tutorial\"],null,{\"statements\":[[1,[33,[\"t\"],[\"navigation.tutorial\"],null],false]],\"locals\":[]},null],[0,\"). Также вы можете заглянуть в код библиотеки, вы будете приятно удивлены тем, каким количеством кода обеспечены описанные на этом сайте возможности.\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Установка\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Установка аддона такая же простая как:\"],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/getting-started/installation-1.bash\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Вы увидите что-то типа:\"],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/getting-started/installation-2.bash\"],[13],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Концепция\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Принцип работы очень прост. У менеджера диалоговых окон вызывается один из методов (`show`, `alert`, `confirm` или `blank`), он создает компонент с нужными layout и template. Далее рендерит его и прикрепляет к body. Также создается Promise, resolve и reject методы которого кладутся в компонент, он же и возвращается из метода, для того чтобы подпрограмма которая запросила его создание могла узнать с каким результатом диалоговое окно закрылось. Каждый компонент (рабочее название Presenter) имеет 2 метода: один для accept-закрытия, другое для decline-закрытия. Эти методы доступны из шаблона и могут быть подвязаны к действиям пользователя, например при нажатии на какую-то кнопку внутри диалогового окна (в лейауте или шаблоне). Эти методы вызывают соответствующие методы самого Promise (который мы получили при создании модального окна, помните?), также компонент отстреливает соответствующее событие \\\"accepted\\\" или \\\"declined\\\". Менеджер диалоговых окон ловит эти события и по ним уничтожает компонент, происходит его открепление от DOM - оно исчезает. Все просто, не так ли? :)\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Давайте представим, что вы хотите попросить пользователя подтвердить какое-то действие. Ему нужно показать модельное окно, для этого нужно вызвать метод `show` с нужным layout (нам нужно окно с 2 кнопкам: да и нет - лейаут `dialog/confirm` как раз создан для этого, давайте использовать его) и путь до шаблона, который мы хотим показать пользователю в модальном окне (сразу оговорюсь, что можно указать не путь до шаблона, а сам шаблон, почитать об этом вы можете здесь). Вызванный метод `show` создает и показывает пользователю модальное окно и возвращает нам Promise, который станет resolved или rejected при закрытии окна в соответствии с нажатой кнопкой (yes или no). Пример:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/getting-started/example-1.javascript\"],[15,\"data-line\",\"7\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Метод `show` позволяет создавать различные типы диалоговых окон, используя различные layouts: с разным количеством кнопок, разлиными способами вывода на экран и пр. Мы предусмотрели наиболее частые варианты модальных окон: alert, confirm и blank. Так, что каждый раз указывать один и тот же лейаут в разных местах программы не обязательно, смотри пример:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/getting-started/example-2.javascript\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Куда дальше идти? Вы можете посетить страницу \"],[6,[\"link-to\"],[\"tutorial\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.tutorial\"],null],false]],\"locals\":[]},null],[0,\", \"],[6,[\"link-to\"],[\"cookbook\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.cookbook\"],null],false]],\"locals\":[]},null],[0,\" или покопаться в \"],[11,\"a\",[]],[15,\"href\",\"docs\"],[15,\"class\",\"w-link\"],[13],[0,\"документации\"],[14],[0,\". Если у вас еще остались вопросы, пожалуйста, пишите issue - попробует вместе решить ваш use case.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Удачного пользования!\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/getting-started/partials/ru.hbs" } });
});
define("dummy/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "evncoZnB", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"w-body-item\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-sm-12\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle __w-first\"],[13],[0,\"Installation\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[13],[11,\"a\",[]],[15,\"class\",\"w-link\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showAlert\"],null],null],[13],[0,\"Показать alert-окно\"],[14],[14],[0,\"\\n        \"],[11,\"div\",[]],[13],[11,\"a\",[]],[15,\"class\",\"w-link\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showConfirm\"],null],null],[13],[0,\"Показать confirm-окно\"],[14],[14],[0,\"\\n        \"],[11,\"div\",[]],[13],[11,\"a\",[]],[15,\"class\",\"w-link\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showBlank\"],null],null],[13],[0,\"Показать blank-окно\"],[14],[14],[0,\"\\n\"],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/index.hbs" } });
});
define("dummy/templates/layouts/alert", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5GI7bpUO", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"ember-dialog-dialog \",[26,[\"className\"]],\" \",[33,[\"if\"],[[28,[\"substrate\"]],\"substrate\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"dialog-content\"],[15,\"tabindex\",\"-1\"],[13],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dialog-header\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"button\"],[15,\"class\",\"dialog-close\"],[5,[\"action\"],[[28,[null]],\"accept\"]],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"dialog-title\"],[13],[1,[26,[\"title\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"templateName\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"dialog-body\"],[13],[19,[28,[\"templateName\"]]],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"component\"],[\"dialog-body\"],[[\"layout\",\"contextObject\",\"context\",\"class\"],[[28,[\"template\"]],[28,[\"contextObject\"]],[28,[\"context\"]],\"dialog-body\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"dialog-footer\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"btn btn__accept\"],[15,\"type\",\"button\"],[5,[\"action\"],[[28,[null]],\"accept\"]],[13],[0,\"OK\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/layouts/alert.hbs" } });
});
define("dummy/templates/layouts/blank", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "U8XpIAQH", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"ember-dialog-dialog \",[26,[\"className\"]],\" \",[33,[\"if\"],[[28,[\"substrate\"]],\"substrate\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"dialog-content\"],[15,\"tabindex\",\"-1\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"templateName\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"dialog-body\"],[13],[19,[28,[\"templateName\"]]],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[1,[33,[\"component\"],[\"dialog-body\"],[[\"layout\",\"contextObject\",\"context\",\"class\"],[[28,[\"template\"]],[28,[\"contextObject\"]],[28,[\"context\"]],\"dialog-body\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\" \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/layouts/blank.hbs" } });
});
define("dummy/templates/layouts/confirm", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "K2yxlZEK", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"ember-dialog-dialog \",[26,[\"className\"]],\" \",[33,[\"if\"],[[28,[\"substrate\"]],\"substrate\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"dialog-content\"],[15,\"tabindex\",\"-1\"],[13],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"dialog-header\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"type\",\"button\"],[15,\"class\",\"dialog-close\"],[5,[\"action\"],[[28,[null]],\"decline\"]],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"dialog-title\"],[13],[1,[26,[\"title\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"templateName\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"dialog-body\"],[13],[19,[28,[\"templateName\"]]],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"component\"],[\"dialog-body\"],[[\"layout\",\"contextObject\",\"context\",\"class\"],[[28,[\"template\"]],[28,[\"contextObject\"]],[28,[\"context\"]],\"dialog-body\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"dialog-footer\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"btn btn__accept\"],[15,\"type\",\"button\"],[5,[\"action\"],[[28,[null]],\"accept\"]],[13],[0,\"Yes\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"btn btn__decline\"],[15,\"type\",\"button\"],[5,[\"action\"],[[28,[null]],\"decline\"]],[13],[0,\"No\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/layouts/confirm.hbs" } });
});
define("dummy/templates/partials/left-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3n6nClVh", "block": "{\"statements\":[[11,\"p\",[]],[13],[6,[\"link-to\"],[\"tutorial\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.tutorial\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[15,\"class\",\"w-ol\"],[13],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"tutorial.creating\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"tutorial.creating_first_dialog\"],null],false]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"tutorial.presenter-and-manager\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"tutorial.presenter_and_manager\"],null],false]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"tutorial.customizing-dialog\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"tutorial.customizing_dialog\"],null],false]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"tutorial.creating-dialog-templates\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"tutorial.creating_dialog_templates\"],null],false]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[0,\"\\n    \"],[6,[\"link-to\"],[\"tutorial.listening-events\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"tutorial.listening_events\"],null],false]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[6,[\"link-to\"],[\"tutorial.interrupt-closing\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"tutorial.interrupt_closing\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[6,[\"link-to\"],[\"cookbook.animation\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.cookbook\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n\\n\"],[11,\"ol\",[]],[15,\"class\",\"w-ol\"],[13],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[6,[\"link-to\"],[\"cookbook.animation\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"cookbook.animation\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"],[0,\"  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[6,[\"link-to\"],[\"cookbook.showing-server-errors\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"cookbook.showing_server_errors\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[6,[\"link-to\"],[\"cookbook.creating-notices\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"cookbook.creating_notices\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n  \"],[11,\"li\",[]],[15,\"class\",\"w-ol_li\"],[13],[6,[\"link-to\"],[\"cookbook.working-with-forms\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"cookbook.working_with_forms\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[15,\"class\",\"__w-last\"],[13],[11,\"a\",[]],[15,\"href\",\"/ember-dialog/docs\"],[15,\"class\",\"w-link\"],[13],[1,[33,[\"t\"],[\"navigation.docs\"],null],false],[14],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/partials/left-nav.hbs" } });
});
define("dummy/templates/partials/sidebar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qQ6SLx+u", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"w-sidebar\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"w-sidebar_container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"w-sidebar_top\"],[13],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"w-sidebar_item\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[16,\"class\",[34,[\"w-dropdown \",[33,[\"if\"],[[28,[\"isOpened\"]],\"__w-state-opened\"],null]]]],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"w-flag\"],[16,\"data-country-code\",[34,[[28,[\"locale\",\"language\",\"code\"]]]]],[13],[14],[0,\"\\n          \"],[11,\"a\",[]],[16,\"class\",[34,[\"w-link__inverse w-link__inverse-pseudo w-link \",[33,[\"if\"],[[28,[\"isOpened\"]],\"__w-state-selected\"],null],\" \",[33,[\"if\"],[[28,[\"isOpened\"]],\"__w-state-clickable\"],null]]]],[5,[\"action\"],[[28,[null]],\"toggleLanguage\"]],[13],[1,[33,[\"t\"],[[33,[\"concat\"],[\"language.\",[28,[\"locale\",\"language\",\"code\"]]],null]],null],false],[14],[0,\"\\n          \"],[11,\"ul\",[]],[15,\"class\",\"w-dropdown_list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"locale\",\"languages\"]]],null,{\"statements\":[[0,\"              \"],[11,\"li\",[]],[16,\"class\",[34,[\"w-dropdown_item \",[28,[\"page\",\"dropdownItemClassName\"]]]]],[13],[0,\"\\n                \"],[11,\"a\",[]],[15,\"class\",\"w-dropdown_link\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",[28,[\"lang\",\"code\"]]]],[13],[0,\"\\n                  \"],[1,[33,[\"t\"],[[33,[\"concat\"],[\"language.\",[28,[\"lang\",\"code\"]]],null]],null],false],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"lang\"]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"w-sidebar_bottom\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"w-sidebar_item\"],[5,[\"action\"],[[28,[null]],\"toggleSidebar\"],[[\"target\"],[[28,[\"view\"]]]]],[13],[6,[\"link-to\"],[\"getting-started\"],[[\"activeClass\",\"class\"],[\"__w-state-selected\",\"w-app-nav_link w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.getting_started\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"w-sidebar_item\"],[5,[\"action\"],[[28,[null]],\"toggleSidebar\"],[[\"target\"],[[28,[\"view\"]]]]],[13],[6,[\"link-to\"],[\"tutorial\"],[[\"activeClass\",\"class\"],[\"__w-state-selected\",\"w-app-nav_link w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.tutorial\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"w-sidebar_item\"],[5,[\"action\"],[[28,[null]],\"toggleSidebar\"],[[\"target\"],[[28,[\"view\"]]]]],[13],[6,[\"link-to\"],[\"cookbook\"],[[\"activeClass\",\"class\"],[\"__w-state-selected\",\"w-app-nav_link w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"navigation.cookbook\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"w-sidebar_item\"],[13],[11,\"a\",[]],[15,\"href\",\"docs\"],[15,\"class\",\"w-app-nav_link w-link\"],[13],[1,[33,[\"t\"],[\"navigation.docs\"],null],false],[14],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/partials/sidebar.hbs" } });
});
define("dummy/templates/test-message", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KvLHfWOs", "block": "{\"statements\":[[11,\"p\",[]],[13],[0,\"Typos, missing words, code samples with errors are all considered documentation bugs. If you spot one of them, or want to otherwise improve the existing guides, we are happy to help you help us!\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Some of the more common ways to report a problem with the guides are:\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"ul\",[]],[13],[0,\"\\n    \"],[11,\"li\",[]],[13],[0,\"Using the pencil icon on the top-right of each guide page\"],[14],[0,\"\\n    \"],[11,\"li\",[]],[13],[0,\"Opening an issue/pull request to the GitHub repository\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Clicking the pencil icon will bring you to GitHub's editor for that guide so you can edit right away, using the Markdown markup language. This is the fastest way to correct a typo, a missing word, or an error in a code sample.\"],[14],[0,\"\\n\"],[11,\"p\",[]],[13],[0,\"To close the window click \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"decline\"],null],null],[13],[0,\"here\"],[14],[0,\".\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/test-message.hbs" } });
});
define("dummy/templates/tutorial", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "z5oLcR4H", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-4 left-nav\"],[13],[0,\"\\n      \"],[19,\"partials/left-nav\"],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8\"],[13],[0,\"\\n      \"],[1,[26,[\"outlet\"]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial.hbs" } });
});
define("dummy/templates/tutorial/advanced-creating-dialog", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yqB8MZB+", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"tutorial/advanced-creating-dialog/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/advanced-creating-dialog.hbs" } });
});
define("dummy/templates/tutorial/advanced-creating-dialog/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u/IaDJY3", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.advanced_creating_dialog\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/advanced-creating-dialog/partials/en.hbs" } });
});
define("dummy/templates/tutorial/advanced-creating-dialog/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RhjoBDKj", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.advanced_creating_dialog\"],null],false],[14],[0,\"\\n\\nTBD\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/advanced-creating-dialog/partials/ru.hbs" } });
});
define("dummy/templates/tutorial/creating-dialog-templates", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tlvO3v4l", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"tutorial/creating-dialog-templates/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/creating-dialog-templates.hbs" } });
});
define("dummy/templates/tutorial/creating-dialog-templates/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UAReSLCC", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.creating_dialog_templates\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/creating-dialog-templates/partials/en.hbs" } });
});
define("dummy/templates/tutorial/creating-dialog-templates/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "n3nQkS0h", "block": "{\"statements\":[[11,\"style\",[]],[15,\"type\",\"text/css\"],[13],[0,\"\\n.scheme-image {\\n  max-width: 100%\\n}\\n\"],[14],[0,\"\\n\\n\"],[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.creating_dialog_templates\"],null],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Для создания диалогового окна требуется 2 вида шаблонов: layout и template. Layout отвечает за внешний вид окна, именно в нем содержатся элементы управления (имеет на борту нужные кнопки). Также определяет тип диалогового окна. Template это само тело окна, в нем также могут определяться элементы управления, поскольку окружение у layout и template одно и то же.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Зачем же нужно такое разделение? У проекта могут быть типовые диалоговые окна: для информирования пользователя о чем-то, показа ошибок, предупреждений, для подтверждения каких-то действия, различные нотисы (в углу страницы), диалоговые окна с формами и т.д. И чтобы избежать дублирования кода (который отвечает за тип окна) нужно использовать layouts.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"О том как стилизовать диалоговые окна вы можете узнать на странице \"],[6,[\"link-to\"],[\"tutorial.customizing-dialog\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"tutorial.customizing_dialog\"],null],false]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Схематично диалоговое окно можно представить следующим образом:\"],[14],[0,\"\\n\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: left; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/schemes/layout-and-template.svg\"],[15,\"class\",\"scheme-image\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Layout\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Лейаут отвечает за внешний вид окна (то как оно показывается, где показывается), набор UI элементов. Ember dialog имеет на борту 3-и layouts:\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Alert layout\"],[14],[0,\". Имеет на борту всего одну кнопку (ok) и крестик закрытия - при закрытии Promise резолвится. Может быть использовано для показа пользователю каких-то сообщений.\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: left; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/schemes/alert.svg\"],[15,\"class\",\"scheme-image\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Confirm layout\"],[14],[0,\". Имеет на борту две кнопки (yes, no) и крестик закрытия - при закрытии через крестик или по кнопке no - Promise становится rejected, при закрытии через кнопку yes - становится resolved. Может быть использовано для подтверждения пользователем какого-то действия.\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: left; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/schemes/confirm.svg\"],[15,\"class\",\"scheme-image\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Blank layout\"],[14],[0,\". Совершенно пустое модальное окно. Может быть использовано для показа форм, у которых action accept вызывается на submit формы. Подробнее об этом читайте на странице \"],[6,[\"link-to\"],[\"cookbook.working-with-forms\"],null,{\"statements\":[[1,[33,[\"t\"],[\"cookbook.working_with_forms\"],null],false]],\"locals\":[]},null],[0,\". Элементы зыкрытия в таком случае должны находиться в теле модального окна\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: left; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/schemes/blank.svg\"],[15,\"class\",\"scheme-image\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Создание собственного layout\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"По аналогии с приведенными выше layouts вы можете создать свои собственные.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Например layout модального окна со значком info.\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: left; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/schemes/information.svg\"],[15,\"class\",\"scheme-image\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Или более сложные варианты, например layout notice диалогового окна. Ниже схематично представление его layout. Как такой вид диалоговых окон сделать вы можете узнать на странице \"],[6,[\"link-to\"],[\"cookbook.creating-notices\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"cookbook.creating_notices\"],null],false]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: left; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/schemes/notice.svg\"],[15,\"class\",\"scheme-image\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Итак как создавать layouts и их использовать. Layout - это простой шаблон, как вы понимаете, он должен находиться в директории \"],[11,\"code\",[]],[13],[0,\"app/templates\"],[14],[0,\". Для того чтобы показать диалоговое окно с созданным layout путь до него нужно указать первым аргументом при вызове метода show \"],[6,[\"link-to\"],[\"tutorial.presenter-and-manager\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[0,\"Dialog Manager\"]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Например давайте создадим новый вид диалогового окна, которое будет выводиться в левом верхнем углу страницы, с красным background, назовем его \"],[11,\"code\",[]],[13],[0,\"red-corner-dialog\"],[14],[0,\". Для этого в директории шаблонов создадим файл \"],[11,\"code\",[]],[13],[0,\"red-corner-dialog.hbs\"],[14],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Файл app/templates/red-corner-dialog.hbs\"],[14],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating-dialog-templates/template-1.handlebars\"],[13],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating-dialog-templates/styles-1.scss\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"В контроллере показ (создание) диалогового окна тогда будет выглядеть так:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating-dialog-templates/controller-1.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showDialog\"],null],null],[13],[0,\"Запустить пример\"],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Или вы можете упрятать этот лейаут в специальный метод, отнаследовав Dialog Manager.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Файл app/services/dialog.js\"],[14],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating-dialog-templates/example-1.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"И тогда в контроллере вы сможете делать так:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating-dialog-templates/controller-2.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Схемотично это диалоговое окно выглядит так:\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: left; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/schemes/red-corner-dialog.svg\"],[15,\"class\",\"scheme-image\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Template\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Это тело диалогового окна, у него такой же скоуп как и у layout. В нем также как и в layout могут быть элементы управления диалоговым окном (т.е. быть произведен вызов \"],[11,\"code\",[]],[13],[0,\"accept\"],[14],[0,\" и \"],[11,\"code\",[]],[13],[0,\"decline\"],[14],[0,\" actions). Если при создании окна был указан context, он будет также как и в layout доступен в специальной переменной \"],[11,\"code\",[]],[13],[0,\"contextObject\"],[14],[0,\". Благодаря \"],[11,\"code\",[]],[13],[0,\"contextObject\"],[14],[0,\" возможно связывать данные с шаблоном, а также вызывать различные \"],[11,\"code\",[]],[13],[0,\"actions\"],[14],[0,\" context.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Template, как правило используется для показа простого текста, но позволяет выводить более сложные структуры, такие как формы (см. \"],[6,[\"link-to\"],[\"cookbook.working-with-forms\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[1,[33,[\"t\"],[\"cookbook.working_with_forms\"],null],false]],\"locals\":[]},null],[0,\").\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/creating-dialog-templates/partials/ru.hbs" } });
});
define("dummy/templates/tutorial/creating-dialog-templates/partials/template-1", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ymghjN+f", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"ember-dialog-dialog red-corner-dialog \",[33,[\"if\"],[[28,[\"substrate\"]],\"substrate\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"dialog-content\"],[15,\"tabindex\",\"-1\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"templateName\"]]],null,{\"statements\":[[0,\"        \"],[19,[28,[\"templateName\"]]],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"component\"],[\"dialog-body\"],[[\"layout\",\"contextObject\",\"context\"],[[28,[\"template\"]],[28,[\"contextObject\"]],[28,[\"context\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[13],[11,\"a\",[]],[15,\"class\",\"w-link\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"accept\"],null],null],[13],[0,\"Close\"],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/creating-dialog-templates/partials/template-1.hbs" } });
});
define("dummy/templates/tutorial/creating", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DdkA/S3H", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"tutorial/creating/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/creating.hbs" } });
});
define("dummy/templates/tutorial/creating/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "m0NwBkR1", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.creating_first_dialog\"],null],false],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Alert dialog window creation\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"All the controllers acquire the 'dialog' property after ember-dialog installation, this property is a link for the dialog window service where all the dialog wondows are created.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"To create your first dialog let us create a route, a controller and a template. To do that go the the root of your project and run the commands:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/generate-things.bash\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Ember will create the route, the controller and the template for you. Now open the created controller (it should be here: \"],[11,\"code\",[]],[13],[0,\"app/controllers/example.js\"],[14],[0,\") and edit it.\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-1.javascript\"],[15,\"data-line\",\"4-7\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"When opening url \"],[11,\"code\",[]],[13],[0,\"http://127.0.0.1:4200/example\"],[14],[0,\" a default alert window with text \\\"Hello, Vladimir Milkov\\\" should pop up. JS code execution stops until the window is closed. It looks like this (You know ;))\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: center; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/default-alert.png\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"To create an ember-dialog window you should change the code like this:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-2.javascript\"],[15,\"data-line\",\"7\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"You will see:\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: center; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/dialog-alert.png\"],[13],[14],[14],[0,\"\\n\\nTBD: Unfortunately the English version isn't finished yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\\n\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/creating/partials/en.hbs" } });
});
define("dummy/templates/tutorial/creating/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "43lxxDGW", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[0,\"Первое диалоговое окно\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Создание alert-диалогового окна\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Во всех контроллерах после установки ember-dialog появляется свойство `dialog`, которое является ссылкой на сервис диалоговых окон - через который создаются все диалоговые окна.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Чтобы создать наше первое диалоговое окно давайте создадим контроллер, роут и шаблон. Для этого перейдите в корень вашего проекта и запустите команды:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/generate-things.bash\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Ember создаст для вас роут, шаблон и контроллер. Давайте теперь откроем созданный нами контроллер (он должен находиться здесь: \"],[11,\"code\",[]],[13],[0,\"app/controllers/example.js\"],[14],[0,\") и внесем в него следующие изменения:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-1.javascript\"],[15,\"data-line\",\"4-7\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"При заходе на url \"],[11,\"code\",[]],[13],[0,\"http://127.0.0.1:4200/example\"],[14],[0,\" вы увидите дефолтное alert окно с текстом \\\"Hello, Vladimir Milkov\\\". Выполнение js кода было приостановлено до тех пор пока окно не будет закрыто. Выглядит окно так (ну вы и сами знаете ;)):\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: center; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/default-alert.png\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Чтобы создать ember-dialog модальное окно нужно изменить код следующим образом:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-2.javascript\"],[15,\"data-line\",\"7\"],[15,\"class\",\"line-numbers\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Вы увидите следующее:\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"style\",\"text-align: center; overflow: hidden;\"],[13],[11,\"img\",[]],[15,\"src\",\"assets/dialog-alert.png\"],[13],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Попробуйте сами: \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"simpleAlert\"],null],null],[13],[0,\"показать простой alert\"],[14],[0,\", \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"dialogAlert\"],null],null],[13],[0,\"показать диалоговое окно с лейаутом alert\"],[14],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Создание confirm диалогового окна\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Ключевым типом диалоговых окон в большинстве проектов является confirm (с двумя кнопками). Такие окна также могут быть созданы из контроллера. Любой метод создающий окно диалогового менеджера возвращает \"],[11,\"code\",[]],[13],[0,\"Promise\"],[14],[0,\" объект, который становится выполненым при закрытии окна. В случае с alert промис на закрытие всего резолвится, но в случае confirm, промис может и зарежектиться. Давайте ближе к коду:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-3.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"confirmDeletion\"],null],null],[13],[0,\"Жми сюда\"],[14],[0,\" чтобы посмотреть результат отработки примера выше.\"],[14],[0,\"\\n\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Использование шаблонов\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Тело диалогового окна может быть передано прямо при создании, следующим образом:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-5.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Но в крупных приложениях сообщения типа alert или confirm в разных местах программы одни и те же, и чтобы не плодить дубликаты можно текст сообщения вынести в отдельный шаблон и указывать вместо него путь.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"К примеру пример выше можно переделать следующим образом. Создать шаблон `app/templates/messages/alert-error.hbs` и использовать его для показа в диалоговом окне в различных местах программы.\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-4.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Хорошей практикой для своих проектов я выбрал использование специальной директории для шаблонов-сообщений: \"],[11,\"code\",[]],[13],[0,\"/messages/\"],[14],[0,\". Рекомендую вам поступить так же.\"],[14],[0,\"\\n\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Прокидывание данных в диалоговое окно\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Любой метод для создания диалогового окна принимает 3 аргумента: шаблон, контекст, опции (исключанием является лишь метод \"],[11,\"code\",[]],[13],[0,\"show\"],[14],[0,\", который принимает также layout).\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Шаблон\"],[14],[0,\" — путь до шаблона или предкомпилированный шаблон, который нужно вывести в теле диалогового окна.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Контекст\"],[14],[0,\" — объект с данными, он записывается в специальное свойство объекта диалогового окна - contextObject и может быть использован для показа данных в шаблоне.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Опции\"],[14],[0,\" — хеш влияющий на поведение диалогового окна, им оно расширяется. Ключи этого хеша неспосредственно доступны в шаблоне.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Из следующего примера должно стать ясно, что к чему ;)\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-6.javascript\"],[13],[14],[0,\"\\n\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Контроль закрытия\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Порой требуется контролировать закрытие модального окна программно. Наиболее частым случаем является диалоговое окно содержащее некую форму (про формы - \"],[6,[\"link-to\"],[\"cookbook.working-with-forms\"],[[\"class\"],[\"w-link\"]],{\"statements\":[[0,\"отдельная история\"]],\"locals\":[]},null],[0,\"), при закрытии окна нужно создавать определенную сущность по данным формы. Но данные могут быть не валидными и в таком случае закрывать окно не нужно. Как предотвратить закрытие окна? Ранее при создании окна мы получали Promise по закрытию которого могли производить те или иные действия, т.е. постфактум. Итак для того чтобы запретить закрытие диалогового окна мы должны переопределить интересующий нас action у context отвечающий за его закрытие: accept и decline. Первым аргументом в action приходит presenter (инстанс компонента диалогового окна), у которого определены одноименные методы. Вот пример из которого все должно стать ясно.\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/creating/controller-7.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showDialog\"],null],null],[13],[0,\"Проверьте сами\"],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Но что делать если в контроллере используются несколько диалоговых окон? Нужно задать имя обработчка закрытия для каждого диалогового окна, как это сделать можете почитать на странице \"],[6,[\"link-to\"],[\"tutorial.interrupt-closing\"],null,{\"statements\":[[1,[33,[\"t\"],[\"tutorial.interrupt_closing\"],null],false]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/creating/partials/ru.hbs" } });
});
define("dummy/templates/tutorial/customizing-dialog", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "of7cvguv", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"tutorial/customizing-dialog/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/customizing-dialog.hbs" } });
});
define("dummy/templates/tutorial/customizing-dialog/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "iIgWKLUR", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.customizing_dialog\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/customizing-dialog/partials/en.hbs" } });
});
define("dummy/templates/tutorial/customizing-dialog/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rHibyRl9", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.customizing_dialog\"],null],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Стили написаны на языке \"],[11,\"a\",[]],[15,\"href\",\"http://sass-lang.com/\"],[15,\"class\",\"w-link\"],[13],[0,\"sass\"],[14],[0,\", что позволяет подключить их в ваш проект.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Проект содержит 2 файла со стилями. Первый файл содержит каркас диалоговых окон - т.е. обеспечивает их показ в нужном размере и нужном месте. Второй файл содержит стили влияющие на внешний вид. Вы можете подключить в ваш проект любой из этих файлов независимо.\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Как подключить стили в проект\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Для подключения всех стилей ember-dialog пропишите в вашем \"],[11,\"code\",[]],[13],[0,\"app/styles/app.scss\"],[14],[0,\":\"],[14],[0,\"\\n\\n\"],[11,\"code\",[]],[15,\"class\",\"language-scss\"],[13],[0,\"@import \\\"node_modules/ember-dialog/addon/styles/ember-dialog\\\";\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Чтобы не указывать весь путь до стилей, вы можете добавить этот путь в конфиг sass. Для этого поправьте ваш \"],[11,\"code\",[]],[13],[0,\"ember-cli-build.js\"],[14],[0,\":\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/customizing-dialog/ember-cli-build.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"После этого вы сможете подлючать стили так:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/customizing-dialog/including.scss\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Также вы можете подключить к проекту только структуру:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/customizing-dialog/structure-including.scss\"],[13],[14],[0,\"\\n\\n\"],[0,\"\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Как сделать анимацию\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Основной класс диалоговых окон \"],[11,\"code\",[]],[13],[0,\"ember-dialog-dialog\"],[14],[0,\", вы можете добавлять к нему различные css анимации. Если вы хотите хотите применить анимацию на конкретное окно - вы можете создать новый css класс и указать его в \"],[11,\"code\",[]],[13],[0,\"options.className\"],[14],[0,\" при его создании (см. \"],[6,[\"link-to\"],[\"tutorial.presenter-and-manager\"],null,{\"statements\":[[1,[33,[\"t\"],[\"tutorial.presenter_and_manager\"],null],false]],\"locals\":[]},null],[0,\"). Подробное описание создания анимации смотрите в разделе \"],[6,[\"link-to\"],[\"cookbook.animation\"],null,{\"statements\":[[1,[33,[\"t\"],[\"cookbook.animation\"],null],false]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Как создать новый лейаут\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Описание этого раздела было перенесено \"],[6,[\"link-to\"],[\"tutorial.creating-dialog-templates\"],null,{\"statements\":[[0,\"сюда\"]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/customizing-dialog/partials/ru.hbs" } });
});
define("dummy/templates/tutorial/interrupt-closing", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fqhrLT9e", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"tutorial/interrupt-closing/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/interrupt-closing.hbs" } });
});
define("dummy/templates/tutorial/interrupt-closing/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9gxCA5Xf", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.interrupt_closing\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/interrupt-closing/partials/en.hbs" } });
});
define("dummy/templates/tutorial/interrupt-closing/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ERrDHAG4", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.interrupt_closing\"],null],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Прерывание закрытия бывает полезно если данные в диалоговом окне невалидны. Для прерывания закрытия окна нужно переопределить actions отвечающие за это - \"],[11,\"code\",[]],[13],[0,\"accept\"],[14],[0,\" и \"],[11,\"code\",[]],[13],[0,\"decline\"],[14],[0,\". Это можно сделать так:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/interrupt-closing/controller-1.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showDialog\"],null],null],[13],[0,\"Попробуйте сами\"],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"В примере выше при создании диалога был передан контроллер как контекст, а также указаны имена его actions (acceptHandler и declineHandler), которые отвечают за закрытие, поэтому default actions компонента не отработали и окно не закрылось. В actions контролера первым аргументом приходит объект компонента presenter, у него есть 2-а метода предназначенные для его закрытия: accept и decline при вызове этих методов окно уничтожается, а у промис, который мы получили при создании, становится resolved и rejected соотвественно.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Частный случай в котором обойтись без прерывания закрытия не получится - показ формы в диалоговом окне, поскольку оно не может быть закрыто \\\"с успехом\\\" до тех пор пока форма не валидна. Подробнее об этом говорится на странице \"],[6,[\"link-to\"],[\"cookbook.working-with-forms\"],null,{\"statements\":[[1,[33,[\"t\"],[\"cookbook.working_with_forms\"],null],false]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/interrupt-closing/partials/ru.hbs" } });
});
define("dummy/templates/tutorial/listening-events", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5FgB4MtM", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"tutorial/listening-events/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/listening-events.hbs" } });
});
define("dummy/templates/tutorial/listening-events/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "iPlP9cO0", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.listening_events\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/listening-events/partials/en.hbs" } });
});
define("dummy/templates/tutorial/listening-events/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+elj327J", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.listening_events\"],null],false],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"События Dialog Manager:\"],[14],[0,\"\\n\\n\"],[11,\"table\",[]],[15,\"class\",\"w-table\"],[13],[0,\"\\n  \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n    \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Имя\"],[14],[0,\"\\n    \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Комментарий\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n    \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"created (\"],[11,\"a\",[]],[15,\"href\",\"docs/module-ember-dialog_components_presenter.html\"],[15,\"class\",\"w-link\"],[13],[0,\"Presenter\"],[14],[0,\")\"],[14],[0,\"\\n    \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Событие отстреливается после создания нового диалогового окна.\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n    \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"destroyed (\"],[11,\"a\",[]],[15,\"href\",\"docs/module-ember-dialog_components_presenter.html\"],[15,\"class\",\"w-link\"],[13],[0,\"Presenter\"],[14],[0,\")\"],[14],[0,\"\\n    \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Событие отстреливается после закрытия диалогового окна.\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"События могут использоваться для управления диалоговым окном и его поведением из вне. К примеру при потере соединения с сервером по WebSocket используя события можно показать пользователю соотвествующее сообщение и убрать его после того как соединение было установлено.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Также на основе событий можно создать особенный тип диалогового окна - notices, которые исчезают через какое-то время (см. \"],[6,[\"link-to\"],[\"cookbook.creating-notices\"],null,{\"statements\":[[1,[33,[\"t\"],[\"cookbook.creating_notices\"],null],false]],\"locals\":[]},null],[0,\").\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/listening-events/controller-1.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"События Presenter:\"],[14],[0,\"\\n\\n\"],[11,\"table\",[]],[15,\"class\",\"w-table\"],[13],[0,\"\\n  \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n    \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Имя\"],[14],[0,\"\\n    \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Комментарий\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n    \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"accepted (\"],[11,\"a\",[]],[15,\"href\",\"docs/module-ember-dialog_components_presenter.html\"],[15,\"class\",\"w-link\"],[13],[0,\"Presenter\"],[14],[0,\")\"],[14],[0,\"\\n    \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Событие отстреливается после accepted-закрытия окна.\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n    \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"declined (\"],[11,\"a\",[]],[15,\"href\",\"docs/module-ember-dialog_components_presenter.html\"],[15,\"class\",\"w-link\"],[13],[0,\"Presenter\"],[14],[0,\")\"],[14],[0,\"\\n    \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Событие отстреливается после declined-закрытия окна.\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/listening-events/partials/ru.hbs" } });
});
define("dummy/templates/tutorial/presenter-and-manager", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fQIrmX2h", "block": "{\"statements\":[[19,[33,[\"concat\"],[\"tutorial/presenter-and-manager/partials/\",[28,[\"locale\",\"languageCode\"]]],null]],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/presenter-and-manager.hbs" } });
});
define("dummy/templates/tutorial/presenter-and-manager/partials/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cIcA5knz", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.presenter_and_manager\"],null],false],[14],[0,\"\\n\\nTBD: Unfortunately there is no English version yet. Please see the \"],[11,\"a\",[]],[15,\"class\",\"w-link w-link__pseudo\"],[5,[\"action\"],[[28,[null]],\"setLanguageCode\",\"ru\"]],[13],[0,\"Russian version\"],[14],[0,\", you may find useful examples there...\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/presenter-and-manager/partials/en.hbs" } });
});
define("dummy/templates/tutorial/presenter-and-manager/partials/partial-1", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "B38vdkgr", "block": "{\"statements\":[[0,\"Несложно заметить, что любой фрагмент страницы, находящийся в отдельном шаблоне может быть показан в модальном окне. Секунды тикают: \"],[1,[33,[\"if\"],[[28,[\"contextObject\"]],[28,[\"contextObject\",\"seconds\"]],[28,[\"seconds\"]]],null],false],[0,\".\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/tutorial/presenter-and-manager/partials/partial-1.hbs" } });
});
define("dummy/templates/tutorial/presenter-and-manager/partials/ru", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JMC24cfp", "block": "{\"statements\":[[11,\"h1\",[]],[15,\"class\",\"w-title __w-first\"],[13],[1,[33,[\"t\"],[\"tutorial.presenter_and_manager\"],null],false],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Addon ember-dialog состоит из 3х частей: из компонента (presenter), сервиса (dialog manager) и набора основных layouts. Модальные окна создаются через сервис (см. Dialog Manager). Примеры создания диалоговых окон можете посмотреть на странице \"],[6,[\"link-to\"],[\"tutorial.creating\"],null,{\"statements\":[[0,\"создание первого окна\"]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Dialog Manager\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Сервис через который создаются и удаляются модельные окна, является singleton. Он доступен изо всех контроллеров (имя свойства `dialog`) по-умолчанию и может быть injected в любой класс, находящийся в регистре приложения. Основным методом для создания окна является \"],[11,\"a\",[]],[15,\"href\",\"docs/module-ember-dialog_services_dialog.html#-inner-show__anchor\"],[15,\"class\",\"w-link\"],[13],[0,\"show\"],[14],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"table\",[]],[15,\"class\",\"w-table\"],[13],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Аргумент\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Тип\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Комментарий\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"layout\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[15,\"nowrap\",\"nowrap\"],[13],[0,\"String | Object\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Может быть передан как путь до шаблона или как предкомпилированный шаблон.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"template\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[15,\"nowrap\",\"nowrap\"],[13],[0,\"String | Object\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-first\"],[13],[0,\"Может быть передан как путь до шаблона или как предкомпилированный шаблон.\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"Передача пути до шаблона: \"],[11,\"pre\",[]],[15,\"data-language\",\"javascipt\"],[13],[0,\"dialog.show(\\\"dialog/alert\\\", \\\"messages/error-message\\\");\"],[14],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"В модельном окне будет показано содержимое шаблона, который находится тут: \"],[11,\"code\",[]],[13],[0,\"app/templates/messages/error-message\"],[14],[0,\".\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-last\"],[13],[0,\"Передача предкомпилированного шаблона:\\n          \"],[11,\"pre\",[]],[15,\"data-language\",\"javascipt\"],[13],[0,\"import hbs from 'htmlbars-inline-precompile';\\ndialog.show(\\\"dialog/alert\\\", hbs`Hello world!`);\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"context *\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Object\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-first\"],[13],[0,\"Объект, который кладется в специальное свойство компонента диалогового окна - \"],[11,\"code\",[]],[13],[0,\"contextObject\"],[14],[0,\". Любое свойство объекта или функцию можно получить из шаблона или лейаута.\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-last\"],[13],[0,\"Пример: \"],[11,\"code\",[]],[15,\"data-language\",\"handlebar\"],[13],[0,\"{{contextObject.model.first_name}}\"],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"options *\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Object\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-first\"],[13],[0,\"Объект с которым создается Presenter, влияет на поведение диалогового окна. Также поскольку свойства объекта кладутся в Presenter - они доступны из шаблона.\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"Пример если создать диалоговое окно так: \"],[11,\"pre\",[]],[15,\"data-language\",\"javascipt\"],[13],[0,\"dialog.show(\\\"dialog/alert\\\", \\\"message\\\", null, { username: \\\"Vladimir Milkov\\\" });\"],[14],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"В шаблоне можно вывести username так: \"],[11,\"pre\",[]],[15,\"data-language\",\"javascipt\"],[13],[0,\"{{username}}\"],[14],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-last\"],[13],[0,\"Так как по объекту создается Presenter можно изменить свойства модального окна (см. Presenter).\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"componentName=\\\"presenter\\\" *\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"String\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-first\"],[13],[0,\"Имя компонента диалогового окна.\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[11,\"p\",[]],[13],[0,\"Рассмотрим пример вызова диалогового окна:\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Controller\"],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/presenter-and-manager/controller-1.javascript\"],[13],[14],[0,\"\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Layout\"],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/presenter-and-manager/layout-1.handlebars\"],[13],[14],[0,\"\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Template\"],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/presenter-and-manager/template-1.handlebars\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showGreeting\"],null],null],[13],[0,\"Запустить пример\"],[14],[0,\" (диалоговое окно появится справа внизу).\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"w-notification w-notification__success\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"w-notification_text\"],[13],[0,\"Обратите внимание, что вы можете перемещаться по сайту - окно будет оставаться на месте. Круто, не правда ли? :)\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Вместо пути до шаблона можно использовать hbs функцию, так:\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[13],[0,\"Controller\"],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/presenter-and-manager/controller-2.javascript\"],[15,\"data-line\",\"10\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Но я не рекомендую злоупотреблять таким подходом - он может использоваться в тестах. Лучше делать так:\"],[14],[0,\"\\n\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/presenter-and-manager/controller-3.javascript\"],[15,\"data-line\",\"2,10\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"style\",\"border: 1px solid #EEE; padding: 10px\"],[13],[0,\"\\n    \"],[11,\"p\",[]],[15,\"class\",\"__w-last\"],[13],[19,\"tutorial/presenter-and-manager/partials/partial-1\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"button\",[]],[15,\"class\",\"w-btn\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"showPartial1\"],null],null],[13],[0,\"Попробуйте сами\"],[14],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"В ember-addon предусмотренно 3 базовых layouts: alert, confirm и blank. Ознакомиться с ними вы можете на странице \"],[6,[\"link-to\"],[\"tutorial.creating-dialog-templates\"],null,{\"statements\":[[1,[33,[\"t\"],[\"tutorial.creating_dialog_templates\"],null],false]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"table\",[]],[15,\"class\",\"w-table\"],[13],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Аргумент\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Тип\"],[14],[0,\"\\n      \"],[11,\"th\",[]],[15,\"class\",\"w-table_th\"],[13],[0,\"Комментарий\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"template\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[15,\"nowrap\",\"nowrap\"],[13],[0,\"String | Object\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-first\"],[13],[0,\"Может быть передан как путь до шаблона или как предкомпилированный шаблон.\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"Передача пути до шаблона: \"],[11,\"pre\",[]],[15,\"data-language\",\"javascipt\"],[13],[0,\"dialog.show(\\\"dialog/alert\\\", \\\"messages/error-message\\\");\"],[14],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"В модельном окне будет показано содержимое шаблона, который находится тут: \"],[11,\"code\",[]],[13],[0,\"app/templates/messages/error-message\"],[14],[0,\".\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-last\"],[13],[0,\"Передача предкомпилированного шаблона:\\n          \"],[11,\"pre\",[]],[15,\"data-language\",\"javascipt\"],[13],[0,\"import hbs from 'htmlbars-inline-precompile';\\ndialog.show(\\\"dialog/alert\\\", hbs`Hello world!`);\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"context *\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Object\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-first\"],[13],[0,\"Объект, который кладется в специальное свойство компонента диалогового окна - \"],[11,\"code\",[]],[13],[0,\"contextObject\"],[14],[0,\". Любое свойство объекта или функцию можно получить из шаблона или лейаута.\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-last\"],[13],[0,\"Пример: \"],[11,\"code\",[]],[15,\"data-language\",\"handlebar\"],[13],[0,\"{{contextObject.model.first_name}}\"],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"options *\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"Object\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-first\"],[13],[0,\"Объект с которым создается Presenter, влияет на поведение диалогового окна. Также поскольку свойства объекта кладутся в Presenter - они доступны из шаблона.\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"Пример если создать диалоговое окно так: \"],[11,\"pre\",[]],[15,\"data-language\",\"javascipt\"],[13],[0,\"dialog.show(\\\"dialog/alert\\\", \\\"message\\\", null, { username: \\\"Vladimir Milkov\\\" });\"],[14],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"В шаблоне можно вывести username так: \"],[11,\"pre\",[]],[15,\"data-language\",\"javascipt\"],[13],[0,\"{{username}}\"],[14],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-last\"],[13],[0,\"Так как по объекту создается Presenter можно изменить свойства модального окна (см. Presenter).\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[15,\"class\",\"w-table_tr\"],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"componentName=\\\"presenter\\\" *\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"String\"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"w-table_td\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"__w-first\"],[13],[0,\"Имя компонента диалогового окна.\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"h2\",[]],[15,\"class\",\"w-subtitle\"],[15,\"name\",\"presenter\"],[13],[0,\"Presenter\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Компонент диалогового окна, создается с указанием layout и template. Его свойств могут быть получены из них и влиять на внешний вид диалогового окна. Аттрибуты компонента можно изменить или дополнить при создании, путем передачи в метод show аргумента options. Таким образом внешний вид диалогового окна может определяться при его создании, как в контроллере который запрашивает его создание, так и менеджером, который его создает. Более подробно об этом вы можете почитать на странице \"],[6,[\"link-to\"],[\"tutorial.advanced-creating-dialog\"],null,{\"statements\":[[1,[33,[\"t\"],[\"tutorial.advanced_creating_dialog\"],null],false]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"При создании диалогового окна может быть изменен `contextObject` компонента путем передачи в метод show аргумента context (см. выше). Поскольку на практике диалоговые окна создаются из actions контроллера (но не только), как правило контектом указывается сам контроллер.\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Controller\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/presenter-and-manager/controller-4.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Template: messages/foo\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/presenter-and-manager/template-4.handlebars\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Какая же разница между context и options. Все что передается в \"],[11,\"code\",[]],[13],[0,\"options\"],[14],[0,\" \\\"мержится\\\" в компонент, а \"],[11,\"code\",[]],[13],[0,\"context\"],[14],[0,\" записывается в конкретное свойство компонента. Также в \"],[11,\"code\",[]],[13],[0,\"options\"],[14],[0,\" могут быть переданы специальные названия \"],[11,\"code\",[]],[13],[0,\"actions\"],[14],[0,\", будут выполняться при закрытии диалогового окна (\"],[11,\"code\",[]],[13],[0,\"acceptHandler\"],[14],[0,\" и \"],[11,\"code\",[]],[13],[0,\"declineHandler\"],[14],[0,\"), тем самым в этих \"],[11,\"code\",[]],[13],[0,\"actions\"],[14],[0,\" можно реализовать логику по которой окно будет закрываться. Подробнее о прерывании закрытия вы можете почитать на странице \"],[6,[\"link-to\"],[\"tutorial.interrupt-closing\"],null,{\"statements\":[[1,[33,[\"t\"],[\"tutorial.interrupt_closing\"],null],false]],\"locals\":[]},null],[0,\". Здесь приведу лишь пример из которого, я надеюсь станет ясно для чего это нужно и как работает:\"],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[11,\"b\",[]],[13],[0,\"Controller\"],[14],[14],[0,\"\\n\"],[11,\"pre\",[]],[15,\"data-src\",\"examples/tutorial/presenter-and-manager/controller-5.javascript\"],[13],[14],[0,\"\\n\\n\"],[11,\"p\",[]],[13],[0,\"Узнать как работает перекрытие вы можете изучив метод \"],[11,\"a\",[]],[15,\"href\",\"docs/module-ember-dialog_services_dialog.html#-inner-show__anchor\"],[15,\"class\",\"w-link\"],[13],[0,\"show у Dialog Manager\"],[14],[0,\".\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":true}", "meta": { "moduleName": "dummy/templates/tutorial/presenter-and-manager/partials/ru.hbs" } });
});
define("dummy/utils/change-locale", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    if (Prism) {
      _ember.default.run.scheduleOnce("afterRender", Prism, function () {
        Prism.highlightAll();
        Prism.fileHighlight();
      });
    }
  };
});
define('dummy/utils/i18n/compile-template', ['exports', 'ember-i18n/utils/i18n/compile-template'], function (exports, _compileTemplate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compileTemplate.default;
    }
  });
});
define('dummy/utils/i18n/missing-message', ['exports', 'ember-i18n/utils/i18n/missing-message'], function (exports, _missingMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _missingMessage.default;
    }
  });
});
define('dummy/utils/zindex', ['exports', 'ember-dialog/utils/zindex'], function (exports, _zindex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'max', {
    enumerable: true,
    get: function () {
      return _zindex.max;
    }
  });
});


define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({"name":"ember-dialog","version":"3.1.0"});
}
//# sourceMappingURL=dummy.map
