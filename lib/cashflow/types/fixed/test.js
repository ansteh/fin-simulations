'use strict';
const moment   = require('moment');
const Resource = require('./index.js');

const position = Resource({
  name: 'position',
  each: 'month',
  value: 2
});

let todayValue = position.getCashflow(new Date());
// console.log('result:', todayValue);
console.log('first month:', 2 === todayValue);

console.log('year cashflow:', 24 === position.getCashflow(new Date(), 'year'));
