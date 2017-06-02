'use strict';

const express        = require('express');
const app            = express();
const path           = require('path');
const bodyParser     = require('body-parser');

// const service = require('./server/modules/service');
// const storage = require('./server/modules/storage');
//
// service.getDb()
//   .then((db) => {
//     console.log('lokijs ready!');
//     return storage.insert(db, 'user', { name: 'Warren' });
//   })
//   .then(console.log)
//   .catch(console.log);

app.use(bodyParser.json());
app.use('/client', express.static(path.join(__dirname, '/client')));
app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.use(express.static('dist'));

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, 'client/index.html'));
});

app.use(require('./server/api/cashflow'));
app.use(require('./server/api/salary'));

const server = require('http').Server(app);

server.listen(3000, function(){
  console.log('listening on *:3000');
});
