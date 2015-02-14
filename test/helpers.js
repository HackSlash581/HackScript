var exports = module.exports = {};
var hackScript = require('../lib/hackScript.js');

exports.compileLine = function(input) {
  var file = "test";
  var output = hackScript.compile(input, {
    originalFilename: file
  }).toStringWithSourceMap({
    file: file.replace(/\.[\w]+$/, ".js.map")
  });

  return output.code;
};