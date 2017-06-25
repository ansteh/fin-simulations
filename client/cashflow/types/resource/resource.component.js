function CashflowResourceTypeController($scope, $element, $attrs, Cashflow) {
  var ctrl = this;

  ctrl.position = undefined;

  ctrl.$onInit = function() {
    if(_.has(ctrl.asset, 'cashflow') === false) {
      ctrl.asset.cashflow = [];
    }
  };

  ctrl.open = function(position) {
    if(position) {
      ctrl.position = position;
    } else {
      ctrl.position = {
        value: 0,
        date: new Date()
      }
    }
  };

  ctrl.insert = function() {
    ctrl.asset.cashflow.push(ctrl.position);
    ctrl.position = undefined;
  };

  ctrl.remove = function(position) {
    _.remove(ctrl.asset.cashflow, position);
  };
}

angular.module('app').component('cashflowResourceType', {
  templateUrl: '/client/cashflow/types/resource/resource.component.html',
  controller: CashflowResourceTypeController,
  bindings: {
    asset: "="
  }
});
