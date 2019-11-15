/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('monitoringdcslctrl', monitoringdcslctrl);

    /** @ngInject */
    function monitoringdcslctrl($state, $scope, reportService, $filter, monitoringService, editableOptions, editableThemes, managequestionaireService, manageparticipantService) {
        var vm = this;
        vm.searchParam = {
            year: (new Date()).getFullYear(),
            questType: "DCSL"
        }
        vm.quartals = [
            { label: "I", value: 1 },
            { label: "II", value: 2 },
            { label: "III", value: 3 },
            { label: "IV", value: 4 }
        ];

        vm.statusItems = [
            { label: "All", value: -1 },
            { label: "Published", value: 5 },
            { label: "Completed", value: 6 }
        ];
        vm.filterquartal = {}// vm.quartals[0];
        vm.searchParam.quartal = vm.filterquartal.value
        vm.filterStatus = vm.statusItems[0];
        vm.searchParam.status = vm.filterStatus.value;
        // managequestionaireService.getQuestionnaireType().then(function (result) {
        //     vm.questTypeItems = result.data;
        //     vm.filterquestType = vm.questTypeItems[0];
        //     vm.searchParam.questType = vm.filterquestType.value
        // });
        vm.getagama = function(){
            managequestionaireService.getRegion().then(function (result) {
                if (result.data) {
                    vm.regionItems = result.data;
                    vm.filterRegion = result.data[0];
                    vm.searchParam.regionID = vm.filterRegion.ID;
                }
            });
        }
        vm.changeRegion = function () {
            vm.searchParam.regionID = vm.filterRegion.Code;
            vm.refreshDealer(vm.filterRegion.Code);
        }
        vm.refreshDealer = function (param) {
            monitoringService.getDealerMonitoring(param).then(function (result) {
                if (result.data) {
                    if (result.data.length > 0) {
                        vm.branchItems = result.data;
                        vm.filterbranchItem = vm.branchItems[0];
                        vm.searchParam.branchID = vm.filterbranchItem.Code;
                    }
                }
            });
        }
        // manageparticipantService.getBranch().then(function (result) {
        //     vm.branchItems = result.data;
        //     vm.filterbranchItem = vm.branchItems[0];
        //     vm.searchParam.branchID = vm.filterbranchItem.ID
        // });
        managequestionaireService.getTemplate().then(function (result) {
            vm.templateItems = result.data;
            vm.filterTemplate = result.data[0];
            vm.searchParam.questName = vm.filterTemplate.value;
            vm.getagama();
        });
        vm.getColorprogress = function (val) {
            return val < 50 ? "progress-bar progress-bar-danger progress-bar-striped active"
                : val < 75 ? "progress-bar progress-bar-warning progress-bar-striped active"
                    : "progress-bar progress-bar-success progress-bar-striped active";
        };
        vm.actionSelect = function (params) {
            $state.go('monitoring.detail', { questionaire: params });
        };
        vm.changeTypeQuestionnaire = function () {
            vm.searchParam.questType = vm.filterquestType.value;
            if (vm.filterquestType.label != 'DCSL') { vm.filterquartal = null; vm.searchParam.quartal = null };
        }
        vm.gridQuestionaire = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                {
                    name: 'action', enableFiltering: false, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" ng-click="grid.appScope.vm.actionSelect(row.entity)" class="btn btn-success  btn-xs"><i class="ion-android-checkmark-circle"></i></button></div>', width: 100
                },

                {
                    name: 'progress',
                    displayName: "Progress", width: 300,
                    cellTemplate: '<div class="progress" title="{{row.entity.progress}}% Complete"><div class="{{grid.appScope.vm.getColorprogress(row.entity.progress)}}" role="progressbar" aria-valuenow="{{row.entity.progress}}" aria-valuemin="0" aria-valuemax="100" style="width: {{row.entity.progress}}%"><span>{{row.entity.progress}}% Complete </span></div></div>'
                },
                { name: 'questionnaireId', displayName: "Questionnaire Id", width: 200, visible: false },
                { name: 'questionnaireCode', displayName: "Questionnaire Code", width: 200 },
                { name: 'questionnaireName', displayName: "Questionnaire Name", width: 300 },
                { name: 'regionCode', displayName: "Region Code", width: 200 },
                { name: 'regionName', displayName: "Region Name", width: 200 },
                { name: 'branchCode', displayName: "Dealer Code", width: 200 },
                { name: 'branchName', displayName: "Dealer Name", width: 200 },
                { name: 'dealerType', displayName: "Dealer Type", width: 170 },
                { name: 'status', displayName: "Status Complete", width: 200 },
                { name: 'createdBy', displayName: "Created By", width: 200 },
                { name: 'startDistributionDate', displayName: "Start Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'endDistributionDate', displayName: "End Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'totalTarget', displayName: "Total Target", width: 100 },
                { name: 'description', displayName: "Description", width: 200, visible: false }
            ],
            data: []
        };
        vm.refreshGrid = function () {
            monitoringService.getmonitoring(vm.searchParam).then(function (result) {
                vm.gridQuestionaire.data = result.data;
            });
        }
        vm.resetGrid = function () {
            vm.gridQuestionaire.data = [];
        }
    }

})();
