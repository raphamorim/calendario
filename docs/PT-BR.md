# calendario

> Verifique dias de trabalho, feriados, finais de semanda ou crie seus próprios eventos.

## Instalação

Antes de qualquer coisa, você deve ter o [node](http://nodejs.org/) e o [npm](https://www.npmjs.org/) instalados.

```sh
$ npm install calendario
```

## Uso

Atualmente os calendários suportam apenas eventos nacionais (com excessão do Brasil). Na próxima release será adicionado o suporte regional e mais calendários nacionais e regionais.

**Disponível para:**

- Brazil `.use('BR')`
  - Acre `.use('BR-AC')`
  - Alagoas `.use('BR-AL')`
  - Amapá `.use('BR-AP')`
  - Amazonas `.use('BR-AM')`
  - Bahia `.use('BR-BA')`
  - Ceará `.use('BR-CE')`
  - Distrito Federal `.use('BR-DF')`
  - Espírito Santo `.use('BR-ES')`
  - Goiás `.use('BR-GO')`
  - Maranhão `.use('BR-MA')`
  - Mato Grosso `.use('BR-MT')`
  - Mato Grosso do Sul `.use('BR-MS')`
  - Minas Gerais `.use('BR-MG')`
  - Pará `.use('BR-PA')`
  - Paraíba `.use('BR-PB')`
  - Paraná `.use('BR-PR')`
  - Pernambuco `.use('BR-PE')`
  - Piauí `.use('BR-PI')`
  - Rio de Janeiro `.use('BR-RJ')`
  - Rio Grande do Norte `.use('BR-RN')`
  - Rio Grande do Sul `.use('BR-RS')`
  - Rondônia `.use('BR-RO')`
  - Roraima `.use('BR-RR')`
  - Santa Catarina `.use('BR-SC')`
  - São Paulo `.use('BR-SP')`
  - Sergipe `.use('BR-SE')`
  - Tocantins `.use('BR-TO')`
- United States of America `.use('US')`

Você pode definir o calendário que irá utilizar usando `use()`

```javascript
var calendario = require('calendario');
calendario.use('BR');
```

Você também pode criar seus próprios calendários, passando um array de objetos:

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

## Métodos

#### isWorkday

Verifica se o dia em questão é um dia de trabalho, baseado nos calendários definidos.

```javascript
var calendario = require('calendario');
calendario.use('BR');

calendario.isWorkday(new Date('2015-05-01')); // false
calendario.isWorkday(new Date('2015-05-01')); // true
```

#### aboutDay

Retorna todos os eventos de um dia específico:

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

Retorna todos os eventos de um começo específico até um fim específico:

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
calendario.use('EN');
calendario.use('BR');

calendario.sourceList(); // ['EN', 'BR']
```

#### eventList

Retorna todos os eventos das fontes definidas:

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

Limpa e remove todos as fontes anteriormente definidas:

```javascript
var calendario = require('calendario');
calendario.use('BR'); // Sources: ['BR']
calendario.clean(); // Sources: []
```

## Fonte de Dados

#### Brazil

- Eventos nacionais: Google Calendar; ID: `pt-br.brazilian#holiday@group.v.calendar.google.com`
- Eventos estaduais: [Wikipedia](http://pt.wikipedia.org/wiki/Feriados_no_Brasil#Festas_m.C3.B3veis)

#### United States of America

- Eventos nacionais: Google Calendar; ID: `en.usa#holiday@group.v.calendar.google.com`

## Contribuindo

Não seja tímido, envie um Pull Request! Veja como:

1. Fork o projeto!
2. Crie sua feature branch: `git checkout -b my-new-feature`
3. Faça um commit para suas mudanças: `git commit -m 'Adicionar alguma funcionalidade'`
4. Faça um push para o branch: `git push origin my-new-feature`
5. Dê submit do pull request :D

## Sobre

**Licença:** MIT ® [Raphael Amorim](https://github.com/raphamorim)
