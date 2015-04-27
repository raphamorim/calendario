'use strict';

var lib = require('../lib');

var Calendario = function(calendar) {
    this.calendar = calendar.toUpperCase();

    var path = '../calendars/' + this.calendar + '/' + 
        this.calendar + '-national.json';
    this.calendarData = require(path);
};

Calendario.prototype.formatDate = function(date) {
    return date.getFullYear() + ''
        + ('0' + (date.getMonth() + 1)).slice(-2) + ''
        + ('0' + date.getDate()).slice(-2);
}

Calendario.prototype.getEvents = function(dateFormat) {
    var self = this,
        data = self.calendarData;

    var calendarEvents = data['VCALENDAR'][0]['VEVENT'],
        events = [];

    calendarEvents.forEach(function(ev) {
        if(dateFormat === ev['DTSTART;VALUE=DATE']) 
            events.push(ev);
    });

    return events;
};

Calendario.prototype.isWorkday = function(date) {
    var self = this;

    date = self.formatDate(date);
    if (self.getEvents(date).length > 0)
        return false;

    return true;
}

Calendario.prototype.range = function(dateStart, dateEnd) {
    var self = this,
        range = [];

    for (var date = self.formatDate(dateStart); date <= self.formatDate(dateEnd); date++) {
        var dateEvents = self.getEvents(date);

        if (dateEvents.length > 0) {
            range.push({
                'date': date,
                'events': dateEvents
            });
        }
    }

    return range;
}

module.exports = Calendario;
