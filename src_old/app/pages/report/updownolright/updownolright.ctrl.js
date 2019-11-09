/**
 * @author v.ichwan
 * created on 16.12.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.report')
        .controller('updownolrightctrl', updownolrightctrl);

    /** @ngInject */
    function updownolrightctrl($state, ngAuthSettings, $window, reportService, $scope, $filter, toastr, editableOptions, editableThemes, managequestionaireService, manageparticipantService, $uibModal) {
        var vm = this;
        vm.serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
        vm.searchParam = {
            year: (new Date()).getFullYear(),
            questType: "OLRIGHT"
        }

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
        vm.getColorprogress = function (val) {
            return val < 50 ? "progress-bar progress-bar-danger progress-bar-striped active"
                : val < 75 ? "progress-bar progress-bar-warning progress-bar-striped active"
                    : "progress-bar progress-bar-success progress-bar-striped active";
        };
        vm.actionSelect = function (params) {
            $state.go('report.questionnairedetail', { id: params.id });
        };
        vm.gridQuestionaire = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                {
                    name: 'action', enableFiltering: false, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" title="download" ng-click="grid.appScope.vm.downloadrow(row.entity.id)" class="btn btn-success  btn-xs"><i class="ion-ios-cloud-download"></i></button><button type="button" title="Upload" ng-click="grid.appScope.vm.openUploadFile(row.entity.id)" class="btn btn-success  btn-xs"><i class="ion-upload"></i></button></div>', width: 100
                },
                { name: 'id', displayName: "Questionnaire Id", width: 200, visible: false },
                { name: 'questCode', displayName: "Questionnaire Code", width: 200 },
                { name: 'questName', displayName: "Questionnaire Name", width: 300 },
                { name: 'regionCode', displayName: "Region Code", width: 200 },
                { name: 'regionName', displayName: "Region Name", width: 200 },
                // { name: 'branchCode', displayName: "Dealer Code", width: 200 },
                // { name: 'branchName', displayName: "Dealer Name", width: 200 },
                // { name: 'dealerType', displayName: "Dealer Type", width: 170 },
                { name: 'status', displayName: "Status Complete", width: 200 },
                //{ name: 'completed', displayName: "Complete", width: 100 , cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.complate" disabled></div>' },
                { name: 'createdBy', displayName: "Created By", width: 200 },
                { name: 'startDate', displayName: "Start Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'endDate', displayName: "End Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                //{ name: 'totalTarget', displayName: "Total Target", width: 100 },
                { name: 'description', displayName: "Description", width: 200, visible: false }
            ],
            data: []
        };

        vm.refreshGrid = function () {
            reportService.postSerachRowData(vm.searchParam).then(function (result) {
                vm.gridQuestionaire.data = result.data;
            });
        }

        vm.resetGrid = function () {
            vm.gridQuestionaire.data = [];
            vm.filterbranchItem = vm.branchItems[0];
            vm.searchParam.branchID = vm.filterbranchItem.Code
            vm.filterRegion = vm.regionItems[0];
            vm.searchParam.regionID = vm.filterRegion.Code;
            vm.searchParam.questType = { label: "OLRIGHT", value: "OLRIGHT" };
            vm.searchParam.year = (new Date()).getFullYear();
        }
        vm.openUploadFile = function (_id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/monitoring/modal/uploadfile.html',
                size: 'md',
                controller: 'uploadfilectrl',
                resolve: {
                    content: function () {
                        return { 'data': _id };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                //Console.log(result);
                toastr.success('File :' + result + ' success uploaded.', 'Success');
            }, function () {
            });
        }
        vm.downloadrow = function (row) {
            reportService.downloadfile(row).then(function (result) {
                if (result.data.fileName) {
                    var wdw = $window.open(vm.serviceBase + 'file/' + result.data.fileName, '_blank');
                    console.log(result);
                    setTimeout(function () {
                        wdw.close();
                    }, 5000);    
                }else{
                    toastr.error('File not found.', 'Error');
                }
                
            });
            //toastr.info('This Fiture will available soon', 'Info');
        }
    }

})();
