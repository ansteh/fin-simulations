'use strict';

const interest = require('./index.js');
const simple = interest.simple;
const compound = interest.compound;
const Rounder = interest.Rounder;
const createResolver = interest.createResolver;

const testSimple = () => {
  let simpleOutput = simple.output({ seed: 1000, rate: 0.05, runtime: 2 });
  let rate = simple.rate({ seed: 1000, output: simpleOutput, runtime: 2 });
  let runtime = simple.runtime({ seed: 1000, output: simpleOutput, rate: 0.05 });
  let seed = simple.seed({ runtime: runtime, output: simpleOutput, rate: rate });
  console.log(simpleOutput, rate, runtime, seed);
};

const testCompond = () => {
  let compoundOutput = compound.output({ seed: 1000, rate: 0.05, runtime: 2 });
  let rate = compound.rate({ seed: 1000, output: compoundOutput, runtime: 2 });
  let runtime = compound.runtime({ seed: 1000, output: compoundOutput, rate: 0.05 });
  let seed = compound.seed({ runtime: runtime, output: compoundOutput, rate: rate });
  console.log(compoundOutput, rate, runtime, seed);
};

const testRounder = () => {
  let rest = Rounder(5);
  console.log(rest);
  let compoundOutput = rest.compound.output({ seed: 1000, rate: 0.05, runtime: 2 });
  let rate = rest.compound.rate({ seed: 1000, output: compoundOutput, runtime: 2 });
  let runtime = rest.compound.runtime({ seed: 1000, output: compoundOutput, rate: 0.05 });
  let seed = rest.compound.seed({ runtime: runtime, output: compoundOutput, rate: rate });
  console.log(compoundOutput, rate, runtime, seed);
};

const testCompoundResolver = () => {
  let rest = Rounder(5);
  let resolve = createResolver(rest, 'compound');
  let compoundOutput = resolve({ seed: 1000, rate: 0.05, runtime: 2 });
  let rate = resolve({ seed: 1000, output: compoundOutput, runtime: 2 });
  let runtime = resolve({ seed: 1000, output: compoundOutput, rate: 0.05 });
  let seed = resolve({ runtime: runtime, output: compoundOutput, rate: rate });
  console.log(compoundOutput, rate, runtime, seed);
};

testSimple();
testCompond();
testRounder();
testCompoundResolver();
