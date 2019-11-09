/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('wormChart', wormChart);

  /** @ngInject */
  function wormChart($q, layoutPaths, baConfig) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        options: '=',
        dataprovider: '=',
        chart: '=?',
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
        var options = {
          "type": "serial",
          "theme": "none",
          "color": layoutColors.defaultText,
          "dataDateFormat": "YYYY-MM-DD",
          "precision": 2,
          "valueAxes": [{
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText,
            gridColor: layoutColors.defaultText,
            "id": "v1",
            "title": "Nominal",
            "position": "left",
            "autoGridCount": false,
            "labelFunction": function (value) {
              return "" + Math.round(value) + "";
            }
          }],
          "graphs": [{
            "id": "g3",
            "valueAxis": "v1",
            "bullet": "square",
            "bulletBorderAlpha": 1,
            "bulletColor": layoutColors.defaultText,
            color: layoutColors.defaultText,
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": layoutColors.info,
            ////"type": "smoothedLine",
            "useLineColorForBulletBorder": true,
            "title": "Rata Rata Dealer",
            "valueField": "rataRataDealer",
            "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
          }, {
            "id": "g4",
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": layoutColors.defaultText,
            color: layoutColors.defaultText,
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": layoutColors.success,
            //"type": "smoothedLine",
            "useLineColorForBulletBorder": true,
            "title": "Rata Rata Nasional",
            "valueField": "rataRataNasional",
            "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
          }, {
            "id": "g1",
            "valueAxis": "v2",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": layoutColors.defaultText,
            color: layoutColors.defaultText,
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": layoutColors.danger,
            //"type": "smoothedLine",
            "title": "Target Region",
            "useLineColorForBulletBorder": true,
            "valueField": "targetRegion",
            "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
          }, {
            "id": "g2",
            "valueAxis": "v2",
            color: layoutColors.defaultText,
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": layoutColors.defaultText,
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": layoutColors.warning,
            //"type": "smoothedLine",
            "dashLength": 5,
            "title": "Rata Rata Region",
            "useLineColorForBulletBorder": true,
            "valueField": "rataRataRegion",
            "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
          }],
          "chartScrollbar": {
            "graph": "g1",
            "oppositeAxis": false,
            "offset": 30,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            scrollbarHeight: 50,
            backgroundAlpha: 0,
            selectedBackgroundAlpha: 0.05,
            selectedBackgroundColor: layoutColors.defaultText,
            graphFillAlpha: 0,
            autoGridCount: true,
            selectedGraphFillAlpha: 0,
            graphLineAlpha: 0.2,
            selectedGraphLineColor: layoutColors.defaultText,
            selectedGraphLineAlpha: 1
          },
          "chartCursor": {
            "pan": true,
            "cursorColor": layoutColors.danger,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha": 0,
            "valueLineAlpha": 0.2
          },
          "categoryField": "y",
          "categoryAxis": {
            "axisColor": layoutColors.defaultText,
            "color": layoutColors.defaultText,
            "labelRotation": 30,
            "gridColor": layoutColors.defaultText,
            "parseDates": false,
            "dashLength": 1,
            "minorGridEnabled": true
          },
          "legend": {
            "useGraphSettings": true,
            "position": "top",
            "color": layoutColors.defaultText
          },
          "balloon": {
            "borderThickness": 1,
            cornerRadius: 6,
            "shadowAlpha": 0
          },
          "export": {
            "enabled": true
          },
          "dataProvider": angular.copy($scope.dataprovider),
          pathToImages: layoutPaths.images.amChart
        };
        var chart = AmCharts.makeChart(id, options);
      }
    };
  }
})();