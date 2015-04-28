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
            date: date,
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
    return this.sources.map(function(a,b) { return a['events'] });
}

Calendario.prototype.isWorkday = function(date) {
    var events = this.eventsList();

    return date;
}

module.exports = new Calendario();
