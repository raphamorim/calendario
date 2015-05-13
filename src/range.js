'use strict';

var Range = function(calendario) {
    this.calendario = calendario;
}

Range.prototype.begin = function(begin) {
    this._begin = begin;
    return this;
}

Range.prototype.end = function(end) {
    this._end = end;
    return this;
}

Range.prototype.toArray = function() {
    var calendario = this.calendario,
    	events = [],
    	day = null,
    	begin = (this._begin ? this._begin : new Date());
    
    var end = (this._end ? this._end : begin), 
    	dayDiff = calendario.dayDiff(begin, end);

    if (dayDiff < 0) return false;

    for (var i = 1; i <= dayDiff; i++ ) {
    	day = calendario.aboutDay(begin);
		if (day.length > 0)
    		events = events.concat(day);

    	begin = new Date(begin.getTime() + 86400000);
    }

    return events;
}

module.exports = Range;
