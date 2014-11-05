var sourceMap = require("source-map");
var SourceNode = sourceMap.SourceNode;

var AstNode = function (line, column) {
  this._line = line;
  this._column = column;
};

AstNode.prototype.compile = function(data) {
  throw new Error("Not Yet Implemented");
};

AstNode.prototype.compileReference = function(data) {
  return this.compile(data);
};

AstNode.prototype._sn = function(originalFilename, chunk) {
  return new SourceNode(this._line, this._column, originalFilename, chunk);
};

exports.Timer = function(line, column, callback) {
  AstNode.call(this, line, column);
  this._callback = callback;
};

exports.Timer.prototype = Object.create(AstNode.prototype);

exports.IfStatement = function(line, column, test, stmt) {
  AstNode.call(this, line, column);
  this._test = test;
  this._stmt = stmt;
};

exports.IfStatement.prototype = Object.create(AstNode.prototype);

exports.Identifier = function(line, column, name) {
  AstNode.call(this, line, column);
  this._name = name;
};

exports.Identifier.prototype = Object.create(AstNode.prototype);

exports.Assignment = function(line, column, name, newVal) {
  AstNode.call(this, line, column);
  this._name = name;
  this._newVal = newVal;
};

exports.Assignment.prototype = Object.create(AstNode.prototype);

exports.StringNode = function(line, column, text) {
  AstNode.call(this, line, column);
  this._text = text;
};

exports.StringNode.prototype = Object.create(AstNode.prototype);

exports.Number = function(line, column, value) {
  AstNode.call(this, line, column);
  this._value = Number(value);
};

exports.Number.prototype = Object.create(AstNode.prototype);

exports.Expression = function(line, column, left, right, op) {
  AstNode.call(this, line, column);
  this._left = left;
  this._right = right;
  this._op = op;
};

exports.Expression.prototype = Object.create(AstNode.prototype);

exports.Operator = function(line, column, text) {
  AstNode.call(this, line, column);
  this._text = text;
};

exports.Operator.prototype = Object.create(AstNode.prototype);
