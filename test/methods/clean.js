var assert = require('assert'),
	calendario = require('../../index.js');

describe('clean()', function() {
	context("Use when exists source", function() {
		context("US • United States National", function() {
			it('should clean US source', function(done) {
				calendario.clean();
				calendario.use('US');

				assert.deepEqual(calendario.sourceList(), ['US']);
				calendario.clean();
				assert.deepEqual(calendario.sourceList(), []);

				done();
			})
		})
		context('BR • Brazil National', function() {
			it('should clean BR source', function(done) {
				calendario.clean();
				calendario.use('BR');

				assert.deepEqual(calendario.sourceList(), ['BR']);
				calendario.clean();
				assert.deepEqual(calendario.sourceList(), []);

				done();
			})
		})
	});
	context("Use when non exists source", function() {
		it('should sourceList still empty', function(done) {
			calendario.clean();

			assert.deepEqual(calendario.sourceList(), []);
			calendario.clean();
			assert.deepEqual(calendario.sourceList(), []);

			done();
		})
	});
});