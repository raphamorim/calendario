module.exports = require('./src/calendario.js');

var calendario = require('./src/calendario.js');
calendario.use('BR');
calendario.use('US');

console.log(calendario.sourceList());

console.log(calendario.isWorkday(new Date('2015-12-01')));