exports.bnf = {
  start: [
    ['script', "return $$;"]
  ],

  script: [
    ["", "$$ = [];"],
    ["line script", "$$ = [$1].concat($2);"]
  ],

  line: [
    ["EVERY INT : propertychain", "$$ = new yy.Timer(@1.first_line, @1.first_column, $4, $2);"],
    ["IF expr : ifbody", "$$ = new yy.IfStatement(@1.first_line, @1.first_column, $2, $4);"],
    ["assignment", "$$ = $1;"]
  ],

  ifbody: [
    ["assignment", "$$ = $1;"],
    ["propertychain", "$$ = $1;"]
  ],

  propertychain: [
    ["propertychain . ID", "$$ = $1 + '.' + $3;"],
    ["ID", "$$ = new yy.Identifier(@1.first_line, @1.first_column, yytext);"]
  ],

  ifbody: [
    ["assignment", "$$ = $1;"],
    ["propertychain", "$$ = $1;"]
  ],

  assignment: [
    ["propertychain : newprop", "$$ = new yy.Assignment(@1.first_line, @1.first_column, $1, $3);"]
  ],

  newprop: [
    ["STRVAL", "$$ = new yy.StringNode(@1.first_line, @1.first_column, yytext);"],
    ["INT", "$$ = new yy.Number(@1.first_line, @1.first_column, yytext);"],
    ["propertychain", "$$ = $1;"]
  ],

  expr: [
    ["propertychain comparison INT", "$$ = new yy.Expression(@2.first_line, @2.first_column, $1, $3, $2);"],
    ["propertychain comparison propertychain", "$$ = new yy.Expression(@2.first_line, @2.first_column, $1, $3, $2);"],
    ["INT comparison propertychain", "$$ = new yy.Expression(@2.first_line, @2.first_column, $1, $3, $2);"],
    ["INT comparison INT", "$$ = new yy.Expression(@2.first_line, @2.first_column, $1, $3, $2);"]
  ],

  comparison: [
    ["=", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"],
    [">", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"],
    ["<", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"],
    [">=", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"],
    ["<=", "$$ = new yy.Operator(@1.first_line, @1.first_column, yytext);"]
  ]
};