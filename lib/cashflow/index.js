'use strict';
const _      = require('lodash');
const DP     = require('datepress');
const moment = require('moment');

const Fixed     = require('./types/fixed');
const Resource  = require('./types/resource');

const getCashflow = ({ delimiter = 'month', resources, date }) => {
  return _.reduce(resources, (cash, resource) => {
    return cash + resource.getCashflow(date, delimiter);
  }, 0);
};

const getCashflowByRange = ({ start, end, delimiter = 'month', resources }) => {
  let range = DP.range(start, end, delimiter);

  let cashflow = _
    .chain(resources)
    .map(resource => resource.getCashflowByDates(range, delimiter))
    .reduce((summedCashflow, resourceCashflow) => {
      return _.map(summedCashflow, (cash, index) => {
        return cash + resourceCashflow[index];
      });
    }, _.times(range.length, _.constant(0)))
    .value();

  return _.map(range, (date, index) => {
    return {
      date,
      cashflow: cashflow[index]
    };
  });
};

const getLabels = () => {
  let start = moment().startOf('year').toDate();
  let end = moment().endOf('year').toDate();
  let range = DP.range(start, end, 'month');

  return _.map(range, function(date) {
    return moment(date).format('MMM');
  });
};

module.exports = {
  Fixed,
  Resource,
  getCashflow,
  getCashflowByRange,
  getLabels
};
