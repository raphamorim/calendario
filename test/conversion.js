var assert = require('assert'),
	Calendario = require('../index.js');

describe('Methods', function() {
	context('isWorkday', function() {
		context('using a workday date', function() {
			it('should get true', function(done) {
				var calendario = Calendario.isWorkday(new Date());

				assert.equal(typeof calendario, true);
				done();
			});
		});
	});
});
