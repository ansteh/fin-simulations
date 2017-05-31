'use strict';
const Cashflow = require('./service');

module.exports = {
  getAll: Cashflow.getAll,
  insert: Cashflow.insert,
  update: Cashflow.update,
};
