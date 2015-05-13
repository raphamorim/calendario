var assert = require('assert'),
	calendario = require('../index.js');

describe('Verify Sources', function() {
	context("using default sources", function() {
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
	context("using array of objects", function() {
		it('should return a valid source', function(done) {
			calendario.clear();
			var arrayOfEvents = [
				{
					date: new Date('2020-11-25'), 
					workday: true, 
					summary: "Mozilla Summit"
				},
				{
					date: new Date('2021-1-20'), 
					workday: true, 
					summary: "Mozilla another event"
				}
			];

			calendario.use('MozillaCalendar', arrayOfEvents);
			var sourceList = calendario.sourceList(),
				eventList = calendario.eventList();

			assert.deepEqual(sourceList, ['MOZILLACALENDAR']);
			assert.deepEqual(typeof(eventList), 'object');
			assert.deepEqual(eventList, arrayOfEvents);
			assert.deepEqual(eventList instanceof Array, true);
			done();
		})
	});
	context("using ICS file", function() {
		context("use `pt-br.ics` as source", function() {
			it('should return BR source', function(done) {
				calendario.clear();
				calendario.use('BR', {file: 'test/fixtures/pt-br.ics', parser: 'ics'});

				var sourceList = calendario.sourceList(),
					eventList = calendario.eventList();

				assert.deepEqual(sourceList, ['BR']);
				assert.deepEqual(typeof(eventList), 'object');
				assert.deepEqual(eventList instanceof Array, true);
				done();
			});
		})
		context("use `en-usa.ics` as source", function() {
			it('should return US source', function(done) {
				calendario.clear();
				calendario.use('US', {file: 'test/fixtures/en-usa.ics', parser: 'ics'});

				var sourceList = calendario.sourceList(),
					eventList = calendario.eventList();

				assert.deepEqual(sourceList, ['US']);
				assert.deepEqual(typeof(eventList), 'object');
				assert.deepEqual(eventList instanceof Array, true);
				done();
			});
		})
		context("use non-existent file as source", function() {
			it('should throw a error', function(done) {
				calendario.clear();
				var params = {file: 'non-sense.non-sense', parser: 'ics'};
				
				function testNonExistentFile() {
					try {
						calendario.use('US', params);
						return true;
					} catch(e) {
						throw new Error(e);
					}
				}

				assert.throws(testNonExistentFile, Error);
				done();
			});
		})
	});
});
