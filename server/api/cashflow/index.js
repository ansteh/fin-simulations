'use strict';
const express        = require('express');
const router         = express.Router();

const Cashflow = require('./controller');

router.get('/api/cashflow', (req, res) => {
  Cashflow.getAll()
    .then((cashflows) => {
      res.json(cashflows);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

router.post('/api/cashflow/insert', (req, res) => {
  Cashflow.insert(req.body)
    .then((cashflow) => {
      res.json(cashflow);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

router.post('/api/cashflow/update', (req, res) => {
  Cashflow.update(req.body)
    .then((cashflow) => {
      res.json(cashflow);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

module.exports = router;
