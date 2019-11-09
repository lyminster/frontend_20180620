/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('managequestionairectrl', managequestionairectrl);

    /** @ngInject */
    function managequestionairectrl($state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService) {
        var vm = this;
        vm.itsAllowFunction = authService.itsAllowFunction;
        vm.gridQuestionaireList = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                {
                    name: 'action', enableFiltering: false, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" title="{{grid.appScope.vm.getTitleaction(row.entity)}}" ng-click="grid.appScope.vm.actionEdit(row.entity)" class="btn btn-success  btn-xs" ng-disabled="((grid.appScope.vm.itsAllowFunction(\'managequestionaire.edit\') && row.entity.status === \'1\') && !row.entity.isedit)"><i class="{{grid.appScope.vm.getIconaction(row.entity)}}" ></i></button>  <button type="button" title="Detail" ng-click="grid.appScope.vm.actionDetail(row.entity)" class="btn btn-success  btn-xs"><i class="ion-ios-information-outline"></i></button>  <button type="button" title="Reassign" ng-disabled="row.entity.questionnaireType != \'DCSL\' || (row.entity.status != \'2\' && row.entity.status != \'5\')" ng-click="grid.appScope.vm.openModalPic(row.entity)" class="btn btn-success  btn-xs"><i class="ion-ios-people"></i></button><button type="button" title="Preview" ng-click="grid.appScope.vm.actionPreview(row.entity)" ng-disabled="row.entity.questionnaireType != \'DCSL\' || (row.entity.status != \'2\' && row.entity.status != \'5\')" class="btn btn-success  btn-xs"><i class="ion-ios-information-outline"></i></button></div>', width: 100
                },
                { name: 'questionnaireCode', displayName: "Questionnaire Code", width: 170 },
                { name: 'questionnaireName', displayName: "Questionnaire Name", width: 300 },
                { name: 'regionCode', displayName: "Region Code", width: 200 },
                { name: 'regionName', displayName: "Region Name", width: 200 },
                { name: 'branchCode', displayName: "Dealer Code", width: 200 },
                { name: 'branchName', displayName: "Dealer Name", width: 200 },
                { name: 'dealerType', displayName: "Dealer Type", width: 170 },
                { name: 'statusName', displayName: "Status", width: 100 },
                //{ name: 'note', displayName: "Message", width: 200 },
                { name: 'createdBy', displayName: "Created By", width: 200 },
                { name: 'createdDate', displayName: "Created Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
            ]
        };
        vm.openModalPic = function (action) {
            var status = '';
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/modal/pic-select.html',
                size: 'lg',
                controller: 'picselectCtrl',
                resolve: {
                    content: function () {
                        return { 'data': action };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                console.log(result);
            }, function () {
            });
        };
        vm.actionPreview = function (row) {
            console.log("preview")
            $state.go('fillingquestionaire.filling', {
                questionaire: row,
                idparticipant: 58, notpreview: false
            });
        }
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
        vm.isForDuplicate = function (row) {
            return row.status == '2' || row.status == '5' || row.status == '6' || row.status == '3';
        }
        vm.getIconaction = function (row) {
            if (row.status == '0' || row.status == '4') {
                return 'ion-edit'; //edit
            } else if (row.status == '1') {
                return 'ion-edit'; //approve
            } else if (row.status == '2' || row.status == '5' || row.status == '6' || row.status == '3') {
                return 'ion-ios-photos-outline'; //duplicate
            } else {
                return '';
            }
        }

        vm.filterRegion = {};
        vm.startDate = new Date();
        vm.endDate = new Date();
        vm.startDate.setDate(vm.startDate.getDate() - 30);
        vm.endDate.setDate(vm.endDate.getDate() + 30);
        vm.searchParam = {
            year: (new Date()).getFullYear(),
            start: '',
            end: ''
            // start: [vm.startDate.getFullYear(), vm.startDate.getMonth(), vm.startDate.getDate()].join('-'),
            // end: [vm.endDate.getFullYear(), vm.endDate.getMonth(), vm.endDate.getDate()].join('-')
        }
        vm.quartals = [
            { label: "I", value: 1 },
            { label: "II", value: 2 },
            { label: "III", value: 3 },
            { label: "IV", value: 4 }
        ];
        vm.changeTypeQuestionnaire = function () {
            vm.searchParam.questType = vm.filterquestType.value;
            if (vm.filterquestType.label != 'DCSL') { vm.filterquartal = null; vm.searchParam.quartal = null };
        };
        // List Previlege
        // => managequestionaire.list.dcsl
        // => managequestionaire.list.olright
        vm.getQuestionnaireType = function () {
            managequestionaireService.getQuestionnaireType().then(function (result) {
                vm.questTypeItems = result.data;

                if (!vm.itsAllowFunction('managequestionaire.list.dcsl')) {
                    vm.questTypeItems = vm.questTypeItems.filter(function (elm) {
                        return elm.value != 'DCSL' && elm.value != '';
                    });
                }
                if (!vm.itsAllowFunction('managequestionaire.list.olright')) {
                    vm.questTypeItems = vm.questTypeItems.filter(function (elm) {
                        return elm.value != 'OLRIGHT' && elm.value != '';
                    });
                }
                vm.filterquestType = vm.questTypeItems[0];
                vm.searchParam.questType = vm.filterquestType.value;
            });
        };
        vm.getQuestionnaireType();
        vm.getRegionType = function () {
            managequestionaireService.getRegion().then(function (result) {
                vm.regionItems = result.data;
                vm.filterRegion = result.data[0];
                vm.searchParam.region = vm.filterRegion.Code;
            });
        };
        vm.getRegionType();
        vm.gridQuestionaireList.data = [];
        vm.actionDetail = function (row) {
            $state.go('report.questionnairedetail', { id: row.scenarioID });
        };
        vm.actionEdit = function (row) {
            if (row.questionnaireType == 'DCSL') {
                if (row.status == '0' || row.status == '4') {
                    $state.go('managequestionaire.edit', { id: row.scenarioID, duplicate: false });
                } else if (row.status == '1') {
                    $state.go('managequestionaire.detailapprove', { id: row.scenarioID });
                } else if (row.status == '2' || row.status == '5' || row.status == '6' || row.status == '3') {
                    $state.go('managequestionaire.edit', { id: row.scenarioID, duplicate: true });
                } else {
                    toastr.error('Unknow status', 'Error');
                }
            } else {
                if (row.status == '0' || row.status == '4') {
                    $state.go('managequestionaire.editolright', { id: row.scenarioID, duplicate: false });
                } else if (row.status == '1') {
                    $state.go('managequestionaire.detailapprove', { id: row.scenarioID });
                } else if (row.status == '2' || row.status == '5' || row.status == '6' || row.status == '3') {
                    $state.go('managequestionaire.editolright', { id: row.scenarioID, duplicate: true });
                } else {
                    toastr.error('Unknow status', 'Error');
                }
            }
        };
        vm.refreshGridList = function () {
            managequestionaireService.getQuestionnaire(vm.searchParam).then(function (result) {
                //managequestionaireService.getAllQuestionnaire(vm.searchParam).then(function (result) {
                console.log(result);
                vm.gridQuestionaireList.data = result.data;
            });
        }
        vm.clearGridList = function () {
            vm.gridQuestionaireList.data = [];
            vm.filterquestType = {};
            vm.filterquartal = {};
            vm.filterRegion = {};
            vm.searchParam = {
                start: '',
                end: ''
                // start: [vm.startDate.getFullYear(), vm.startDate.getMonth(), vm.startDate.getDate()].join('-'),
                // end: [vm.endDate.getFullYear(), vm.endDate.getMonth(), vm.endDate.getDate()].join('-')
            }
        }
    }
})();