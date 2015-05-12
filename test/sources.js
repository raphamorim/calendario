var assert = require('assert'),
	calendario = require('../index.js');

describe('Verify Sources', function() {
	context("use('US') -> United States National", function() {
		it('should return US source', function(done) {
			calendario.clear();
			calendario.use('US');
			var sourceList = calendario.sourceList(),
				eventList = calendario.eventList();

			assert.deepEqual(sourceList, ['US']);
			assert.deepEqual(typeof(eventList), 'object');
			assert.deepEqual(eventList instanceof Array, true);
			done();
		});
	});
	context("use('BR') -> Brazil National", function() {
		it('should return BR source', function(done) {
			calendario.clear();
			calendario.use('BR');
			var sourceList = calendario.sourceList(),
				eventList = calendario.eventList();

			assert.deepEqual(sourceList, ['BR']);
			assert.deepEqual(typeof(eventList), 'object');
			assert.deepEqual(eventList instanceof Array, true);
			done();
		});
	});
});
