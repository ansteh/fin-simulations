'use strict';
const _ = require('lodash');
const simple = {};

simple.output = (io) => {
  return io.seed*(1 + io.rate*io.runtime);
};

simple.rate = (io) => {
  return (io.output/io.seed-1)/io.runtime;
};

simple.runtime = (io) => {
  return (io.output/io.seed-1)/io.rate;
};

simple.seed = (io) => {
  return io.output/(1 + io.rate*io.runtime);
};

const compound =  {};

compound.output = (io) => {
  return io.seed*Math.pow(1 + io.rate, io.runtime);
};

compound.rate = (io) => {
  return Math.pow(io.output/io.seed, 1/io.runtime)-1;
};

compound.runtime = (io) => {
  return Math.log(io.output/io.seed)/Math.log(1+io.rate);
};

compound.seed = (io) => {
  return io.output/Math.pow(1 + io.rate, io.runtime);
};

const Rounder = (precision) => {
  let api = {};

  _.forOwn(compound, (func, name) => {
    _.set(api, `compound.${name}`, (io) => {
      return _.round(func(io), precision);
    });
  });

  _.forOwn(compound, (func, name) => {
    _.set(api, `simple.${name}`, (io) => {
      return _.round(func(io), precision);
    });
  });

  return api;
};

const createResolver = _.curry((rest, methode, io) => {
  let keys = _.keys(rest[methode]);
  let toResolve = _.difference(keys, _.keys(io));
  return rest[methode][toResolve](io);
});

module.exports = {
  simple: simple,
  compound: compound,
  Rounder: Rounder,
  createResolver: createResolver
};
