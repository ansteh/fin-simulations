'use strict';
const _        = require('lodash');
const moment   = require('moment');
const DP       = require('datepress');


const getPeriods = (date, delimiter, target) => {
  let start = moment(_.clone(date)).startOf(target);
  let end = moment(_.clone(date)).endOf(target);
  return DP.range(start, end, delimiter);
};

const Fixed = ({
  name,
  each = 'month',
  value
}) => {
  let getCashflow = (date, delimiter = 'month') => {
    if(each === delimiter) {
      return value;
    } else {
      let periods = getPeriods(date, each, delimiter);
      let count = periods.length || 1;
      return count*value;
    }
  };

  return {
    getCashflow
  };
};

module.exports = Fixed;
