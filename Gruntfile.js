module.exports = function() {
  this.loadTasks("tasks");

  this.initConfig({
    release: {
      branch: "release"
    }
  });

  this.registerTask("default", ["release"]);
};
