app.directive('interestCompare', function(Accounting, Request){
  return {
    restrict: 'E',
    templateUrl: '/client/interest-compare/tpl.html',
    scope: {
      investment: "=",
      seed: "=",
      rate: "=",
      runtime: "="
    },
    controller: function($scope, $element) {
      function createSeriesBy(calculation) {
        return _.map(_.range($scope.runtime), function(runtime) {
          return _.round(calculation.output({ seed: $scope.seed, rate: $scope.rate, runtime: runtime }), 2);
        });
      };

      $scope.series = [];
      $scope.update = function() {
        $scope.simple = createSeriesBy(Interest.simple);
        $scope.compound = createSeriesBy(Interest.compound);
        $scope.series = _.zip($scope.simple, $scope.compound);
        _.forEach($scope.series, function(data) {
          data.push(_.round((data[1]-data[0])/data[1], 2));
        });
      };
      $scope.update();
    }
  };
});
