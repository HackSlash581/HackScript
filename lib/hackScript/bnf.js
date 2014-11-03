exports.bnf = {
  start: [
    ['script EOF', "return $$;"]
  ],

  script: [
    ["'EVERY' 'INT' ':' propertychain", ],
    ["'IF' expr ':' ifbody", "new IfStatementNode($2, $4, null, createSourceLocation(null, @1, @5));"],
    ["assignment", "$$ = [$1]"]
  ],

  ifbody: [
    ["assignment", "$$ = [$1]"],
    ["propertychain", "$$ = [$1]"]
  ],

  assignment: [
    ["propertychain ':' newprop", "$$ = {key: $1, value: $3, kind: 'init'};"]
  ]
};