'use strict';

var lib = require('../lib');

var Calendario = function(calendar) {
    this.calendar = calendar;
    console.log(calendar);
};

Calendario.prototype.isWorkday = function(date) {
    var self = this;
    
    console.log(date, self.calendar)
    return true;
}

module.exports = Calendario;
