'use strict';
const express        = require('express');
const router         = express.Router();

const Cashflow = require('./controller');

router.get('/api/cashflow', (req, res) => {
  Cashflow.getAll()
    .then((assets) => {
      res.json(assets);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

router.post('/api/cashflow/insert', (req, res) => {
  console.log(req.body);
  Cashflow.insert(req.body)
    .then((asset) => {
      res.json(asset);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

router.post('/api/cashflow/update', (req, res) => {
  Cashflow.update(req.body)
    .then((asset) => {
      res.json(asset);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

module.exports = router;
