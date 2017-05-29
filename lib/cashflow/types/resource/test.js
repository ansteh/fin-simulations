'use strict';
const moment   = require('moment');
const Resource = require('./index.js');

const position = Resource({
  name: 'position',
  cashflow: [{
    date: moment().startOf('month').subtract(5, 'day').toDate(),
    value: 3
  },{
    date: moment().startOf('month').subtract(3, 'day').toDate(),
    value: 2
  },{
    date: new Date(),
    value: 10
  }]
});

let todayValue = position.getCashflow(new Date());
// console.log('result:', todayValue);
console.log('first month:', 10 === todayValue);

let lastMonth = moment().startOf('month').subtract(10, 'day').toDate();
console.log('first month:', position.getCashflow(lastMonth), 5 === position.getCashflow(lastMonth));

console.log('year cashflow:', 15 === position.getCashflow(new Date(), 'year'));
