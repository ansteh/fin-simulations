'use strict';

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

const testSimple = () => {
  let simpleOutput = simple.output({ seed: 1000, rate: 0.05, runtime: 2 });
  let rate = simple.rate({ seed: 1000, output: simpleOutput, runtime: 2 });
  let runtime = simple.runtime({ seed: 1000, output: simpleOutput, rate: 0.05 });
  let seed = simple.seed({ runtime: runtime, output: simpleOutput, rate: rate });
  console.log(simpleOutput, rate, runtime, seed);
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

const testCompond = () => {
  let compoundOutput = compound.output({ seed: 1000, rate: 0.05, runtime: 2 });
  let rate = compound.rate({ seed: 1000, output: compoundOutput, runtime: 2 });
  let runtime = compound.runtime({ seed: 1000, output: compoundOutput, rate: 0.05 });
  let seed = compound.seed({ runtime: runtime, output: compoundOutput, rate: rate });
  console.log(compoundOutput, rate, runtime, seed);
};

testSimple();
testCompond();
