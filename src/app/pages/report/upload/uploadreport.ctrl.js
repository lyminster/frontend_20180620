/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.report')
        .controller('reportuploadctrl', reportuploadctrl);
  
    /** @ngInject */
    function reportuploadctrl($state, $scope, $filter, toastr, editableOptions, editableThemes, managequestionaireService, manageparticipantService) {
        var vm = this;
        vm.searchParam = {
            year: (new Date()).getFullYear(),
        }
        vm.quartals = [
            { label: "I", value: 1 },
            { label: "II", value: 2 },
            { label: "III", value: 3 },
            { label: "IV", value: 4 }
        ];
        vm.completeItems = [
            { label: "ALL", value: null },
            { label: "YES", value: "YES" },
            { label: "NO", value: "NO" }
        ];
        
        reportService.getscenariostatus().then(function (result) {
            vm.statusItems = result.data;
            vm.filterStatus = vm.statusItems[0];
            vm.searchParam.status = vm.filterStatus.value;
        });
        vm.filterquartal = vm.quartals[0];
        vm.filterComplate = vm.completeItems[0];
        vm.searchParam.complete = vm.filterComplate.value;
        vm.searchParam.quartal = vm.filterquartal.value;
        managequestionaireService.getQuestionnaireType().then(function (result) {
            vm.questTypeItems = result.data;
            vm.filterquestType = vm.questTypeItems[0];
            vm.searchParam.questType = vm.filterquestType.value
        });
        managequestionaireService.getRegion().then(function (result) {
            vm.regionItems = result.data;
            vm.filterRegion = result.data[0];
            vm.searchParam.region = vm.filterRegion.ID;
        });
        manageparticipantService.getBranch().then(function (result) {
            vm.branchItems = result.data;
            vm.filterbranchItem = vm.branchItems[0];
            vm.searchParam.branch = vm.filterbranchItem.ID
        });
        vm.getColorprogress = function (val) {
            return val < 50 ? "progress-bar progress-bar-danger progress-bar-striped active" 
            : val < 75 ? "progress-bar progress-bar-warning progress-bar-striped active" 
            : "progress-bar progress-bar-success progress-bar-striped active";
        };
        vm.actionSelect = function (params) {
            $state.go('monitoring.detail', {questionaire: params});
        };
        vm.gridQuestionaire = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                {name: 'No', enableFiltering: false, field: 'No', width:50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                {
                    name: 'action', enableFiltering: false,  cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" ng-click="grid.appScope.vm.actionSelect(row.entity)" class="btn btn-success  btn-xs"><i class="ion-checkmark-round"></i></button></div>', width: 100
                },
                { name: 'questionnaireId', displayName: "Questionnaire Id", width: 200, visible:false },
                { name: 'questionnaireCode', displayName: "Questionnaire Code", width: 200 },
                { name: 'questionnaireName', displayName: "Questionnaire Name", width: 300 },
                { name: 'branchName', displayName: "Dealer Name", width: 200 },
                { name: 'regionCode', displayName: "Region Code", width: 200 },
                { name: 'dealerType', displayName: "Dealer Type", width: 170 },
                { name: 'completed', displayName: "Complete", width: 100 , cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.complate" disabled></div>' },
                { name: 'createdBy', displayName: "Created By", width: 200 },
                { name: 'startDistributionDate', displayName: "Start Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'endDistributionDate', displayName: "End Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'branchCode', displayName: "Brance Code", width: 200 },
                { name: 'totalTarget', displayName: "Total Target", width: 100 },
                { name: 'regionName', displayName: "Region Name", width: 200 },
                { name: 'reportedBy', displayName: "Reported By", width: 200 },
                { name: 'picaStatus', displayName: "Pica Status", width: 200 },
                { name: 'description', displayName: "Description", width: 200, visible:false }
            ],
            data: []
        };
        vm.refreshGrid = function () {
            vm.gridQuestionaire.data = [
                {
                    "questionnaireId": "17",
                    "questionnaireCode": "DC1777011",
                    "questionnaireName": "UseTemplate",
                    "status": "Approved",
                    "picaStatus": "Submitted",
                    "createdBy": "PAMK09001",
                    "branchCode": null,
                    "branchName": "DKI Jkt",
                    "regionCode": "G01",
                    "description": "Description",
                    "completed": true,
                    "reportedBy": "Sony", 
                    "startDistributionDate": "2017-11-01T00:00:00",
                    "endDistributionDate": "2017-11-02T00:00:00"
                },
                {
                    "questionnaireId": "16",
                    "questionnaireCode": "DC1777010",
                    "questionnaireName": "test 2",
                    "status": "Approved",
                    "picaStatus": "Draft",
                    "createdBy": "111",
                    "branchCode": null,
                    "branchName": "DKI Jkt",
                    "regionCode": "K0Z",
                    "description": "test test 2",
                    "completed": true, 
                    "reportedBy": "Samsung", 
                    "startDistributionDate": "2017-11-01T00:00:00",
                    "endDistributionDate": "2017-11-30T00:00:00"
                },
                {
                    "questionnaireId": "26",
                    "questionnaireCode": "DC1777015",
                    "questionnaireName": "Test Malam",
                    "status": "Approved",
                    "picaStatus": "-",
                    "createdBy": "PAMK09001",
                    "branchCode": "07804",
                    "branchName": "TUNAS DWIPA MATRA - PANGKALAN BALAI",
                    "regionCode": "G01",
                    "description": "oke",
                    "completed": true,
                    "reportedBy": "Pepsodent", 
                    "startDistributionDate": "2017-11-01T00:00:00",
                    "endDistributionDate": "2017-11-30T00:00:00"
                }
            ];
        };
        vm.resetGrid = function () {
            vm.gridQuestionaire.data = [];          
            vm.filterStatus = vm.statusItems[0];
            vm.searchParam.status = vm.filterStatus.value;
            vm.filterTemplate = vm.templateItems[0];
            vm.searchParam.questName = vm.filterTemplate.value;
            vm.filterbranchItem = vm.branchItems[0];
            vm.searchParam.branchID = vm.filterbranchItem.ID
            vm.filterRegion = vm.regionItems[0];
            vm.searchParam.regionID = vm.filterRegion.ID;
            vm.filterquestType = vm.questTypeItems[0];
            vm.searchParam.questType = vm.filterquestType.value;
            vm.filterquartal = vm.quartals[0];
            vm.filterComplate = vm.completeItems[0];
            vm.searchParam.complete = vm.filterComplate.value;
            vm.searchParam.quartal = vm.filterquartal.value;
            vm.searchParam.year= (new Date()).getFullYear();
        };
        vm.downloadrow = function () {
            toastr.info('This Fiture will available soon', 'Info');
        };
    }
  })();