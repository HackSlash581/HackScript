var jison = require("jison");
var sourceMap = require("source-map");
var lex = require("./hackScript/lex").lex;
var bnf = require("./hackScript/bnf").bnf;

var parser = new jison.Parser({
  lex: lex,
  bnf: bnf
});

parser.yy = require("./hackScript/ast");

exports.compile = function(input, data) {
  debugger;
  var expressions = parser.parse(input.toString());
  var result = new sourceMap.SourceNode(null, null, null, null);
  result.add(expressions.map(function(exp) {
    return exp.compile(data);
  }));
  return result;
};
