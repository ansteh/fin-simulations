app.directive('salary', function(Salary){
  return {
    restrict: 'E',
    templateUrl: '/client/salary/tpl.html',
    scope: {
      monthly: "="
    },
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

      $scope.simulate = function() {
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
      };

      //$scope.simulate();

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

      var getType = function(name) {
        if(name === "net") {
          return "assets"
        } else {
          return "liabilities"
        }
      };

      var updateMonthly = function() {
        $scope.monthly = [];
        _.forEach($scope.stats, function(value, name) {
          if(name !== 'net') {
            $scope.monthly.push({
              name: name,
              value: _.round(value/12, 2),
              type: getType(name)
            });
          }
        });

        $scope.monthly.push({
          name: 'job',
          value: salary.eachMonthGross(),
          type: 'assets'
        });
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

        updateMonthly();
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
