'use strict';

const _ = {
  assign: require('lodash/assign')
};

const SalaryCalculator = (getLoanTax) => {
  let gross = 0;

  let conditions = {
    solidarityTax: 0.055,
    churchTax: 0.09,
    medicare: 0.146,
    mediFee: 0.009,
    nursingInsuranceFee: 0.0235,
    pensionInsuranceFee: 0.187,
    unemploymentInsuranceFee: 0.03
  };

  const setGross = (newGross) => {
    gross = newGross;
  };

  const setConditions = (newConditions) => {
    _.assign(conditions, newConditions);
  };

  const limitToZero = (func) => {
    return () => {
      let value = func();
      return value > 0 ? value : 0;
    };
  };

  const getLoanTaxCost = limitToZero(() => {
    return getLoanTax(gross);
  });

  const getSolidarityTaxCost = limitToZero(() => {
    return getLoanTaxCost()*conditions.solidarityTax;
  });

  const getChurchTaxCost = limitToZero(() => {
    return getLoanTaxCost()*conditions.churchTax;
  });

  const getMedicareCost = limitToZero(() => {
    return gross*(conditions.medicare*0.5 + conditions.mediFee);
  });

  const getNursingInsuranceCost = limitToZero(() => {
    //kinderlose fall, daher 0,25 Prozent mehr
    return gross*conditions.nursingInsuranceFee*0.5 + gross*0.0025;
  });

  const getPensionInsuranceCost = limitToZero(() => {
    return gross*conditions.pensionInsuranceFee*0.5;
  });

  const getUnemploymentInsuranceCost = limitToZero(() => {
    return gross*conditions.unemploymentInsuranceFee*0.5;
  });

  const getNet = limitToZero(() => {
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

  const eachMonthNet = limitToZero(() => {
    return getNet()/12;
  });

  const eachMonthGross = limitToZero(() => {
    return gross/12;
  });

  return {
    setGross: setGross,
    setConditions: setConditions,
    getLoanTaxCost: getLoanTaxCost,
    getSolidarityTaxCost: getSolidarityTaxCost,
    getChurchTaxCost: getChurchTaxCost,
    getMedicareCost: getMedicareCost,
    getNursingInsuranceCost: getNursingInsuranceCost,
    getPensionInsuranceCost: getPensionInsuranceCost,
    getUnemploymentInsuranceCost: getUnemploymentInsuranceCost,
    getNet: getNet,
    eachMonthNet: eachMonthNet,
    eachMonthGross: eachMonthGross,
    describe: (gross) => {
      if(gross) setGross(gross);
      console.log('year net:', getNet());
      console.log('month net:', eachMonthNet());
    }
  };
};

const Salary = (getLoanTax) => {
  let salary = SalaryCalculator(getLoanTax);

  return _.assign({}, salary);
};

module.exports = Salary;
