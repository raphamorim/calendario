# calendario

> Verifique dias de trabalho, feriados, finais de semana ou crie seus próprios eventos.

[![NPM Version](https://img.shields.io/npm/v/express.svg?style=flat)](https://www.npmjs.org/package/calendario)
[![Build Status](https://api.travis-ci.org/raphamorim/calendario.svg)](https://travis-ci.org/raphamorim/calendario)

## Instalação

Antes de qualquer coisa, você deve ter o [node](http://nodejs.org/) e o [npm](https://www.npmjs.org/) instalados.

```sh
$ npm install calendario
```

## Uso

Atualmente as fontes suportam apenas eventos nacionais (com exceção do Brasil e Estados Unidos). Na próxima release será adicionado mais fontes nacionais e regionais.

**Disponível para:**

- Brazil `.use('BR')`
  - [Ver uso para o estados brasileiros](BR/states.md)
- Estados Unidos da America `.use('US')`
  - [Ver uso para estados americanos](US/states.md)

Você pode definir a fonte que irá utilizar usando `use()`

```javascript
var calendario = require('calendario');
calendario.use('BR');
```

Definindo a fonte para um estado específico:

```javascript
var calendario = require('calendario');
calendario.use('US-NY');
```

Você também pode criar suas próprias fontes, passando um array de objetos:

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

Você também pode criar suas próprias fontes, passando um arquivo `ics`

```javascript
var calendario = require('calendario');
calendario.use('BR', {file: 'pt-br.ics', parser: 'ics'});
```

## Métodos

#### isWorkday

Verifica se o dia em questão é um dia de trabalho ou feriado, baseado nas fontes definidas.

```javascript
var calendario = require('calendario');
calendario.use('BR');

calendario.isWorkday(new Date('2015-05-01')); // false
calendario.isWorkday(new Date('2015-05-02')); // true
```

#### aboutDay

Retorna todos os eventos de um dia:

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

Retorna todos os eventos especificados de um começo até um fim:

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

Retorna todos os calendários que foram definidos como fonte:

```javascript
var calendario = require('calendario');
calendario.use('US');
calendario.use('BR');

calendario.sourceList(); // ['US', 'BR']
```

#### eventList

Retorna todos os eventos:

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

#### clean

Remove todas fontes definidas:

```javascript
var calendario = require('calendario');
calendario.use('BR'); // Sources: ['BR']
calendario.clean(); // Sources: []
```

## Fonte de Dados

#### Brasil

- Eventos nacionais: Google Calendar; ID: `pt-br.brazilian#holiday@group.v.calendar.google.com`
- Eventos estaduais: [Wikipedia](http://pt.wikipedia.org/wiki/Feriados_no_Brasil#Festas_m.C3.B3veis)

#### Estados Unidos da America

- Eventos nacionais: Google Calendar; ID: `en.usa#holiday@group.v.calendar.google.com`
- Eventos estaduais: [Wikipedia](http://en.wikipedia.org/wiki/Public_holidays_in_the_United_States#Legal_holidays_by_states_and_political_divisions_of_the_United_States)

## Changelog

Veja o [Changelog](docs/changelog/changelog.md) para mais detalhes.

## Contribuindo

Não seja tímido, envie um Pull Request! Veja como:

1. Faça um fork do projeto!
2. Crie sua feature branch: `git checkout -b my-new-feature`
3. Faça um commit para suas mudanças: `git commit -m 'Adicionar alguma funcionalidade'`
4. Faça um push para o branch: `git push origin my-new-feature`
5. Agora é só dar submit do pull request e ser feliz :D

## Sobre

**Licença:** MIT ® [Raphael Amorim](https://github.com/raphamorim)
