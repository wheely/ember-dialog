/*jshint node:true*/
module.exports = {
  scenarios: [
    {
      name: "default",
      dependencies: { }
    },
    {
      name: "ember-release",
      dependencies: {
        ember: "components/ember#release"
      },
      resolutions: {
        ember: "release"
      }
    },
    {
      name: "ember-beta",
      dependencies: {
        ember: "components/ember#beta"
      },
      resolutions: {
        ember: "beta"
      }
    }
  ]
};
