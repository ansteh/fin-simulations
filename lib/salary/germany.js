'use strict';
const _ = require('lodash');
const csvjson = require('csvjson');
const path = require('path');
const fs = require('fs');
const regression = require('regression');

let loans = fs.readFileSync(path.join(__dirname, 'germany-loan.csv'), { encoding : 'utf8'});
loans = csvjson.toObject(loans, { delimiter : ';'});
let approximation = regression('polynomial', _.map(loans, (obj) => [parseFloat(obj['loan']), parseFloat(obj['level_1'])] ), 10);

const getLoanTax = (loan) => {
  let tax = 0;
  _.forEach(approximation.equation, (a, exponent) => {
    tax += a*Math.pow(loan, exponent);
  });
  return tax;
};
// console.log(approximation.equation);
// console.log(approximation.string);
// console.log(getLoanTax(20000));
// console.log(getLoanTax(37500));
// console.log(getLoanTax(38000));
// console.log(getLoanTax(40000));

const Salary = (gross) => {

  //let loanTax = 0.1594;
  let solidarityTax = 0.055;
  let churchTax = 0.09;
  let medicare = 0.146;
  let mediFee = 0.009;
  let nursingInsuranceFee = 0.0235;
  let pensionInsuranceFee = 0.187;
  let unemploymentInsuranceFee = 0.03;

  const round = (func) => {
    return () => {
      return _.round(func(), 2);
    };
  };

  const getLoanTaxCost = round(() => {
    return getLoanTax(gross);
  });

  const getSolidarityTaxCost = round(() => {
    return getLoanTaxCost()*solidarityTax;
  });

  const getChurchTaxCost = round(() => {
    return getLoanTaxCost()*churchTax;
  });

  const getMedicareCost = round(() => {
    return gross*(medicare*0.5 + mediFee);
  });

  const getNursingInsuranceCost = round(() => {
    //kinderlose fall, daher 0,25 Prozent mehr
    return gross*nursingInsuranceFee*0.5 + gross*0.0025;
  });

  const getPensionInsuranceCost = round(() => {
    return gross*pensionInsuranceFee*0.5;
  });

  const getUnemploymentInsuranceCost = round(() => {
    return gross*unemploymentInsuranceFee*0.5;
  });

  const getNet = round(() => {
    let net = gross;
    net -= getLoanTaxCost();
    net -= getSolidarityTaxCost();
    net -= getChurchTaxCost();
    net -= getMedicareCost();
    net -= getNursingInsuranceCost();
    net -= getPensionInsuranceCost();
    net -= getUnemploymentInsuranceCost();
    return net;
  });

  const eachMonthNet = round(() => {
    return getNet()/12;
  });

  //net = (1-loanTax)*net;
  /*console.log(getLoanTaxCost());
  console.log(getSolidarityTaxCost());
  console.log(getChurchTaxCost());
  console.log(getMedicareCost());
  console.log(getNursingInsuranceCost());
  console.log(getPensionInsuranceCost());
  console.log(getUnemploymentInsuranceCost());*/
  console.log('year net:', getNet());
  console.log('month net:', eachMonthNet());

  return {

  };
};

module.exports = Salary;
