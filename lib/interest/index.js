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

  _.forOwn(simple, (func, name) => {
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

const financing = _.curry((rate, budget, runtime) => {
  let first = { time: 0, balance: 0, investment: 0, margin: 0, return: 0 };
  if(runtime < 1) return [first];
  let multiplier = 1+rate;
  return _.reduce(_.range(runtime), (series, time) => {
    let last = _.last(series);
    let point = {
      time: time+1,
      balance: last.balance*multiplier+budget,
      investment: last.investment+budget,
    };
    point.margin = point.balance-point.investment;
    point.return = point.margin/point.investment;
    series.push(point);
    return series;
  }, [first]);
});

const terminal = (rate, runtime) => {
  let multiplier = 1+rate;
  return (Math.pow(multiplier, runtime)-1)/(multiplier-1);
};

const pension = (rate, budget, runtime) => {
  let multiplier = 1+rate;
  return budget*terminal(rate, runtime);
};

module.exports = {
  simple: simple,
  compound: compound,
  Rounder: Rounder,
  createResolver: createResolver,
  financing: financing,
  pension: pension
};
