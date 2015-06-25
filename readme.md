# calendario

> Check if a day is a workday or holiday.

[![NPM Version](https://img.shields.io/npm/v/express.svg?style=flat)](https://www.npmjs.org/package/calendario)
[![Build Status](https://api.travis-ci.org/raphamorim/calendario.svg)](https://travis-ci.org/raphamorim/calendario)
[![Coverage Status](https://coveralls.io/repos/raphamorim/calendario/badge.svg?branch=master)](https://coveralls.io/r/raphamorim/calendario?branch=master)

Available too: [brazilian portuguese](docs/PT-BR.md).

## Install

Before anything, you need to have [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed.

```sh
$ npm install calendario
```

## Usage

Currently there are only **national** calendars (except for Brazil and U.S.A). In next release will be added regional support.

**Available for:**

- Brazil `.use('BR')`
  - [See usage for brazilian states](docs/BR/states.md)
- United States of America `.use('US')`
  - [See usage for U.S. states and territories](docs/US/states.md)

You can set the calendar using `use()`

```javascript
var calendario = require('calendario');
calendario.use('BR');
```

Setting the calendar for a specific state

```javascript
var calendario = require('calendario');
calendario.use('US-NY');
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

You can create your own calendar, passing a `ics` file

```javascript
var calendario = require('calendario');
calendario.use('BR', {file: 'pt-br.ics', parser: 'ics'});
```


## Methods

#### isWorkday

Verify if the day in question is a working day, based on defined calendar sources:

```javascript
var calendario = require('calendario');
calendario.use('BR');

calendario.isWorkday(new Date('2015-05-01')); // false
calendario.isWorkday(new Date('2015-05-02')); // true
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
calendario.use('US');
calendario.use('BR');

calendario.sourceList(); // ['US', 'BR']
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

#### clear

Clear and remove all previously defined sources:

```javascript
var calendario = require('calendario');
calendario.use('BR'); // Sources: ['BR']
calendario.clear(); // Sources: []
```

#### ignoreWeekends

By default the calendario don't consider weekends as workdays. However you can change this using:

```javascript
var calendario = require('calendario');
calendario.ignoreWeekends();
```

## Data Source

#### Brazil

- National Events: Google Calendar; ID: `pt-br.brazilian#holiday@group.v.calendar.google.com`
- Regional Events: [Wikipedia](http://pt.wikipedia.org/wiki/Feriados_no_Brasil#Festas_m.C3.B3veis)

#### United States of America

- National Events: Google Calendar; ID: `en.usa#holiday@group.v.calendar.google.com`
- Regional Events: [Wikipedia](http://en.wikipedia.org/wiki/Public_holidays_in_the_United_States#Legal_holidays_by_states_and_political_divisions_of_the_United_States)


## History

See [Changelog](docs/changelog/changelog.md) for more details.

## Contributing

Don't be shy, send a Pull Request! Here is how:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## About

**License:** MIT ® [Raphael Amorim](https://github.com/raphamorim)
