'use strict';
const _ = require('lodash');
const Salary = require('./salary/germany.js');

const csvjson = require('csvjson');
const path = require('path');
const fs = require('fs');
const regression = require('regression');

let loans = fs.readFileSync(path.join(__dirname, './salary/germany-loan.csv'), { encoding : 'utf8'});
loans = csvjson.toObject(loans, { delimiter : ';'});
let approximation = regression('polynomial', _.map(loans, (obj) => [parseFloat(obj['loan']), parseFloat(obj['level_1'])] ), 10);

const getLoanTax = (loan) => {
  let tax = 0;
  let exponentAccu = 1;
  _.forEach(approximation.equation, (a, exponent) => {
    tax += a*exponentAccu;//Math.pow(loan, exponent);
    exponentAccu *= loan;
  });
  return tax;
};
// console.log(approximation.equation);
// console.log(approximation.string);
// console.log(getLoanTax(20000));
// console.log(getLoanTax(37500));
// console.log(getLoanTax(38000));
// console.log(getLoanTax(40000));


let yearLoans = [38000, 40000, 45000];
let salary = Salary(getLoanTax);

_.forEach(yearLoans, (loan) => {
  console.log('loan = '+loan+': ');
  salary.describe(loan);
  //console.log(salary.getNet());
  console.log();
  console.log();
});
