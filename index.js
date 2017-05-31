'use strict';

const express        = require('express');
const app            = express();
const path           = require('path');
const fs             = require('fs');
const csvjson        = require('csvjson');
const regression     = require('regression');
const _              = require('lodash');
const loadJsonFile   = require('load-json-file');
const writeJsonFile  = require('write-json-file');
const bodyParser     = require('body-parser');

const db      = require('./server/modules/service').getDb();
const storage = require('./server/modules/storage');

db.loadDatabase({}, () => {
  console.log('lokijs ready!');
  
  storage.insert(db, 'user', { name: 'Warren' })
    .then(console.log)
    .catch(console.log);
});

app.use(bodyParser.json());
app.use('/client', express.static(path.join(__dirname, '/client')));
app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.use(express.static('dist'));

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

let loans = fs.readFileSync(path.join(__dirname, './lib/salary/germany-loan.csv'), { encoding : 'utf8'});
loans = csvjson.toObject(loans, { delimiter : ';'});
let approximation = regression('polynomial', _.map(loans, (obj) => [parseFloat(obj['loan']), parseFloat(obj['level_1'])] ), 2);

app.get('/salary-table', function(req, res){
  res.json(approximation.equation);
});

let filepathToAccount = path.resolve(__dirname, 'lib/salary/resources/local.json');

const ensureLocalAccount = () => {
  return loadJsonFile(filepathToAccount)
  .then((json) => {
    console.log('local account exists');
  })
  .catch((err) => {
    if(err.code === 'ENOENT') {
      let initialBody = {
        "assets": [],
        "liabilities": []
      };

      return writeJsonFile(filepathToAccount, initialBody);
    }
  });
};

ensureLocalAccount();

app.get('/salary/get/local', function(req, res){
  loadJsonFile(filepathToAccount).then(json => {
    res.json(json);
  });
});

app.post('/salary/save/local', function(req, res){
  let filepath = path.resolve(__dirname, 'lib/salary/resources/local.json');
  writeJsonFile(filepath, req.body).then(() => {
    res.json({});
  });
});

const server = require('http').Server(app);

server.listen(3000, function(){
  console.log('listening on *:3000');
});
