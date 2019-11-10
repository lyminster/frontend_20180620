/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('manageapprovalquestionairectrl', manageapprovalquestionairectrl);

    /** @ngInject */
    function manageapprovalquestionairectrl($q, $state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService, $stateParams) {
        var vm = this;
        vm.filterRegion = {};
        vm.itsAllowFunction = authService.itsAllowFunction;
        vm.startDate = new Date();
        vm.endDate = new Date();
        vm.startDate.setDate(vm.startDate.getDate() - 30);
        vm.endDate.setDate(vm.endDate.getDate() + 30);
        vm.searchParamApproval = {
            start: '',
            end: ''
        }
        vm.refreshGridApproval = function () {
            managequestionaireService.getApprovalQuestionnaire(vm.searchParamApproval).then(function (result) {
                console.log(result);
                vm.gridQuestionaireApproval.data = result.data;
            });
        }
        vm.clearGridApproval = function () {

            vm.gridQuestionaireApproval.data = [];

            vm.filterquestTypeApv = {};
            vm.filterquartal = {};
            vm.filterRegionApv = {};
            vm.searchParamApproval = {
                start: '',
                end: ''
                // start: [vm.startDate.getFullYear(), vm.startDate.getMonth(), vm.startDate.getDate()].join('-'),
                // end: [vm.endDate.getFullYear(), vm.endDate.getMonth(), vm.endDate.getDate()].join('-')
            }
        }
        vm.quartals = [
            { label: "I", value: 1 },
            { label: "II", value: 2 },
            { label: "III", value: 3 },
            { label: "IV", value: 4 }
        ];


        // managequestionaire.approval.dcsl
        // managequestionaire.approval.olright
        vm.getQuestionnaireType = function () {
            managequestionaireService.getQuestionnaireType().then(function (result) {
                vm.questTypeItems = result.data;
                if (!vm.itsAllowFunction('managequestionaire.approval.dcsl')) {
                    vm.questTypeItems = vm.questTypeItems.filter(function (elm) {
                        return elm.value != 'DCSL' && elm.value != '';
                    });
                }
                if (!vm.itsAllowFunction('managequestionaire.approval.olright')) {
                    vm.questTypeItems = vm.questTypeItems.filter(function (elm) {
                        return elm.value != 'OLRIGHT' && elm.value != '';
                    });
                }
                vm.filterquestTypeApv = vm.questTypeItems[0];
                vm.searchParamApproval.questType = vm.filterquestTypeApv.value;
                vm.getRegionType();
            });
        };
        vm.getQuestionnaireType();
        vm.getRegionType = function () {
            managequestionaireService.getRegion().then(function (result) {
                vm.regionItems = result.data;
                vm.filterRegionApv = result.data[0];
                vm.searchParamApproval.region = vm.filterRegionApv.Code;
            });
        }
        vm.changeTypeQuestionnaire = function () {
            vm.searchParamApproval.questType = vm.filterquestTypeApv.value;
            if (vm.filterquestTypeApv.label != 'DCSL') { vm.filterquartal = null; vm.searchParamApproval.quartal = null };
        }
        vm.gridQuestionaireApproval = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                {
                    name: 'action', enableFiltering: false, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" title="Approval" ng-click="grid.appScope.vm.actionEdit(row.entity)" class="btn btn-success  btn-xs"><i class="ion-checkmark-round"></i></button></div>', width: 100
                },
                { name: 'questionnaireCode', displayName: "Questionnaire Code", width: 200 },
                { name: 'questionnaireName', displayName: "Questionnaire Name", width: 300 },
                { name: 'regionCode', displayName: "Region Code", width: 200 },
                { name: 'regionName', displayName: "Region Name", width: 200 },
                { name: 'branchCode', displayName: "Dealer Code", width: 200 },
                { name: 'branchName', displayName: "Dealer Name", width: 200 },
                { name: 'dealerType', displayName: "Dealer Type", width: 170 },
                { name: 'statusName', displayName: "Status", width: 200 },
                { name: 'createdBy', displayName: "Created By", width: 200 },
                { name: 'createdDate', displayName: "Created Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 }
            ]
        };
        vm.getTitleaction = function (row) {
            if (row.status == '0' || row.status == '4') {
                return 'edit'; //edit
            } else if (row.status == '1') {
                return 'Approve'; //approve
            } else if (row.status == '2' || row.status == '5' || row.status == '6' || row.status == '3') {
                return 'Duplicate'; //duplicate
            } else {
                return '';
            }
        }
        vm.gridQuestionaireApproval.data = [];
        

        vm.actionEdit = function (row) {
            if (row.questionnaireType == 'OLRIGHT') {
                $state.go('managequestionaire.detailapprove', { id: row.scenarioID, typeolright: true });
            } else {
                $state.go('managequestionaire.detailapprove', { id: row.scenarioID, typeolright: false });
            }
        };
    }
})();
