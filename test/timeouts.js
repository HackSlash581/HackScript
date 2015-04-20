var should = require('should');
var compileLine = require('./helpers.js').compileLine;

describe('Timeouts', function() {
  describe('basic timeout', function() {
    it('should recognize timeout with function as ID', function() {
      var result = compileLine("every 2000: attack");
      should.strictEqual(result, "(function(){setInterval(function(){this.attack();},2000);})\n");
    });

    it('should recognize timeout with function as propertychain', function() {
      var result = compileLine("every 2000: player.attack");
      should.strictEqual(result, "(function(){setInterval(function(){this.player.attack();},2000);})\n");
    });
  });
});