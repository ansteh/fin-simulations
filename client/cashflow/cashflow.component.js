function CashflowController($scope, $element, $attrs, Cashflow) {
  var ctrl = this;

  var getChartSeries = function() {
    var start = moment().startOf('year').toDate();
    var end = moment().endOf('year').toDate();
    return Cashflow.getCashflowByRange(start, end, 'month');
  };

  ctrl.asset = {};
  ctrl.series = {};

  ctrl.$onInit = function() {
    ctrl.assetTypes = Cashflow.getAssetTypes();

    Cashflow.loadAssets()
      .then(function() {
        ctrl.assets = Cashflow.getAssets();

        var seriesCashflow = _
          .chain(getChartSeries())
          .map('cashflow')
          .value();

        ctrl.series = [
          seriesCashflow
        ];
      }, function(err) {
        console.log(err);
      });
  };

  ctrl.addAsset = function() {
    Cashflow.addAsset(ctrl.asset)
      .then(function(asset) {
        ctrl.assets = Cashflow.getAssets();
        ctrl.asset = {};
      }, function(err) {
        console.log(err);
      });
  };

  ctrl.getCashflow = function(date, delimiter) {
    return Cashflow.getCashflow(date, delimiter);
  }

  ctrl.getCashflowByRange = function(start, end, delimiter) {
    return Cashflow.getCashflowByRange(start, end, delimiter);
  }
}

angular.module('app').component('cashflow', {
  templateUrl: '/client/cashflow/cashflow.component.html',
  controller: CashflowController
});
