'use strict';
const _  = require('lodash');
const DP = require('datepress');

const Fixed     = require('./types/fixed');
const Resouce   = require('./types/resource');

const getCashflow = ({ delimiter = 'month', resources, date }) => {
  return _.reduce(resources, (cash, resource) => {
    return cash + resource.getCashflow(date, delimiter);
  }, 0);
};

module.exports = {
  getCashflow,
};