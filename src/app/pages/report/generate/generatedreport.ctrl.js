/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.report')
        .controller('generatedreportcrtl', generatedreportcrtl);

    /** @ngInject */
    function generatedreportcrtl($element, layoutPaths, $state, reportService, $scope, $filter, $stateParams, toastr, editableOptions, editableThemes, managequestionaireService, manageparticipantService, $window, baConfig) {
        var vm = this;
        if ($stateParams.param === null) {
            $state.go('report.generate');
            return;
        }
        $scope.param = $stateParams.param;
        reportService.generatewormreport($scope.param).then(function (result) {
            $scope.bundleData = result.data;
        });
        $scope.getAverage = function (graphValue, type) {
            var jumlah = graphValue.length;
            var Total = 0;
            for (var index = 0; index < graphValue.length; index++) {
                var element = graphValue[index];
                Total += element[type];
            }
            return (Total/jumlah).toFixed(2);;
        }
        $scope.printDiv = function(divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=600,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body style="color:black!important;" onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        };
    }
})();