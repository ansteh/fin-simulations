'use strict';
const _ = require('lodash');

const Salary = (gross) => {
  let net = gross;

  let loanTax = 0.1594;
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
    return loanTax*gross;
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

  //net = (1-loanTax)*net;
  console.log(getLoanTaxCost());
  console.log(getSolidarityTaxCost());
  console.log(getChurchTaxCost());
  console.log(getMedicareCost());
  console.log(getNursingInsuranceCost());
  console.log(getPensionInsuranceCost());
  console.log(getUnemploymentInsuranceCost());

  return {

  };
};

module.exports = Salary;
