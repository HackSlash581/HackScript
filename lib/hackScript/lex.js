exports.lex = {
  rules: [
    ["\\s+",                      "/* ignore whitespace */"],
    ["if",                        'return "IF";'],
    ["every",                     'return "EVERY";'],
    ["[a-zA-Z][a-zA-Z0-9_]*",     'return "ID";'],
    ["[1-9][0-9]*",               'return "INT";'],
    ["[0-9](\\.[0-9]+)?",         'return "FLOAT";'],
    ["\\:",                         'return ":";'],
    ["\\.",                         'return ".";'],
    ["=",                         'return "=";'],
    ["\\+",                         'return "+";'],
    ["\\-",                         'return "-";'],
    ["\\*",                         'return "*";'],
    ["\\/",                         'return "/";'],
    [">",                         'return ">";'],
    ["<",                         'return "<";'],
    [">=",                        'return ">=";'],
    ["<=",                        'return "<=";'],
    ['\\".*\\"',                  'return "STRVAL";']
  ]
};