'use strict';

const _ = {
  round: require('lodash/round')
};

const Salary = (getLoanTax) => {
  let gross = 0;
  //let loanTax = 0.1594;
  let solidarityTax = 0.055;
  let churchTax = 0.09;
  let medicare = 0.146;
  let mediFee = 0.009;
  let nursingInsuranceFee = 0.0235;
  let pensionInsuranceFee = 0.187;
  let unemploymentInsuranceFee = 0.03;

  const setGross = (newGross) => {
    gross = newGross;
  };

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

  return {
    setGross: setGross,
    getLoanTaxCost: getLoanTaxCost,
    getSolidarityTaxCost: getSolidarityTaxCost,
    getChurchTaxCost: getChurchTaxCost,
    getMedicareCost: getMedicareCost,
    getNursingInsuranceCost: getNursingInsuranceCost,
    getPensionInsuranceCost: getPensionInsuranceCost,
    getUnemploymentInsuranceCost: getUnemploymentInsuranceCost,
    getNet: getNet,
    eachMonthNet: eachMonthNet,
    describe: (gross) => {
      if(gross) setGross(gross);
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
    }
  };
};

module.exports = Salary;
