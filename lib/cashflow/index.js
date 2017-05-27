'use strict';
const _  = require('lodash');
const DP = require('datepress');

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
  let getCashflow = (delimiter = 'month', date) => {
    let start = moment(_.clone(date)).startOf(delimiter);
    let end = moment(_.clone(date)).endOf(delimiter);
    let sliced = DP.slice(cashflow, start, end, info => info.date);

    return _.
      .chain(sliced)
      .map('value')
      .sum()
      .value();
  };

  return {
    getCashflow
  };
};

const cashflow = ({ delimiter = 'month', resources, date }) => {
  return _.reduce(resources, (cash, resource) => {
    return cash + resource.getCashflow(delimiter, date);
  });
};

module.exports = {
  cashflow,
};
