'use strict';
const _  = require('lodash');
const DP = require('datepress');

const Fixed = ({
  name,
  each = 'month',
  value
}) => {
  let getCashflow = (date, delimiter = 'month') => {
    if(each === delimiter) {
      return value;
    } else {
      //TODO: calculate the diff between each and delimiter
      return 0;
    }
  };

  return {
    getCashflow
  };
};

module.exports = Fixed;
