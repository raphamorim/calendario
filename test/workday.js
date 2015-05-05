var assert = require('assert'),
	calendario = require('../index.js');

describe('isWorkday', function() {
	context("US • United States National", function() {
		context('- using Thanksgiving Day', function() {
			it('should get false', function(done) {
				calendario.clean();
				calendario.use('US'),
				thanksgiving = calendario.isWorkday(new Date('2015-11-26 10:00'));

				assert.equal(thanksgiving, false);
				done();
			});
		});
		context('- using Christmas', function() {
			it('should get false', function(done) {
				calendario.clean();
				calendario.use('US')
				christmas = calendario.isWorkday(new Date('2015-12-25 23:00'));

				assert.equal(christmas, false);
				done();
			});
		});
		context('- using a Workday', function() {
			it('should get true', function(done) {
				calendario.clean();
				calendario.use('US')
				workday = calendario.isWorkday(new Date('2015-10-05 05:00'));

				assert.equal(workday, true);
				done();
			});
		});
	});
	context('BR • Brazil National', function() {
		context('- using Independence Day', function() {
			it('should get false', function(done) {
				calendario.clean();
				calendario.use('BR')
				independence = calendario.isWorkday(new Date('2015-09-07 10:00'));

				assert.equal(independence, false);
				done();
			});
		});
		context('- using Christmas', function() {
			it('should get false', function(done) {
				calendario.clean();
				calendario.use('BR')
				christmas = calendario.isWorkday(new Date('2015-12-25 12:00'));

				assert.equal(christmas, false);
				done();
			});
		});
		context('- using a Workday date', function() {
			it('should get true', function(done) {
				calendario.clean();
				calendario.use('BR')
				workday = calendario.isWorkday(new Date('2015-10-05 15:00'));

				assert.equal(workday, true);
				done();
			});
		});
	});
});
