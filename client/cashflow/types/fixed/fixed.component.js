function CashflowFixedTypeController($scope, $element, $attrs, Cashflow) {
  var ctrl = this;

  ctrl.$onInit = function() {

  };
}

angular.module('app').component('cashflowFixedType', {
  templateUrl: '/client/cashflow/types/fixed/fixed.component.html',
  controller: CashflowFixedTypeController,
  bindings: {
    asset: "="
  }
});
