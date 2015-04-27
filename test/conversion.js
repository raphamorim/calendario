var assert = require('assert'),
	Calendario = require('../index.js');

describe('Methods', function() {
	context('isWorkday()', function() {
		context('United States National Holidays', function() {
			context('- using Thanksgiving Day', function() {
				it('should get false', function(done) {
					var calendario = new Calendario('EN-USA'),
						thanksgiving = calendario.isWorkday(new Date('2015-11-26 10:00'));

					assert.equal(thanksgiving, false);
					done();
				});
			});
			context('- using Christmas', function() {
				it('should get false', function(done) {
					var calendario = new Calendario('EN-USA'),
						christmas = calendario.isWorkday(new Date('2015-12-25 03:00'));

					assert.equal(christmas, false);
					done();
				});
			});
			context('- using a Workday', function() {
				it('should get true', function(done) {
					var calendario = new Calendario('EN-USA'),
						workday = calendario.isWorkday(new Date('2015-10-05 05:00'));

					assert.equal(workday, true);
					done();
				});
			});
		});
		context('Brazil National Holidays', function() {
			context('- using Independence Day', function() {
				it('should get false', function(done) {
					var calendario = new Calendario('EN-USA'),
						independence = calendario.isWorkday(new Date('2015-09-07 10:00'));

					assert.equal(independence, false);
					done();
				});
			});
			context('- using Christmas', function() {
				it('should get false', function(done) {
					var calendario = new Calendario('EN-USA'),
						christmas = calendario.isWorkday(new Date('2015-12-25 12:00'));

					assert.equal(christmas, false);
					done();
				});
			});
			context('- using a Workday date', function() {
				it('should get true', function(done) {
					var calendario = new Calendario('EN-USA'),
						workday = calendario.isWorkday(new Date('2015-10-05 15:00'));

					assert.equal(workday, true);
					done();
				});
			});
		});
	});
	context('range()', function() {

	});
});
