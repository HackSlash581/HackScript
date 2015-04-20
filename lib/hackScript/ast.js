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

exports.Timer = function(line, column, callback, milliseconds) {
  AstNode.call(this, line, column);
  this._callback = callback;
  this._millis = milliseconds;
};
exports.Timer.prototype = Object.create(AstNode.prototype);
exports.Timer.prototype.compile = function(data) {
  var output = this._sn(data.originalFilename, "");

  return output
    .add(['(function(){'])
    .add(["setInterval(function(){this."])
    .add(this._callback.compile(data))
    .add(["();},"])
    .add(this._millis)
    .add([");})\n"]);
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
    .add(['(function(){'])
    .add(["if("])
    .add(this._test.compile(data))
    .add(['){this.'])
    .add(this._stmt.compile(data))
    .add(['();})\n']);
};

exports.PropertyChain = function(line, column, obj, prop) {
  AstNode.call(this, line, column);
  this._name = obj;
  this._next = prop;
};
exports.PropertyChain.prototype = Object.create(AstNode.prototype);
exports.PropertyChain.prototype.compile = function(data) {
  var output = this._sn(data.originalFilename, "");
  
  return output
    .add(this._name.compile(data))
    .add(['.'])
    .add(this._next);
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
  return this._sn(data.originalFilename, this._name);
};
exports.Assignment.prototype.compile = function(data) {
  var output = this._sn(data.originalFilename, "");
  
  return output
    .add(["(function(){ this."])
    .add(this._name.compileReference(data))
    .add([" = "])
    .add(this._newVal.compile(data))
    .add(["; })\n"]);
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
  this._op = op._symbol;
};
exports.Expression.prototype = Object.create(AstNode.prototype);
exports.Expression.prototype.compile = function(data) {
  var output = this._sn(data.originalFilename, "");
  var number_regex = /[0-9]+/;

  var type = typeof this._left;

  //TODO: implement with switch
  
  if(this._left.match(number_regex) && this._right.match(number_regex)) {
    return output
    .add(this._left)
    .add(this._op)
    .add(this._right);
  }
  else if(typeof this._left === 'string') {
    if(this._right.match(number_regex)) {
      return output
        .add(["this."])
        .add(this._left.compile(data))
        .add(this._op)
        .add(this._right);
    } else {
      return output
        .add(["this."])
        .add(this._left.compile(data))
        .add(this._op)
        .add(["this."])
        .add(this._right.compile(data));
    }
  }
};

exports.Operator = function(line, column, symbol) {
  AstNode.call(this, line, column);
  this._symbol = symbol;
};
exports.Operator.prototype = Object.create(AstNode.prototype);
exports.Operator.prototype.compile = function(data) {
  return this._sn(data.originalFilename, this._symbol);
};