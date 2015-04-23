// https://github.com/peterbraden/ical.js
var calendar = require('calendar');
calendar.use('BR', calendar.parser('BR.ics'))
calendar.use('MOBDIQ', calendar.parser('MOBDIQ.xml'));
calendar.use('DATABASE', function(done) {
	done([{date: '2015-10-05', workday: false}, {date: '2015-10-05' , description: 'Feriado Nacional'}]);
});


calendar.load();
// Promise

calendar.isWorkDay(date)
// true

calendar.isWorkDay([date1, date2])
// false

calendar.range()
	  .begin(startDate)
	  .keepWeekends()
	  .end(endDate)
	  .toArray();
// [date1, date2, date3, ...]

calendar.range()
	  .begin(startDate)
	  .keepWeekends()
	  .end(endDate)
	  .build()
Range.contains(date)
Range.contains(range)
Range.toArray();