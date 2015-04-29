'use strict';

function Calendario() {
    this.events = []; // [{date: 1, source: }, {date: 1, source: }]
    this.sources = [];
}

Calendario.prototype.parseSource = function(name, source) {
    name = name.toUpperCase();
}

Calendario.prototype.use = function(name, source) {
    name = name.toUpperCase();
    var sourceType = typeof(source);

    if (sourceType === 'undefined') {
        this.setSource(name);
    } else if (sourceType === 'object') {
        // this.parseSource(name, source);
    } else if (sourceType === 'array') {
        // this.addSource(name, source);
    }
}

Calendario.prototype.setSource = function(name) {
    var events = [],
        date;

    var data = require('../calendars/' + name + '/' + name + '.json');
        
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

Calendario.prototype.eventsList = function() {
    var events = this.sources.map(function(a,b) { return a['events'] }),
        eventsList = [];

    for (var i = 1; i <= events.length; i++) {
        eventsList = eventsList.concat(events[i - 1]);
    }
    return eventsList;
}

Calendario.prototype.dayDiff = function(dateEarlier, dateLater) {
    var dayTime = 1000*60*60*24;
    return (Math.round((dateLater.getTime()-dateEarlier.getTime())/dayTime));
}

Calendario.prototype.isWorkday = function(date) {
    var self = this,
        events = this.eventsList(),
        workday = true;

    events.forEach(function(ev) {
        if (self.dayDiff(date, ev.date) === 0)
            workday = ev.workday
    })

    return workday;
}

module.exports = new Calendario();
