var AstNode = function (line, column) {
  this._line = line;
  this._column = column;
};

exports.createSourceLocation = function(source, firstToken, lastToken) {
  return new SourceLocation(
    source, 
    new Position(
      firstToken.first_line,
      firstToken.first_column
    ),
    new Position(
      lastToken.last_line, lastToken.last_column
    )
  );
};

exports.IfStatementNode = function(test, consequent, alternate, loc) {
  this.type = "IfStatement";
  this.test = test;
  this.consequent = consequent;
  this.alternate = alternate;
  this.loc = loc;
};

exports.SourceLocation = function(source, start, end) {
  this.source = source;
  this.start = start;
  this.end = end;
};

exports.Position = function(line, column) {
  this.line = line;
  this.column = column;
};