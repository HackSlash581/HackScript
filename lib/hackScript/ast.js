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
exports.Timer.prototype.compile = function(data) {
  var output = this._sn(data.originalFilename, "");

  return output
    .add(["setTimeout(function() {\n"])
    .add(this._callback.compile(data))
    .add(["();\n};\n"]);
};

exports.IfStatement = function(line, column, test, stmt) {
  AstNode.call(this, line, column);
  this._test = test;
  this._stmt = stmt;
};
exports.IfStatement.prototype = Object.create(AstNode.prototype);
exports.IfStatement.prototype.compile = function(data) {
  var output = this._sn(data.originalFilename, "");

  return output
    .add(["if "])
    .add(this._test.compile(data))
    .add([': '])
    .add(this._stmt.compile(data))
    .add(['\n']);
};

exports.Identifier = function(line, column, name) {
  AstNode.call(this, line, column);
  this._name = name;
};
exports.Identifier.prototype = Object.create(AstNode.prototype);
exports.Identifier.prototype.compile = function(data) {
  return this._sn(data.originalFilename, this._name);
};

exports.Assignment = function(line, column, name, newVal) {
  AstNode.call(this, line, column);
  this._name = name;
  this._newVal = newVal;
};
exports.Assignment.prototype = Object.create(AstNode.prototype);
exports.Assignment.prototype.compileReference = function(data) {
  return this._sn(data.originalFilename, "'" + this._name + "'");
};
exports.Assignment.prototype.compile = function(data) {
  var output = this._sn(data.originalFilename, "");

  return output
    .add(["var "])
    .add(this._name.compileReference(data))
    .add([" = "])
    .add(this._newVal.compile(data))
    .add([";\n"]);
};

exports.StringNode = function(line, column, text) {
  AstNode.call(this, line, column);
  this._text = text;
};
exports.StringNode.prototype = Object.create(AstNode.prototype);
exports.StringNode.prototype.compile = function(data) {
  return this._sn(data.originalFilename, this._text);
};

exports.Number = function(line, column, value) {
  AstNode.call(this, line, column);
  this._value = Number(value);
};
exports.Number.prototype = Object.create(AstNode.prototype);
exports.Number.prototype.compile = function(data) {
  return this._sn(data.originalFilename, this._value.toString());
};

exports.Expression = function(line, column, left, right, op) {
  AstNode.call(this, line, column);
  this._left = left;
  this._right = right;
  this._op = op;
};
exports.Expression.prototype = Object.create(AstNode.prototype);
exports.Expression.prototype.compile = function(data) {
  var output = this._sn(data.originalFilename, "");

  return output
    .add(this._left.compile(data))
    .add(this._op.compile(data))
    .add(this._right.compile(data));
};

exports.Operator = function(line, column, text) {
  AstNode.call(this, line, column);
  this._symbol = symbol;
};
exports.Operator.prototype = Object.create(AstNode.prototype);
exports.Operator.prototype.compile = function(data) {
  return this._sn(data.originalFilename, this._symbol);
};