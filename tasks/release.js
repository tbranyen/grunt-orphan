/*
 * grunt-release
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Tim Branyen, StackDriver
 * Licensed under the MIT license.
 */

"use strict";

var Promise = require("promise");

module.exports = function(grunt) {

  var spawn = Promise.denodeify(grunt.util.spawn, 2);
  var args = function(args) { return args.split(" "); };

  // Checkout or switch to the orphan branch.
  function checkout() {
    return Promise(function(resolve, reject) {
      console.log("1");
      resolve();
    });
  }

  // Checkout or switch to the orphan branch.
  function add() {
    return Promise(function(resolve, reject) {
      console.log("2");
      resolve();
    });
  }

  // Checkout or switch to the orphan branch.
  function commit() {
    return Promise(function(resolve, reject) {
      console.log("3");
      resolve();
    });
  }

  // Checkout or switch to the orphan branch.
  function tag() {
    return Promise(function(resolve, reject) {
      console.log("4");
      resolve();
    });
  }

  // Checkout or switch to the orphan branch.
  function clean() {
    return Promise(function(resolve, reject) {
      console.log("5");
      resolve();
    });
  }

  grunt.registerMultiTask("release", "Commit and tag to orphan branch.", function() {
    var options = this.options({
      branch: "release" 
    });

    var done = this.async();

    var currentBranch = spawn({
      cmd: "git", args: args("rev-parse --abbrev-ref HEAD")
    });

    // Take the current branch and continue.
    currentBranch.then(function(source) {
      console.log(source);

      return checkout()
        .then(add())
        .then(commit())
        .then(tag())
        .then(clean())
        .then(function() {
          done();
        });
    }, function() {
      console.log(arguments); 
    });
  });
};
