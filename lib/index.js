'use strict';
const _ = require('lodash');
const Salary = require('./salary/germany.js');

let yearLoans = [38000, 40000, 45000];

_.forEach(yearLoans, (loan) => {
  console.log('loan = '+loan+': ');
  Salary(loan);
  console.log();
  console.log();
});
