var assert = require('assert'),
	calendario = require('../../index.js');

var states = [
	'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
	'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PN', 'PR', 'RN',
	'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO' ];

describe('Test States', function() {
	context("BR • Brazil - use brazilian states as source", function() {
		var state, stateSourceList, stateEventList,
			statesList = states;

		for (var index = 0; index < states.length; index++) {
			state = 'BR-' + states[index];
			context("• test [" + state + "]", function() {
				it('should return ' + state + ' source', function(done) {
					calendario.clear();
					calendario.use(state);
			
					stateSourceList = calendario.sourceList();
					stateEventList = calendario.eventList();

					assert.deepEqual(stateSourceList, [state]);
					assert.deepEqual(typeof(stateEventList), 'object');
					assert.deepEqual(stateEventList instanceof Array, true);

					statesList = statesList.slice(++index);
					done();
				})
			})

			if ((index + 1) === states.length) {
				context("• test if left any state in stateList for test", function() {
					it('should return empty array', function(done) {
						assert.deepEqual(statesList, []);
						done();
					})
				})
			}
		}
	});
});
