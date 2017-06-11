'use strict';
const _        = require('lodash');
const moment   = require('moment');
const DP       = require('datepress');

const Core     = require('../core.js');

// {
//   cashflow: [{
//     date: Date,
//     value: number
//   }],
// }

const Resource = ({
  name,
  cashflow = [],
}) => {
  let getCashflow = (date, delimiter = 'month') => {
    let start = moment(_.clone(date)).startOf(delimiter);
    let end = moment(_.clone(date)).endOf(delimiter);
    let sliced = DP.slice(cashflow, start, end, info => info.date);

    return _
      .chain(sliced)
      .map('value')
      .sum()
      .value();
  };

  let getCashflowByDates = Core.getCashflowByDates(getCashflow);
  let getCashflowByRange = Core.getCashflowByRange(getCashflow);

  return {
    getCashflow,
    getCashflowByDates,
    getCashflowByRange
  };
};

module.exports = Resource;
