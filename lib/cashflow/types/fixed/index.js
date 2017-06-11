'use strict';
const _        = require('lodash');
const moment   = require('moment');
const DP       = require('datepress');

const Core     = require('../core.js');

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

  let getCashflowByDates = Core.getCashflowByDates(getCashflow);
  let getCashflowByRange = Core.getCashflowByRange(getCashflow);

  return {
    getCashflow,
    getCashflowByDates,
    getCashflowByRange
  };
};

module.exports = Fixed;
