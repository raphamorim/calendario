var assert = require('assert'),
	calendario = require('../../index.js');

var states = [
	'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
	'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA',
	'MA', 'MD', 'ME', 'MI', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE',
	'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 
	'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI',
	'WV', 'WY' ];

describe('Test States', function() {
	context("US • United States of America - use american states as source", function() {
		var state, stateSourceList, stateEventList,
			statesList = states;

		for (var index = 0; index < states.length; index++) {
			state = 'US-' + states[index];
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
