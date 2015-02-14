var should = require('should');
var compileLine = require('./helpers.js').compileLine;

describe('Conditionals', function() {
  
  describe('with simple expressions', function() {
    it('should recognize if INT < INT: attack', function() {
      var result = compileLine("if 5 < 6: attack");
      should.strictEqual(result, "if(5 < 6) {\n  attack();\n}\n");
    })

    it('should recognzize if ID < INT: attack', function() {
      var result = compileLine("if range < 10: attack");
      should.strictEqual(result, "if(range < 10) {\n  attack();\n}\n");
    })
  })
})