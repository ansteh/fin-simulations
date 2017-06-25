function CashflowResourceTypeController($scope, $element, $attrs, Cashflow) {
  var ctrl = this;

  ctrl.position = undefined;
  ctrl.positionIndex = undefined;

  ctrl.$onInit = function() {
    if(_.has(ctrl.asset, 'cashflow') === false) {
      ctrl.asset.cashflow = [];
    }
  };

  ctrl.open = function(position) {
    if(position) {
      ctrl.position = position;
      ctrl.positionIndex = _.findIndex(ctrl.asset.cashflow, ctrl.position);
    } else {
      ctrl.position = {
        value: 0,
        date: new Date()
      }
      ctrl.positionIndex = -1;
    }
  };

  ctrl.insert = function() {
    if(ctrl.positionIndex === -1) {
      ctrl.asset.cashflow.push(ctrl.position);
    }
    ctrl.position = undefined;

    Cashflow.updateAsset(ctrl.asset)
      .then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      })
  };

  ctrl.remove = function(position) {
    _.remove(ctrl.asset.cashflow, position);
    Cashflow.updateAsset(ctrl.asset)
      .then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      })
  };
}

angular.module('app').component('cashflowResourceType', {
  templateUrl: '/client/cashflow/types/resource/resource.component.html',
  controller: CashflowResourceTypeController,
  bindings: {
    asset: "="
  }
});
