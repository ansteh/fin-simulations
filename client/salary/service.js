app.factory('Salary', function(Request) {
  var getLoanTax;
  var salary;

  var getLoanTaxGenerator = _.curry(function(equation, loan) {
    let tax = 0;
    let exponentAccu = 1;
    _.forEach(equation, (a, exponent) => {
      tax += a*exponentAccu;
      exponentAccu *= loan;
    });
    return tax;
  });

  function initSalary() {
    return Request.get('/salary-table')
    .then(function(equation) {
      getLoanTax = getLoanTaxGenerator(equation);
      salary = Salary(getLoanTax);
      //salary.setConditions({churchTax: 0});
      return salary;
    });
  };

  function getInstance() {
    return new Promise(function(resolve, reject) {
      if(salary) {
        resolve(salary);
      } else {
        initSalary()
        .then(function(salary) {
          resolve(salary);
        })
        .catch(function(err) {
          reject(err);
        })
      }
    });
  };

  var stamp = function(salary, gross) {
    salary.setGross(gross);
    return {
      eachMonthNet: salary.eachMonthNet(),
      net: salary.getNet(),
      loanTax: salary.getLoanTaxCost(),
      solidarityTax: salary.getSolidarityTaxCost(),
      churchTax: salary.getChurchTaxCost(),
      medicareCost: salary.getMedicareCost(),
      nursingInsuranceCost: salary.getNursingInsuranceCost(),
      pensionInsuranceCost: salary.getPensionInsuranceCost(),
      unemploymentInsuranceCost: salary.getUnemploymentInsuranceCost()
    };
  };

  var simulate = function(points) {
    return getInstance()
    .then(function(salary) {
      return _.map(points, function(gross) {
        return stamp(salary, gross);
      });
    });
  };

  return {
    getInstance: getInstance,
    simulate: simulate
  };
});
