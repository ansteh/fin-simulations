'use strict';
const _        = require('lodash');
const moment   = require('moment');
const DP       = require('datepress');


let getCashflowByRange = _.curry((getCashflow, start, end, delimiter = 'month') => {
  let range = DP.range(start, end, delimiter);
  return _.map(range, (date) => {
    return getCashflow(date, delimiter);
  });
});

let getCashflowByDates = _.curry((getCashflow, dates, delimiter = 'month') => {
  return _.map(dates, (date) => {
    return getCashflow(date, delimiter);
  });
});


module.exports = {
  getCashflowByDates,
  getCashflowByRange
};
