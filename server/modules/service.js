'use strict';
const Loki           = require('lokijs');

const db = new Loki('server/db.json');

module.exports = {
  getDb: () => db
}
