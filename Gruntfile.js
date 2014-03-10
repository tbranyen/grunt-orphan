module.exports = function() {
  this.loadTasks("tasks");

  this.initConfig({
    pkg: this.file.readJSON("package.json"),

    release: {
      options: {
        branch: "release",

        files: [
          "lib",
          "tasks",
          "package.json"
        ],

        tag: "<%= pkg.version %>",
        
        commit: "Version <%= pkg.version %> release."
      },

      default: {}
    }
  });

  this.registerTask("default", ["release"]);
};
