function CashflowResourceTypeController($scope, $element, $attrs, Cashflow) {
  var ctrl = this;

  ctrl.$onInit = function() {

  };
}

angular.module('app').component('cashflowFixedType', {
  templateUrl: '/client/cashflow/types/resource/resource.component.html',
  controller: CashflowResourceTypeController,
  bindings: {

  }
});
