app.directive('accounting', function(Accounting){
  return {
    restrict: 'E',
    templateUrl: '/client/accounting/tpl.html',
    scope: {
      resources: "="
    },
    controller: function($scope, $element) {

      // Accounting.addAsset({
      //   name: 'wage',
      //   value: 2000
      // });
      //
      // Accounting.addAsset({
      //   name: 'passive income',
      //   value: 300
      // });
      //
      // Accounting.addAsset({
      //   name: 'blog income',
      //   value: 100
      // });
      //
      // Accounting.addLiability({
      //   name: 'usual',
      //   value: 1800
      // });
      //
      // Accounting.addLiability({
      //   name: 'investment',
      //   value: 500
      // });
      //
      // console.log(Accounting.total('assets'));

      $scope.renderAccounting = function() {
        $scope.assets = Accounting.get('assets');
        $scope.liabilities = Accounting.get('liabilities');
        $scope.totalAssets = Accounting.total('assets');
        $scope.totalLiabilities = Accounting.total('liabilities');
      };
      $scope.renderAccounting();

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

      $scope.$watch('resources', function() {
        //console.log($scope.resources);
        Accounting.updateAll($scope.resources);
        $scope.renderAccounting();
      });
    }
  };
});
