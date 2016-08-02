// The `dialog/confirm` - predefined layout template
// The `messages/hello` - template that you'd like to show.
// Notice: this template should be found in your project by path `app/templates/messages/hello`
const layoutName = "dialog/confirm";
const templateName = "messages/hello";

const promise = this.get("dialog").show(layoutName, templateName);

const yes = () => { console.log(`yes pressed`); };
const no = () => { console.log(`no pressed`); };

promise.then(yes, no);
