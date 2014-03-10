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
          "package.json",
          "node_modules"
        ],

        tag: "<%= pkg.version %>",
        
        commit: "Version <%= pkg.version %>"
      },

      default: {}
    }
  });

  this.registerTask("default", ["release"]);
};
