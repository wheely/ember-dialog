# ember-dialog

## About

An Ember Addon that able you to easily create dialog windows and control their closing.

![](http://dl2.joxi.net/drive/2016/07/14/0007/2363/473403/03/5f20c42c19.png)

Состоих из сервиса, который доступен из любого объекта и из компонента который представляет само модальное окно.

Принцип работы простой. Сервис получает команду показать модальное окно (show, alert, confirm или blank), по которой создает экземпляр класса компонента с нужными layout и template, рендерит его и крепит к body. В этот момент им также создается Promise, "ручки" которого кладутся в объект компонента. Промис возвращается. Объект компонента имеет на борту 2а экшена: одно для "успешного закрытия" - accept, другое для "неуспешного" - decline. Экшены доступны внутри шаблона и могут быть вызваны, скажем по клику на кнопку (layout или template). При вызове action выполняется один из методов промиса и отстреливается независимое событие "accepted" или "declined", слушая которые диалоговый сервис уничтожает объект - он открепляется от DOM.

Для пользователя сервис работает следующим образом. Скажем нужно пользователю показать предупреждение. Для этого вызывается метод диалогового сервиса "show", с указанием пути до лейаута (нам нужно с одной кнопкой, т.е. alert, об этом подробнее ниже) и путем до шаблона который надо показать в модальном окне. Метод создает и показывает диалоговое окно и возвращает Promise, который станет зарезолвленным или зарежекченным по закрытию диалогового окна, в зависимости от того какую кнопку нажал пользователь. В общем все довольно просто.

```javascript
// The `dialog/alert` is predefined layout template (with only "accept" button)
// The `messages/hello` is template that you'd like to show.
// Notice: this template should be found in your project by path `app/templates/messages/hello`
const layoutName = "dialog/alert";
const templateName = "messages/hello";
const promise = this.get("dialog").show(layoutName, templateName);
promise.then(() => {
  console.log(`Message shown`);
});
```

## Installation

Installing the library is as easy as:

```shell
ember install ember-dialog
```

## Dialog types (predefined layouts)

На борту ember-dialog есть следующие лейауты: `alert`, `confirm` and `blank`.

### Alert

Этот лейаут имеет лишь одну кнопку "yes", которая с успехом закрывает модальное окно. Также имеется крестик для закрытия, по нажатию на который окно также зыкрывается с успехом. Т.е. промис объект этого диалогового окна резолвится при его закрытии. Может использоваться для показа пользователю какой-то информации. Подробнее можете прочитать [в документации](http://ajile.github.io/ember-dialog/module-ember-dialog_services_dialog.html#-inner-alert__anchor).

### Confirm

На практике наиболее используемый лейаут. Имеет на борту 2-е кнопки, которые закрывают модальное окно. Одна кнопка закрывает окно с успехом, другая с режектом. Также имеется крестик закрытия - он закрывает модальное окно с режектом (по понятным причинам). Подробнее можете прочитать [в документации](http://ajile.github.io/ember-dialog/module-ember-dialog_services_dialog.html#-inner-confirm__anchor).

### Blank

Самый простой лейаут модального окна. У него нет ни кнопок, ни крестика...в общем ничего. Может быть использован для показа пользователя кастомного интерфейса с собственной логикой отображения элементов закрытия окна. На практике часто используется для отображения различных форм, который на событие onsubmit шлют запрос на его закрытие. Удобно использовать в связке с формами ember-validation (usecase появится позже). Подробнее можете прочитать [в документации](http://ajile.github.io/ember-dialog/module-ember-dialog_services_dialog.html#-inner-blank__anchor).

## Styles

TBD

## Usage

### Showing user a simple message

```javascript
export default Ember.Controller({

  showDialog() {
    // Will be used `app/templates/error-message.hbs`
    this.get("dialog").alert("error-message");
  }

});
```


### Showing user a simple message to confirm action

```javascript
export default Ember.Controller({

  showDialog() {

    const yes = () => { console.log("Yes"); };
    const no = () => { console.log("No"); };

    // Will be used `app/templates/messages/are-you-sure.hbs`
    this.get("dialog").confirm("messages/are-you-sure").then(yes, no);

  }

});
```


### Binding data in the dialog

Controller:
```javascript
export default Ember.Controller({

  now: now Date(),

  model: { username: "ajile" },

  showDialog() {

    // Will be used `app/templates/messages/hello.hbs`
    this.get("dialog").alert("messages/hello", this);

  }

});
```

Template `messages/hello.hbs`:
```handlebar
<div>Hello, {{contextObject.model.username}}! Now: {{contextObject.now}}. Click <button onclick={{action "accept"}}>the button</button> to close the dialog.</div>
```


### Interrupt closing of the dialog window

```javascript
export default Ember.Controller({

  count: 0,

  showDialog() {
    // Will be used `app/templates/messages/click-counter.hbs`
    this.get("dialog").alert("messages/click-counter", null, {
      acceptHandler: "yesHandler"
    });
  },

  actions: {
    yesHandler(presenter) {
      const count = this.get("count");
      if (count < 5) {
        console.log("Count less then five");
        this.set("count", ++count);
      } else {
        presenter.accept();
      }
    }
  }

});
```

### Manual closing dialog window

```javascript
export default Ember.Controller({

  showDialog() {

    // Any created dialog will be closed in 1s
    this.get("dialog").on("created", (presenter) => {
      Ember.run.later(presenter, presenter.accept, 1000);
    });

    // Will be used `app/templates/messages/something.hbs`
    this.get("dialog").alert("messages/something");

  }

});
```

### Creating new layouts

Controller:

```javascript
export default Ember.Controller({

  showDialog() {
    // Will be used `app/templates/dialog-layouts/delete.hbs` as layout and
    // `app/templates/messages/are-you-sure.hbs` as template.
    this.get("dialog").show("dialog-layouts/delete", "messages/delete-user");
  }

});
```

Template `dialog-layouts/delete.hbs`:
```handlebar
<h1 style="color: #F00;">Confirm Deletion</h1>
<div class="body">
  {{yield}}
</div>
<button class="danger" onclick={{action "accept"}}>DELETE!</button>
<button onclick={{action "decline"}}>Cancel</button>
```

Template `messages/delete-user.hbs`:
```handlebar
Really?
```

The result:
```html
<h1 style="color: #F00;">Confirm Deletion</h1>
<div class="body">
  Really?
</div>
<button class="danger" onclick="function(){...}">DELETE!</button>
<button onclick="function(){...}">Cancel</button>
```

### Extend dialog manager

Execute `ember g service dialog`.

File `app/services/dialog.js`:
```javascript
import Dialog from "ember-dialog/services/dialog";

export default Dialog.extend({

  confirmDelete() {
    const args = Array.prototype.slice.apply(arguments);
    args.unshift("dialog-layouts/delete");
    this.show(...args);
  }

});
```

