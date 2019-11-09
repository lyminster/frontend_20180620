/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.report')
        .controller('generatereportctrl', generatereportctrl);

    /** @ngInject */
    function generatereportctrl($state, reportService, authService, $scope, $filter, toastr, editableOptions, editableThemes, managequestionaireService, manageparticipantService) {
        var vm = this;
        
        vm.itsAllowFunction = authService.itsAllowFunction;
        vm.searchParam = {
            year: (new Date()).getFullYear()//,
            //questID: 12
            , questName: ""
        }
        vm.quartals = [
            { label: "I", value: 1 },
            { label: "II", value: 2 },
            { label: "III", value: 3 },
            { label: "IV", value: 4 }
        ];
        // vm.completeItems = [
        //     { label: "ALL", value: null },
        //     { label: "YES", value: "YES" },
        //     { label: "NO", value: "NO" }
        // ];
        vm.filterquartal = {};//vm.quartals[0];
        vm.searchParam.quartal = vm.filterquartal.value;

        managequestionaireService.getQuestionnaireType().then(function (result) {
            vm.questTypeItems = result.data.filter(function (el) {
                return el.value != "";
            });

            if (!vm.itsAllowFunction('report.dcsl')) {
                vm.questTypeItems = vm.questTypeItems.filter(function (el) {
                    return el.value != 'DCSL';
                });
            }
            if (!vm.itsAllowFunction('report.olright')) {
                vm.questTypeItems = vm.questTypeItems.filter(function (el) {
                    return el.value != 'OLRIGHT';
                });
            }
            vm.filterquestType = vm.questTypeItems[0];
            vm.searchParam.questType = vm.filterquestType.value;
            vm.filterquartal = vm.quartals[0];
            vm.searchParam.quartal = vm.filterquartal.value;
        });

        reportService.getreportregion().then(function (result) {
            vm.regionItems = result.data;
            vm.filterRegion = result.data[0];
            vm.searchParam.regionID = vm.filterRegion.Code;
            vm.refreshDealer(vm.filterRegion.Code);
        });
        vm.changeRegion = function () {
            vm.searchParam.regionID = vm.filterRegion.Code;
            vm.refreshDealer(vm.filterRegion.Code);
        }
        vm.refreshDealer = function (param) {
            reportService.getreportdealer(param).then(function (result) {
                vm.branchItems = result.data;
                vm.filterbranchItem = vm.branchItems[0];
                vm.searchParam.branchID = vm.filterbranchItem.Code
            });
        }

        managequestionaireService.getTemplate().then(function (result) {
            vm.templateItems = result.data;
            vm.filterTemplate = result.data[0];
            vm.searchParam.questName = vm.filterTemplate.value;
        });
        vm.getColorprogress = function (val) {
            return val < 50 ? "progress-bar progress-bar-danger progress-bar-striped active"
                : val < 75 ? "progress-bar progress-bar-warning progress-bar-striped active"
                    : "progress-bar progress-bar-success progress-bar-striped active";
        };
        vm.generateReport = function () {
            $state.go('report.generatedreport', { param: vm.searchParam });
        };
        vm.actionSelect = function (row) {
            row.questionnaireId = row.id;
            $state.go('report.generatedreport', { param: row.questionnaireId });
        };
        vm.filterquestType = {};
        vm.cekEnable = function () {
            return vm.filterquestType.label == 'DCSL';
        }
        vm.gridQuestionaire = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                {
                    name: 'action', enableFiltering: false, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button ng-disabled="grid.appScope.vm.cekEnable()" type="button" ng-click="grid.appScope.vm.showGraph(row.entity)" class="btn btn-success  btn-xs"><i class="ion-checkmark-round"></i></button></div>', width: 100
                },
                {
                    name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>'
                },
                { name: 'id', displayName: "Questionnaire Id", width: 200, visible: false },
                { name: 'questCode', displayName: "Questionnaire Code", width: 200 },
                { name: 'questName', displayName: "Questionnaire Name", width: 300 },
                { name: 'regionCode', displayName: "Region Code", width: 200 },
                { name: 'regionName', displayName: "Region Name", width: 200 },
                { name: 'branchCode', displayName: "Dealer Code", width: 200 },
                { name: 'branchName', displayName: "Dealer Name", width: 200 },
                { name: 'dealerType', displayName: "Dealer Type", width: 170 },
                { name: 'status', displayName: "Status Complete", width: 200 },
                //{ name: 'completed', displayName: "Complete", width: 100 , cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.complate" disabled></div>' },
                { name: 'createdBy', displayName: "Created By", width: 200 },
                { name: 'startDate', displayName: "Start Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'endDate', displayName: "End Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'totalTarget', displayName: "Total Target", width: 100 },
                { name: 'description', displayName: "Description", width: 200, visible: false }
            ],
            data: []
        };
        vm.refreshGrid = function () {
            reportService.postSerachRowData(vm.searchParam).then(
                function (result) {
                    vm.gridQuestionaire.data = result.data;
                }
            );
        };
        vm.resetGrid = function () {
            vm.gridQuestionaire.data = [];
            // vm.filterStatus = vm.statusItems[0];
            // vm.searchParam.status = vm.filterStatus.value;
            vm.filterTemplate = vm.templateItems[0];
            vm.searchParam.questName = vm.filterTemplate.value;
            vm.filterbranchItem = vm.branchItems[0];
            vm.searchParam.branchID = vm.filterbranchItem.Code
            vm.filterRegion = vm.regionItems[0];
            vm.searchParam.regionID = vm.filterRegion.Code;
            vm.filterquestType = vm.questTypeItems[0];
            vm.searchParam.questType = vm.filterquestType.value;
            vm.filterquartal = vm.quartals[0];
            // vm.filterComplate = vm.completeItems[0];
            // vm.searchParam.complete = vm.filterComplate.value;
            vm.searchParam.quartal = vm.filterquartal.value;
            vm.searchParam.year = (new Date()).getFullYear();
        };
        vm.showGraph = function (row) {
            row.questionnaireId = row.id;
            $state.go('monitoring.olrightdetailgraph', { questionaire: row });
        }
        vm.downloadrow = function () {
            toastr.info('This Fiture will available soon', 'Info');
        };
    }
})();