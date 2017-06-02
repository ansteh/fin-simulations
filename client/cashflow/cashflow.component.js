function CashflowController($scope, $element, $attrs, Cashflow) {
  var ctrl = this;

  Cashflow.loadAssets()
    .then(function() {
      ctrl.assets = Cashflow.getAssets();
    }, function(err) {
      console.log(err);
    });

  ctrl.asset = {};

  ctrl.addAsset = function() {
    Cashflow.addAsset(ctrl.asset)
      .then(function(asset) {
        ctrl.assets = Cashflow.getAssets();
        ctrl.asset = {};
      }, function(err) {
        console.log(err);
      });
  };
}

angular.module('app').component('cashflow', {
  templateUrl: '/client/cashflow/cashflow.component.html',
  controller: CashflowController
});
