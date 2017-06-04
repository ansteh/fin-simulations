function CashflowController($scope, $element, $attrs, Cashflow) {
  var ctrl = this;

  ctrl.$onInit = function() {
    Cashflow.loadAssets()
      .then(function() {
        ctrl.assets = Cashflow.getAssets();
      }, function(err) {
        console.log(err);
      });

    ctrl.createChart();
  };

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

  ctrl.createChart = function() {
    var element = _.first($element.find('.ct-chart'));

    new Chartist.Line(element, {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [5, 9, 7, 8, 5, 3, 5, 4],
        [3, 8, 4, 6, 2, 1, 4, 2]
      ]
    }, {
      low: 0,
      showArea: true,
      showPoint: false,
      fullWIdth: true,
    });
  }
}

angular.module('app').component('cashflow', {
  templateUrl: '/client/cashflow/cashflow.component.html',
  controller: CashflowController
});
