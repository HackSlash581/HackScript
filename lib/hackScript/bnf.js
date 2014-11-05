exports.bnf = {
  start: [
    ['script EOF', "return $$;"]
  ],

  script: [
    ["'EVERY' 'INT' ':' propertychain", "$$ = new yy.Timer(@1.first_line, @1.first_column, $4);"],
    ["'IF' expr ':' ifbody", "$$ = new yy.IfStatement(@1.first_line, @1.first_column, $2, $4);"],
    ["assignment", "$$ = $1;"]
  ],

  ifbody: [
    ["assignment", "$$ = $1;"],
    ["propertychain", "$$ = $1;"]
  ],

  propertychain: [
    ["propertychain '.' 'ID'", "$$ = $1 + '.' + $3;"],
    ["'ID'", "$$ = new yy.Identifier(@1.first_line, @1.first_column, yytext);"]
  ],

  ifbody: [
    ["assignment", "$$ = $1;"],
    ["propertychain", "$$ = $1;"]
  ],

  assignment: [
    ["propertychain ':' newprop", "$$ = new yy.Assignment(@1.first_line, @1.first_column, $1, $3);"]
  ],

  newprop: [
    ["'STRVAL'", "$$ = new yy.StringNode(@1.first_line, @1.first_column, yytext);"],
    ["'INT'", "$$ = new yy.Number(@1.first_line, @1.first_column, yytext);"],
    ["propertychain", "$$ = $1;"]
  ],

  expr: [
    ["side comparison side", "$$ = new yy.Expression(@2.first_line, @2.first_column, $1, $3);"]
  ],

  side: [
    ["propertychain", "$$ = $1;"],
    ["'INT'", "$$ = new yy.Number(@1.first_line, @1.first_column, yytext);"]
  ],

  comparison: [
    ["'='", ";"],
    ["'>'", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"],
    ["'<'", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"],
    ["'>='", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"],
    ["'<='", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"]
  ]
};