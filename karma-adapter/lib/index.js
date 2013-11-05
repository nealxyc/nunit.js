var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initJasmine = function(files) {
	var NUnit = require("../nunit.js");
	var runner = new NUnit.TestRunner();
	// runner.appenders.push();
	runner.run(require("./test-karma.js?t=" + Date.now()));
};

initJasmine.$inject = ['config.files'];

module.exports = {
  'framework:nunit': ['factory', initJasmine]
};