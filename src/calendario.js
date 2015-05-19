'use strict';

var Range = require('./range'),
    ical = require('ical2json'),
    fs = require('fs');

function sameDay(date1, date2){
    return date1.toDateString() === date2.toDateString();
}

function Calendario() {
    this.events = []; // [{date: 1, source: }, {date: 1, source: }]
    this.sources = [];
}

Calendario.prototype.use = function(name, source) {
    name = name.toUpperCase();
    var sourceType = typeof(source);

    if (sourceType === 'undefined') {
        if (name.indexOf('-') > -1) {    
            name = name.split('-');
            source = require('../calendars/' + name[0] + 
                '/states/' + name.join('-'));
            name = name.join('-');
            this.useObjectSource(name, source);
        } else {
            this.useDefaultSource(name);
        }
    } else if (sourceType === 'object') {
        if (source instanceof Array) {
            this.useObjectSource(name, source);
        } else {
            this.parseSource(name, source);
        }
    }
}

Calendario.prototype.parseSource = function(name, source) {
    var data = fs.readFileSync(source.file, 'utf-8');
    if (source.parser === 'ics') { 
        data = ical.convert(data);
        this.useDefaultSource(name, data);
    }
}

Calendario.prototype.useObjectSource = function(name, source) {
    var events = new Array(),
        ev = new Object();

    source.forEach(function(sourceEvent) {
        ev = {};
        ev.workday = (typeof(sourceEvent.workday) === 'undefined' ? true : sourceEvent.workday);
        ev.summary = sourceEvent.summary || '';
        if (sourceEvent.date) {
            ev.date = sourceEvent.date;
            events.push(ev)
        }
    })

    this.sources.push({source: name, events: events});
}

Calendario.prototype.useDefaultSource = function(name, data) {
    var events = [],
        date;

    if (!data)
        data = require('../calendars/' + name + '/' + name + '.json');
        
    data = data['VCALENDAR'][0]['VEVENT'];
    data.forEach(function(ev) {
        date = ev['DTSTART;VALUE=DATE']
        date = date.slice(0,4) + '-' + date.slice(4,6) + '-' + date.slice(6,8);
        events.push({
            date: new Date(date + ' 00:00:00'),
            summary: ev['SUMMARY'],
            workday: false
        })
    })

    this.sources.push({source: name, events: events});
}

Calendario.prototype.sourceList = function() {
    return this.sources.map(function(a,b) { return a['source'] });
}

Calendario.prototype.clear = function() {
    this.sources = [];
}

Calendario.prototype.eventList = function() {
    var events = this.sources.map(function(a,b) { return a['events'] }),
        eventsList = [];

    for (var i = 1; i <= events.length; i++) {
        eventsList = eventsList.concat(events[i - 1]);
    }
    return eventsList;
}

Calendario.prototype.dayDiff = function(dateEarlier, dateLater) {
    var dayTime = 1000 * 60 * 60 * 24;
    return (Math.round((dateLater.getTime()-dateEarlier.getTime())/dayTime));
}

Calendario.prototype.aboutDay = function(date) {
    var events = this.eventList(),
        day = [];

    events.forEach(function(ev) {
        if (sameDay(date, ev.date))
            day.push(ev);
    })

    return day;
}

Calendario.prototype.isWorkday = function(date) {
    var events = this.eventList(),
        workday = true;

    events.forEach(function(ev) {
        if (sameDay(date, ev.date))
            workday = ev.workday
    })

    return workday;
}

Calendario.prototype.range = function() {
    return new Range(this);
}

module.exports = new Calendario();
