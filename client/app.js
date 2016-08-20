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

  app.directive('salary', function(Salary){
    return {
      restrict: 'E',
      templateUrl: '/client/salary/tpl.html',
      scope: {},
      controller: function($scope, $element) {
        $scope.gross = 40000;
        var salary;

        Salary.getInstance()
        .then(function(instance) {
          salary = instance;
          $scope.update($scope.gross);
          $scope.$apply();
        })
        .catch(function(err) {
          console.log(err);
        });

        var interpolation = _.range(20000, 45000, 1000);
        Salary.simulate(interpolation)
        .then(function(items) {
          //console.log(items);
          var nets = _.map(items, function(stamp) {
            return stamp.net;
          });
          new Chartist.Line('.ct-net', {
            labels: interpolation,
            series: [
              nets,
              _.map(items, function(stamp) {
                return stamp.loanTax;
              })
            ]
          }, {
            low: 0,
            showArea: true
          });

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

        var alignCosts = function() {
          var costs = _.map($scope.stats, function(value, name) {
            return {
              name: name,
              value: value
            };
          });
          costs = _.sortBy(costs, 'value').reverse();
          costs = _.slice(costs, 1);
          //console.log(costs);
          return costs;
        };

        $scope.update = function() {
          salary.setGross($scope.gross);
          $scope.eachMonthNet = salary.eachMonthNet();
          $scope.stats.net = salary.getNet();
          $scope.stats.loanTax = salary.getLoanTaxCost();
          $scope.stats.solidarityTax = salary.getSolidarityTaxCost();
          $scope.stats.churchTax = salary.getChurchTaxCost();
          $scope.stats.medicareCost = salary.getMedicareCost();
          $scope.stats.nursingInsuranceCost = salary.getNursingInsuranceCost();
          $scope.stats.pensionInsuranceCost = salary.getPensionInsuranceCost();
          $scope.stats.unemploymentInsuranceCost = salary.getUnemploymentInsuranceCost();
          $scope.costs = alignCosts();
          $scope.plot();
        };

        $scope.plot = function() {
          var data = {
            labels: [],
            series: []
          };

          _.forOwn($scope.stats, function(value, name) {
            data.labels.push(name);
            data.series.push(value);
          });


          var options = {
            labelInterpolationFnc: function(value) {
              return value[0]
            }
          };

          var sum = function(a, b) { return a + b };

          var responsiveOptions = [
            ['screen and (min-width: 640px)', {
              chartPadding: 30,
              labelOffset: 100,
              labelDirection: 'explode',
              labelInterpolationFnc: function(name, index) {
                return _.round(data.series[index] / data.series.reduce(sum) * 100, 2) + '% '+name;
                return value;
              }
            }],
            ['screen and (min-width: 1024px)', {
              labelOffset: 80,
              chartPadding: 20
            }]
          ];

          new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
        };
      }
    };
  });

}(angular));
