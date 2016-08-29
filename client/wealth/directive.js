app.directive('wealth', function(Accounting, Request){
  return {
    restrict: 'E',
    templateUrl: '/client/wealth/tpl.html',
    scope: {},
    controller: function($scope, $element) {
      $scope.gross = 40000;

      var updateGross = function() {
        var value = Accounting.findValueOf('job');
        $scope.gross = value ? _.round(value*12, 2) : 40000;
      };

      Request.get('/salary/get/local')
      .then(function(data) {
        console.log(data);
        Accounting.setBalance(data);
        updateGross();
      });
    }
  };
});
