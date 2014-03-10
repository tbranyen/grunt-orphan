var Promise = require("promise");

var args = function(args) { return args.split(" "); };

module.exports = function(shell, options) {
  var exports = {};

  exports.source = Promise.denodeify(function(callback) {
    shell("git", args("rev-parse --abbrev-ref HEAD")).then(function(command) {
      var source = command.stdout;
      
      // Set the source branch onto the options object.
      options.source = source;

      // Resolve that value.
      callback(null, source);
    });
  });

  // Checkout new orphan or switch to the existing orphan.
  exports.target = Promise.denodeify(function(err, callback) {
    var target = options.branch;

    // Attempt to create a new orphan.
    var create = shell("git", args("checkout --orphan " + target));

    // If the branch is newly created, must remove all files from the working
    // head.
    create.then(function() {
      shell("git", args("rm -rf --cached ."))
        .then(callback.bind(null, null), callback.bind(null));
    },

    // If the branch already exists, attempt to set the symbolic reference.
    function() {
      shell("git", args("symbolic-ref HEAD refs/heads/" + target))
        .then(callback.bind(null, null), callback.bind(null));
    });
  });

  // Add files to the release.
  exports.add = Promise.denodeify(function(err, callback) {
    var counter = options.files.length;

    var adds = options.files.map(function(file) {
      return shell("git", ["add", "-f", file]).then(function() {
        counter -= 1; 

        if (!counter) {
          callback(null, file);
        }
      });
    });
  });

  // Commit the release.
  exports.commit = Promise.denodeify(function(err, callback) {
    shell("git", args("commit -m").concat([options.commit]))
      .then(callback.bind(null, null), callback.bind(null));
  });

  // Tag the release.
  exports.tag = Promise.denodeify(function(err, callback) {
    shell("git", args("tag -f " + options.tag))
      .then(callback.bind(null, null), callback.bind(null));
  });

  // Return to the original branch.
  exports.clean = Promise.denodeify(function(err, callback) {
    shell("git", args("checkout -f " + options.source))
      .then(callback.bind(null, null), callback.bind(null));
  });

  return exports;
};
