'use strict';
const moment   = require('moment');

const Fixed = require('./types/fixed/index.js');
const Resource = require('./types/resource/index.js');

const Cashflow = require('./index.js');

const fixed = Fixed({
  name: 'position',
  each: 'month',
  value: 2
});

const resource = Resource({
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

let yearCash = Cashflow.getCashflow({
  resources: [fixed, resource],
  date: new Date(),
  delimiter: 'year'
});

// console.log('year cashflow:', yearCash);
console.log('year cashflow:', 39 === yearCash);
