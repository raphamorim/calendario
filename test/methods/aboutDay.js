var assert = require('assert'),
	calendario = require('../../index.js');

describe('aboutDay()', function() {
	context("Valid Input", function() {
		context("US • United States National", function() {
			context('- using Christmas', function() {
				it('should get data about christmas event', function(done) {
					calendario.clear();
					calendario.use('US');
					var christmas = calendario.aboutDay(new Date('2015-12-25 00:00:00'));

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
			context('- using NonEvent', function() {
				it('should get a empty array', function(done) {
					calendario.clear();
					calendario.use('US');
					var nonEvent = calendario.aboutDay(new Date('2015-10-05 00:00:00'));

					assert.deepEqual(nonEvent.length, 0);
					assert.deepEqual(nonEvent, [])
					done();
				});
			});
		});
		context('BR • Brazil National', function() {
			context('- using Christmas', function() {
				it('should get data about christmas event', function(done) {
					calendario.clear();
					calendario.use('BR');
					var christmas = calendario.aboutDay(new Date('2015-12-25 00:00:00'));

					var expected = {
						date: new Date('2015-12-25 00:00:00'),
						summary: 'Natal',
						workday: false
					}

					assert.deepEqual(typeof(christmas), 'object');
					assert.deepEqual(christmas.length, 1);
					assert.deepEqual(christmas[0], expected)
					done();
				});
			});
			context('- using NonEvent', function() {
				it('should get a empty array', function(done) {
					calendario.clear();
					calendario.use('BR');
					var nonEvent = calendario.aboutDay(new Date('2015-10-05 00:00:00'));

					assert.deepEqual(nonEvent.length, 0);
					assert.deepEqual(nonEvent, [])
					done();
				});
			});
		});
	});
});