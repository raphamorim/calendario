var assert = require('assert'),
	calendario = require('../../index.js');

describe('isWorkday()', function() {
	context("Valid Input", function() {
		context("US • United States National", function() {
			context('- using Thanksgiving Day', function() {
				it('should get false', function(done) {
					calendario.clear();
					calendario.use('US');
					var thanksgiving = calendario.isWorkday(new Date('2015-11-26 10:00'));

					assert.equal(thanksgiving, false);
					done();
				});
			});
			context('- using Christmas', function() {
				it('should get false', function(done) {
					calendario.clear();
					calendario.use('US');
					var christmas = calendario.isWorkday(new Date('2015-12-25 23:00'));

					assert.equal(christmas, false);
					done();
				});
			});
			context('- using a Workday', function() {
				it('should get true', function(done) {
					calendario.clear();
					calendario.use('US');
					var workday = calendario.isWorkday(new Date('2015-10-05 05:00'));

					assert.equal(workday, true);
					done();
				});
			});
		});
		context('BR • Brazil National', function() {
			context('- using Independence Day', function() {
				it('should get false', function(done) {
					calendario.clear();
					calendario.use('BR');
					var independence = calendario.isWorkday(new Date('2015-09-07 10:00'));

					assert.equal(independence, false);
					done();
				});
			});
			context('- using Christmas', function() {
				it('should get false', function(done) {
					calendario.clear();
					calendario.use('BR');
					var christmas = calendario.isWorkday(new Date('2015-12-25 12:00'));

					assert.equal(christmas, false);
					done();
				});
			});
			context('- using a Workday date', function() {
				it('should get true', function(done) {
					calendario.clear();
					calendario.use('BR');
					var workday = calendario.isWorkday(new Date('2015-10-05 15:00'));

					assert.equal(workday, true);
					done();
				});
			});
		});
	});
});