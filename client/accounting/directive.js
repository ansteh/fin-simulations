app.directive('accounting', function(Accounting, Request){
  return {
    restrict: 'E',
    templateUrl: '/client/accounting/tpl.html',
    scope: {
      resources: "="
    },
    controller: function($scope, $element) {

      $scope.renderAccounting = function() {
        Accounting.applyProfitAndLoss();
        $scope.assets = Accounting.get('assets');
        $scope.liabilities = Accounting.get('liabilities');
        $scope.totalAssets = Accounting.total('assets');
        $scope.totalLiabilities = Accounting.total('liabilities');
      };

      $scope.asset = {};
      $scope.addAsset = function() {
        Accounting.addAsset($scope.asset);
        $scope.asset = {};
        $scope.renderAccounting();
      };

      $scope.liability = {};
      $scope.addLiability = function() {
        Accounting.addLiability($scope.liability);
        $scope.liability = {};
        $scope.renderAccounting();
      };

      $scope.save = function() {
        Request.post('/salary/save/local', Accounting.getBalance())
        .then(function(data) {
          console.log(data);
        });
      };

      $scope.$watch('resources', function() {
        //console.log($scope.resources);
        Accounting.updateAll($scope.resources);
        $scope.renderAccounting();
      });
    }
  };
});
