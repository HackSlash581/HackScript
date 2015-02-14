var should = require('should');
var compileLine = require('./helpers.js').compileLine;

describe('Assignment', function() {

  describe('with single ID', function() {
    it('should recognize ID: INT', function() {
      var result = compileLine("life: 20");
      should.strictEqual(result, "var life = 20;\n");
    })

    it('should recognize ID: STRVAL', function() {
      var result = compileLine('name: "Peg Pelvis Pete"');
      should.strictEqual(result, 'var name = "Peg Pelvis Pete";\n');
    })

    it('should recognize ID: ID', function() {
      var result = compileLine("attack: fireMagic");
      should.strictEqual(result, "var attack = fireMagic;\n");
    })

    it('should not recognize INT on LHS', function() {
      (function() {
        try{
          compileLine("20: myHealth");
        } catch (err) {
          throw(err);
        }
      }).should.throw;
    })

    it('should not recognize STRVAL on LHS', function() {
      (function() {
        try{
          compileLine('"player": "player2"');
        } catch(err) {
          throw(err);
        }
      }).should.throw;
    })
  })

  describe('with propertychain', function() {
    it('should recognize ID.ID: INT', function() {
      var result = compileLine("player.life: 100");
      should.strictEqual(result, "var player.life = 100;\n");
    })

    it('should recognize ID.ID.ID: INT', function() {
      var result = compileLine("player.attack.power: 15");
      should.strictEqual(result, "var player.attack.power = 15;\n");
    })

    it('should recognize ID.ID: ID.ID', function() {
      var result = compileLine("player.name: enemy.name");
      should.strictEqual(result, "var player.name = enemy.name;\n");
    })
  })
})