/* global setInterval */
import Ember from "ember";

export default Ember.Controller.extend({

  seconds: 0,

  username: "Vladimir Milkov",

  startTimer: Ember.on("init", function() {
    setInterval(() => {
      this.incrementProperty("seconds");
    },1000);
  }),

  actions: {
    showGreeting() {
      this.get("dialog").show("examples/dialog/information", "examples/messages/greeting", this);
    },
    showNickname() {
      this.set("username", "ajile");
    },
    showPartial1() {
      this.get("dialog").alert("tutorial/presenter-and-manager/partials/partial-1", this);
    }
  }

});
