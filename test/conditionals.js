var should = require('should');
var compileLine = require('./helpers.js').compileLine;

describe('Conditionals', function() {
  
  describe('with simple expressions', function() {
    it('should recognize if INT < INT: attack', function() {
      var result = compileLine("if 5 < 6: attack");
      should.strictEqual(result, "(function(){if(5<6){this.attack();}})\n");
    });

    it('should recognzize if ID < INT: heal', function() {
      var result = compileLine("if health < 10: heal");
      should.strictEqual(result, "(function(){if(this.health<10){this.heal();}})\n");
    });

    it('should recognize if ID < ID: heal', function() {
      var result = compileLine("if health < ammo: heal");
      should.strictEqual(result, "(function(){if(this.health<this.ammo){this.heal();}})\n");
    });
  });
});