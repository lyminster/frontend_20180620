/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('olrightdetailctrl', olrightdetailctrl);

    /** @ngInject */
    function olrightdetailctrl($state, $scope, monitoringService, $uibModal, toastr, $filter, editableOptions, editableThemes, fillingquestionaireService, authService, $stateParams) {
        var vm = this;
        vm.itsAllowFunction = authService.itsAllowFunction;
        if ($stateParams.questionaire === null) {
            $state.go('monitoring.olright');
            return;
        }
        vm.questionaire = $stateParams.questionaire;
        vm.type = $stateParams.type;
        if (vm.type = 'olright') {
            vm.title = 'OLRIGHT Quisionnaire';
        } else {
            vm.title = 'DCSL Quisionnaire';
        }
        vm.getColorprogress = function (val) {
            return val < 50 ? "progress-bar progress-bar-danger progress-bar-striped active"
                : val < 75 ? "progress-bar progress-bar-warning progress-bar-striped active"
                    : "progress-bar progress-bar-success progress-bar-striped active";
        };
        vm.gridProgressDetail = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                {
                    name: 'category',
                    grouping: { groupPriority: 0 },
                    sort: { priority: 0, direction: 'asc' },
                    width: 150,
                    cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>'
                },
                { name: 'value', displayName: "Value", width: 200 },
                { name: 'totalRespondent', displayName: "Total Respondent", width: 150 }
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.grid.registerDataChangeCallback(function () {
                    vm.gridApi.treeBase.expandAllRows();
                });
            },
            data: []
        };
        vm.refreshGridDetail = function () {
            monitoringService.getMonitoringDetailolright(vm.questionaire.questionnaireId).then(function (result) {
                vm.gridProgressDetail.data = result.data;
            });
        }
        vm.refreshGridDetail();
        vm.gridAvailableParticipant = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                { name: 'id', displayName: "Id", width: 50, visible: false },
                { name: 'title', displayName: "Title", width: 50 },
                { name: 'name', displayName: "Name", width: 200 },
                { name: 'telephone', displayName: "Telephone", width: 200 },
                { name: 'email', displayName: "Email", width: 200 },
                { name: 'city', displayName: "City", width: 200 },
                { name: 'source', displayName: "Source", width: 100 },
                { name: 'typeSurvey', displayName: "Type Survey", width: 100 },
                { name: 'surveyorName', displayName: "Surveyor Name", width: 200 },
                { name: 'status', displayName: "Status Id", width: 200, visible: false },
                { name: 'statusName', displayName: "Status", width: 200 }
            ],
            data: []
        };
        vm.extendPeriode = function () {
            $state.go('monitoring.olrightextendperiode', { questionaire: vm.questionaire });
        }
        vm.showChart = function () {
            $state.go('monitoring.olrightdetailgraph', { questionaire: vm.questionaire });
        }
        vm.viewDetail = function () {
            monitoringService.getMonitoringDetailolright(vm.questionaire.questionnaireId).then(function (result) {
                vm.openModalGridDetail(result.data);
            });
        }
        vm.openModalGridDetail = function (data_) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/monitoring/modal/griddaetaiprogress.html',
                size: 'lg',
                controller: 'griddeatilprogressctrl',
                resolve: {
                    content: function () {
                        return { 'data': data_ };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                Console.log(result);
            }, function () {
            });
        } 
        vm.generateNew = function () {
            var formdata = {
                value: 0
            };
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/monitoring/modal/modal-generate-new.html',
                size: 'lg',
                controller: 'generatenewctrl',
                resolve: {
                    content: function () {
                        return { 'data': formdata, questionaire: vm.questionaire, 'title': 'Generate New' };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                console.log(result);
                vm.refreshParticipant();
            }, function () {
            });
        }
        vm.createNewParticipant = function () {
            $state.go('fillingquestionaire.createparticipant', { questionaire: vm.questionaire });
        }
        monitoringService.getOneMonitoringolright(vm.questionaire.questionnaireId).then(function (result) {
            vm.questionaire = result.data;
        });
        vm.refreshParticipant = function () {
            monitoringService.getParticipant(vm.questionaire.questionnaireId).then(function (result) {
                vm.gridAvailableParticipant.data = result.data;
            });
        }

        vm.completesurvey = function () {
            monitoringService.completesurvey(vm.questionaire.questionnaireId).then(function (result) {
                if (result.data.result == "OK") {
                    toastr.success("Success complete this survey.", 'Success');
                    monitoringService.getOneMonitoringolright(vm.questionaire.questionnaireId).then(function (result) {
                        vm.questionaire = result.data;
                    });
                } else {
                    toastr.error(result.data.message, 'Error');
                }
            });
        }
        vm.refreshParticipant();
        vm.openModalDetail = function (title) {
            monitoringService.getMonitoringDetailProgress(vm.questionaire.questionnaireId, title).then(function (result) {
                var formdata = result.data;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/monitoring/modal/modal-detailprogress.html',
                    size: 'lg',
                    controller: 'detailprogressCtrl',
                    resolve: {
                        content: function () {
                            return { 'data': formdata, 'title': title };
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    questions.push(result);
                    vm.resertSortscriptCode(scriptCodeH, questions);
                }, function () {
                });
            });
        };
    }

})();
