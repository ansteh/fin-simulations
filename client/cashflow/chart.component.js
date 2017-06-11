function CashflowChartController($scope, $element, $attrs, Cashflow) {
  var ctrl = this;
  var chart;

  ctrl.$onInit = function() {
    $scope.$watch(function() {
      return ctrl.series;
    }, function() {
      console.log(ctrl.series);
      ctrl.createChart();
    });
  };

  ctrl.createChart = function() {
    var element = _.first($element.find('.ct-chart'));

    chart = new Chartist.Line(element, {
      labels: Cashflow.getLabels(),
      series: ctrl.series
    }, {
      low: 0,
      showArea: true,
      showPoint: false,
      fullWIdth: true,
    });
  }
}

angular.module('app').component('cashflowChart', {
  templateUrl: '/client/cashflow/chart.component.html',
  controller: CashflowChartController,
  bindings: {
    series: '='
  }
});
