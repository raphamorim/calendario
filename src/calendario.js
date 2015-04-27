'use strict';

var lib = require('../lib');

var Calendario = function(calendar) {
    this.calendar = calendar.toUpperCase();

    var path = '../calendars/' + this.calendar + '/' + 
        this.calendar + '-national.json';
    this.calendarData = require(path);
};

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

    var dateStart = date.getFullYear() + ''
        + ('0' + (date.getMonth() + 1)).slice(-2) + ''
        + ('0' + date.getDate()).slice(-2);

    if (self.getEvents(dateStart).length > 0)
        return false;

    return true;
}

module.exports = Calendario;
