'use strict';
const express        = require('express');
const router         = express.Router();

const Salary = require('./controller');

router.get('/salary-table', (req, res) => {
  res.json(Salary.getEquation());
});

module.exports = router;
