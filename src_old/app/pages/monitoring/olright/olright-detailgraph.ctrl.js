/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('olrightdetailgraphctrl', olrightdetailgraphctrl);

    /** @ngInject */
    function olrightdetailgraphctrl($state, monitoringService, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, fillingquestionaireService, authService, $stateParams, managequestionaireService) {
        var vm = this;
        vm.printmode = false;
        vm.title = 'Graphic'
        vm.printDiv = function (divName) {
            var htmlString = angular.copy(document.getElementById(divName).innerHTML);
            var jHtmlObject = jQuery(htmlString);
            var editor = jQuery("<p>").append(jHtmlObject);
            editor.find("#IdCustomSelect").remove();
            var printContents = editor.html();
            var popupWin = window.open('', '_blank', 'width=600,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body style="color:black!important;" onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        };
        if ($stateParams.questionaire === null) {
            $state.go('monitoring.olright');
            return;
        }
        vm.questionaire = $stateParams.questionaire;
        monitoringService.getOnechartdata(vm.questionaire.questionnaireId).then(function (result) {
            vm.questionnaire = result.data
        });
        vm.selectdateItems = [
            { label: "Date", value: "date" },
            { label: "Month", value: "month" }
        ]
        vm.filterDate = function (qiestionnaire) {
            if (!qiestionnaire.realValue) {
                qiestionnaire.realValue = angular.copy(qiestionnaire.graphValue);
            }
            var result = [];
            if (qiestionnaire.datefilter.value == 'month') {
                var temp = angular.copy(qiestionnaire.graphValue);
                for (var index = 0; index < temp.length; index++) {
                    var element = temp[index];
                    element.label = element.label.substring(3);
                }
                temp.reduce(function (res, value) {
                    if (!res[value.label]) {
                        res[value.label] = {
                            value: 0,
                            label: value.label
                        };
                        result.push(res[value.label])
                    }
                    res[value.label].value += Number(value.value)
                    return res;
                }, {});
                qiestionnaire.realValue = angular.copy(qiestionnaire.graphValue);
                qiestionnaire.graphValue = result;
            } else {
                qiestionnaire.graphValue = angular.copy(qiestionnaire.realValue);
                result = angular.copy(qiestionnaire.realValue);
            }
            qiestionnaire.control.refresh(qiestionnaire.graphtype.value, result);
        }
        vm.grapicItems = [
            { label: "Bar Chart", value: "chartbarhorisontal" },
            { label: "Column Chart", value: "chartbarvertical" },
            { label: "Line Chart", value: "chartlinehorisontal" },
            { label: "Worm Chart", value: "chartlinevertical" },
            { label: "Pie Chart", value: "chartpie" },
            { label: "Spider Nest Chart", value: "chartspider" }
        ]
    }
})();
