'use strict';
const _        = require('lodash');
const moment   = require('moment');
const DP       = require('datepress');

// {
//   cashflow: [{
//     date: Date,
//     value: number
//   }],
// }

const Resource = ({
  name,
  cashflow,
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

  return {
    getCashflow
  };
};

module.exports = Resource;
