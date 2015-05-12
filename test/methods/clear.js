var assert = require('assert'),
	calendario = require('../../index.js');

describe('clear()', function() {
	context("Use when exists source", function() {
		context("US • United States National", function() {
			it('should clear US source', function(done) {
				calendario.clear();
				calendario.use('US');

				assert.deepEqual(calendario.sourceList(), ['US']);
				calendario.clear();
				assert.deepEqual(calendario.sourceList(), []);

				done();
			})
		})
		context('BR • Brazil National', function() {
			it('should clear BR source', function(done) {
				calendario.clear();
				calendario.use('BR');

				assert.deepEqual(calendario.sourceList(), ['BR']);
				calendario.clear();
				assert.deepEqual(calendario.sourceList(), []);

				done();
			})
		})
	});
	context("Use when non exists source", function() {
		it('should sourceList still empty', function(done) {
			calendario.clear();

			assert.deepEqual(calendario.sourceList(), []);
			calendario.clear();
			assert.deepEqual(calendario.sourceList(), []);

			done();
		})
	});
});