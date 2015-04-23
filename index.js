module.exports = require('./src/calendario.js');

var Calendario = require('./src/calendario.js'),
	calendario = new Calendario('PT-BR');

calendario.isWorkday(new Date());


