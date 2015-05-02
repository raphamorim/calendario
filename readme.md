# calendario

> Verify workdays, holidays, weekends or create events and make your own events

## Install

Before anything, you need to have [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed.

    $ npm install calendario

## Usage

Currently there are only **national** calendars. In next release will be added regional support.

**Available for:**

- Brazil `.use('BR')`
- United States of America `.use('US')`

You can set the calendar using `use()`

```javascript
var calendario = require('calendario');
calendario.use('BR');
```

You can create your owns calendars, passing a array of objects like these:

```javascript
var calendario = require('calendario');

calendario.use('MozillaCalendar', [
	{date: new Date('2020-11-25'), workday: true, summary: "Mozilla Summit"}, 
	{date: new Date('2021-1-20'), workday: true, summary: "Mozilla another event"}
]);

calendario.use('GoogleCalendar', function(set) {
	set([
		{date: new Date('2017-6-3'), workday: true, summary: "Google IO"},
		{date: new Date('2018-10-5'), workday: true, summary: "Google another event"},
	]);
});
```

## Methods

#### isWorkday

Verify if the day in question is a working day, based on defined calendar sources:

```javascript
var calendario = require('calendario');
calendario.use('BR');

calendario.isWorkday(new Date('2015-05-01')); // false
calendario.isWorkday(new Date('2015-05-01')); // true
```

#### aboutDay

Get all events about specified day:

```javascript
var calendario = require('calendario');
calendario.use('US');

calendario.aboutDay(new Date('2015-12-25'))
/*
[ { date: Fri Dec 25 2015 00:00:00 GMT-0200 (BRST),
    summary: 'Christmas Day',
    workday: false } ]
*/
```

#### range

Get all events from a specified begin to a specified end:

```javascript
var calendario = require('calendario');
calendario.use('US');

var range = calendario.range()
		.begin(new Date('2015-12-20'))
		.end(new Date('2016-01-05'))
		.toArray();

/*
[ { date: Thu Dec 24 2015 00:00:00 GMT-0200 (BRST),
    summary: 'Christmas Eve (from 2pm)',
    workday: false },
  { date: Fri Dec 25 2015 00:00:00 GMT-0200 (BRST),
    summary: 'Christmas Day',
    workday: false },
  { date: Thu Dec 31 2015 00:00:00 GMT-0200 (BRST),
    summary: 'New Year\'s Eve (from 2pm)',
    workday: false },
  { date: Fri Jan 01 2016 00:00:00 GMT-0200 (BRST),
    summary: 'New Year\'s Day',
    workday: false } ]
*/
```


#### sourceList

Return all defined calendars as source:

```javascript
var calendario = require('calendario');
calendario.use('EN');
calendario.use('BR');

calendario.sourceList(); // ['EN', 'BR']
```

#### eventList

Return the events from all sources:

```javascript
var calendario = require('calendario');
calendario.use('MozillaCalendar', [
	{date: new Date('2020-11-25'), workday: true, summary: "Mozilla Summit"}, 
	{date: new Date('2021-1-20'), workday: true, summary: "Mozilla another event"}
]);

calendario.eventList(); 
/*
[ { workday: true,
    summary: 'Mozilla Summit',
    date: Tue Nov 24 2020 22:00:00 GMT-0200 (BRST) },
  { workday: true,
    summary: 'Mozilla another event',
    date: Wed Jan 20 2021 00:00:00 GMT-0200 (BRST) } ]
*/
```

## Contributing

Don't be shy, send a Pull Request! Here is how:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## About

**License:** MIT ® [Raphael Amorim](https://github.com/raphamorim)
