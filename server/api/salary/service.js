'use strict';
const Promise        = require('bluebird');
const path           = require('path');
const fs             = require('fs');
const csvjson        = require('csvjson');
const regression     = require('regression');
const _              = require('lodash');

const loanFilepath = path.join(__dirname, '../../../lib/salary/germany-loan.csv');
const loansAsCsvStr = fs.readFileSync(loanFilepath, { encoding : 'utf8' });
const loans = csvjson.toObject(loansAsCsvStr, { delimiter : ';' });
const approximation = regression('polynomial', _.map(loans, (obj) => {
  return [parseFloat(obj['loan']), parseFloat(obj['level_1'])];
}), 2);

const getApproximation = () => {
  return approximation;
};

const getEquation = () => {
  return getApproximation()['equation'];
}

module.exports = {
  getApproximation,
  getEquation
}
