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

const insert = (db, name, item) => {
  return loadCollection(db, name)
    .then((collection) => {
      const data = collection.insert(item);
      db.saveDatabase();
      return item;
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

const update = (db, name, item) => {
  return loadCollection(db, name)
    .then((collection) => {
      // console.log('update', item);
      collection.update(item);
      db.saveDatabase();

      return item;
    });
};

module.exports = {
  find,
  findBy,
  insert,
  loadCollection,
  update
}
