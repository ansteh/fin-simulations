'use strict';
const Promise        = require('bluebird')
const _              = require('lodash');

const collections = new Map();

const loadCollection = (db, name) => {
  return new Promise((resolve, reject) => {
    if(collections.has(name)) {
      resolve(collections.get(name));
    } else {
      let collection = db.getCollection(name) || db.addCollection(name);
      collections.set(name, collection);
      resolve(collection);
    }
  });
};

const find = (db, name, { $loki }) => {
  return loadCollection(db, name)
    .then((collection) => {
      let candidates = collection
        .chain()
        .find({ $loki })
        .limit(1)
        .data();

      return _.first(candidates);
    });
};

const findBy = (db, name, needle) => {
  return loadCollection(db, name)
    .then((collection) => {
      let candidates = collection
        .chain()
        .find(needle)
        .limit(1)
        .data();

      return _.first(candidates);
    });
};

const getAll = (db, name) => {
  return loadCollection(db, name)
    .then(collection => collection.data);
};

const insert = (db, name, item) => {
  return loadCollection(db, name)
    .then((collection) => {
      const data = collection.insert(item);
      db.saveDatabase();
      return item;
    });
};

const update = (db, name, item) => {
  return loadCollection(db, name)
    .then((collection) => {
      collection.update(item);
      db.saveDatabase();

      return item;
    });
};

module.exports = {
  find,
  findBy,
  getAll,
  insert,
  loadCollection,
  update,
}
