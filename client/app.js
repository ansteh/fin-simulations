(function(angular) {

  var app = angular.module('app', ['ngMaterial']);

  app.factory('Request', function($http) {
    function get(url){
      return new Promise(function(resolve, reject){
        $http({ method: 'GET', url: url })
        .then(function (response) {
          resolve(response.data);
        }, function (err) {
          reject(err);
        });
      });
    };

    return {
      get: get
    };
  });

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
        return salary;
      });
    };

    function getInstance() {
      return new Promise(function(resolve, reject){
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

    return {
      getInstance: getInstance
    };
  });

  app.directive('salary', function(Salary){
    return {
      restrict: 'E',
      templateUrl: '/client/salary/tpl.html',
      scope: {},
      controller: function($scope, $element) {
        var salary;

        Salary.getInstance()
        .then(function(instance) {
          salary = instance;
          $scope.update(40000);
          $scope.$apply();
        })
        .catch(function(err) {
          console.log(err);
        });

        $scope.stats = {
          net: 0,
          loanTax: 0,
          solidarityTax: 0,
          churchTax: 0,
          medicareCost: 0,
          nursingInsuranceCost: 0,
          pensionInsuranceCost: 0,
          unemploymentInsuranceCost: 0
        };

        $scope.update = function(gross) {
          salary.setGross(gross);
          $scope.stats.net = salary.getNet();
          $scope.stats.loanTax = salary.getLoanTaxCost();
          $scope.stats.solidarityTax = salary.getSolidarityTaxCost();
          $scope.stats.churchTax = salary.getChurchTaxCost();
          $scope.stats.medicareCost = salary.getMedicareCost();
          $scope.stats.nursingInsuranceCost = salary.getNursingInsuranceCost();
          $scope.stats.pensionInsuranceCost = salary.getPensionInsuranceCost();
          $scope.stats.unemploymentInsuranceCost = salary.getUnemploymentInsuranceCost();
        };
      }
    };
  });

}(angular));
