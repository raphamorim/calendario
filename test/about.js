var assert = require('assert'),
	calendario = require('../index.js');

describe('aboutDay', function() {
	context("US • United States National", function() {
		context('- using Christmas', function() {
			it('should get data about christmas event', function(done) {
				calendario.clean();
				calendario.use('US')
				christmas = calendario.aboutDay(new Date('2015-12-25'));

				var expected = {
					date: new Date('2015-12-25 00:00:00'),
    				summary: 'Christmas Day',
    				workday: false
				}

				assert.deepEqual(typeof(christmas), 'object');
				assert.deepEqual(christmas.length, 1);
				assert.deepEqual(christmas[0], expected)
				done();
			});
		});
	});
	context('BR • Brazil National', function() {
		context('- using Christmas', function() {
			it('should get data about christmas event', function(done) {
				calendario.clean();
				calendario.use('BR')
				christmas = calendario.aboutDay(new Date('2015-12-25'));

				var expected = {
					date: new Date('2015-12-25 00:00:00'),
    				summary: 'Christmas Day',
    				workday: false
				}

				assert.deepEqual(typeof(christmas), 'object');
				assert.deepEqual(christmas.length, 1);
				assert.deepEqual(christmas[0], expected)
				done();
			});
		});
	});
});
