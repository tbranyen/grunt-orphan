/*
 * grunt-release
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Tim Branyen, StackDriver
 * Licensed under the MIT license.
 */

"use strict";

var Promise = require("promise");
var Git = require("../lib/git");

module.exports = function(grunt) {
  var spawn = Promise.denodeify(grunt.util.spawn, 2);

  function shell(command, args) {
    console.log(command, args);
    return spawn({ cmd: command, args: args });
  }

  grunt.registerMultiTask("release", "Release to orphan branch.", function() {
    var options = this.options({});
    var done = this.async();

    // Scope all methods to this shell and options.
    var git = Git(shell, options);

    // Using the Git methods, execute this task.
    git
      .source()
      .then(git.target)
      .then(git.add)
      .then(git.commit)
      .then(git.tag)
      .then(git.clean)
      .then(done);
  });
};
