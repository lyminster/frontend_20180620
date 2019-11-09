/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('chartOne', chartOne);

  /** @ngInject */
  function chartOne($q, layoutPaths, baConfig, monitoringService) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        options: '=',
        dataprovider: '=',
        chart: '=?',
        refreshFunc: '=',
        typechart: '@',
        height: '@',
        width: '@',
        id: '@'
      },
      template: '<div class="admin-chart"></div>',
      link: function ($scope, $el) {
        var layoutColors = baConfig.colors;
        function getIdForUseInAmCharts() {
          var id = $scope.id;// try to use existing outer id to create new id
          if (!id) {//generate a UUID
            var guid = function guid() {
              function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
              }

              return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
            };
            id = guid();
          }
          return id;
        }
        var id = getIdForUseInAmCharts();
        $el.attr('id', id);
        var options = monitoringService[$scope.typechart]();
        options.dataForm.dataProvider = angular.copy($scope.dataprovider);
        $scope.refreshFunc = $scope.refreshFunc || {};
        var chart = AmCharts.makeChart(id, options.dataForm);
        $scope.refreshFunc.refresh = function (_typeChart, _dataProvider) {
          var options = monitoringService[_typeChart]();
          if (_dataProvider) {
            options.dataForm.dataProvider = _dataProvider;
          }else{
            options.dataForm.dataProvider = angular.copy($scope.dataprovider);
          }
          var chart = AmCharts.makeChart(id, options.dataForm);
        }
        //$scope.refreshFunc.refresh();
      }
    };
  }
})();