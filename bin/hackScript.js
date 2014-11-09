#!/usr/bin/env node
var fs = require("fs");
var hackScript = require("../lib/hackScript");

process.argv.slice(2).forEach(function(file) {
	var input = fs.readFileSync(file);
  var output = hackScript.compile(input, {
    originalFilename: file
  }).toStringWithSourceMap({
    file: file.replace(/\.[\w]+$/, ".js.map")
  });
  var sourceMapFile = file.replace(/\.[\w]+$/, ".js.map");
  fs.writeFileSync(file.replace(/\.[\w]+$/, ".js"),
    output.code + "\n//# sourceMappingURL=" + sourceMapFile + '\n');
  fs.writeFileSync(sourceMapFile, output.map);
});