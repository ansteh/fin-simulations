'use strict';
const service = require('../../modules/service');
const storage = require('../../modules/storage');

const COLLECTION_NAME = 'cashflow';

const getAll = () => {
  return service.getDb()
    .then((db) => {
      return storage.getAll(db, COLLECTION_NAME);
    });
};

const insert = (asset) => {
  return service.getDb()
    .then((db) => {
      return storage.insert(db, COLLECTION_NAME, asset);
    });
};

const update = (asset) => {
  return service.getDb()
    .then((db) => {
      return storage.update(db, COLLECTION_NAME, asset);
    });
};

module.exports = {
  getAll,
  insert,
  update,
};
