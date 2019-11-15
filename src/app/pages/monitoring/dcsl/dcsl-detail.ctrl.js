/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('dcsldetailctrl', dcsldetailctrl);

    /** @ngInject */
    function dcsldetailctrl($state, $scope, monitoringService, $uibModal, toastr, $filter, editableOptions, editableThemes, fillingquestionaireService, authService, $stateParams) {
        var vm = this;
        vm.itsAllowFunction = authService.itsAllowFunction;
        if ($stateParams.questionaire === null) {
            $state.go('monitoring.dcsl');
            return;
        }
        vm.questionaire = $stateParams.questionaire;
        vm.type = $stateParams.type;
        if (vm.type = 'DCSL') {
            vm.title = 'DCSL Quisionnaire';
        } else {
            vm.title = 'OLright Quisionnaire';
        }
        vm.getColorprogress = function (val) {
            return val < 50 ? "progress-bar progress-bar-danger progress-bar-striped active"
                : val < 75 ? "progress-bar progress-bar-warning progress-bar-striped active"
                    : "progress-bar progress-bar-success progress-bar-striped active";
        };
        vm.gridAvailableParticipant = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                { name: 'id', displayName: "Id", width: 50, visible: false },
                { name: 'gender', displayName: "Gender", width: 150 },
                { name: 'name', displayName: "Name", width: 200 },
                { name: 'telephone', displayName: "Telephone", width: 200 },
                { name: 'email', displayName: "Email", width: 200 },
                { name: 'city', displayName: "City", width: 200 },
                { name: 'source', displayName: "Source", width: 100 },
                { name: 'typeSurvey', displayName: "Type Survey", width: 100 },
                { name: 'h1', displayName: "H1", width: 50, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h1" disabled></div>' },
                { name: 'h2', displayName: "H2", width: 50, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h2" disabled></div>' },
                { name: 'h3', displayName: "H3", width: 50, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h3" disabled></div>' },
                { name: 'surveyorName', displayName: "Surveyor Name", width: 200 },
                { name: 'status', displayName: "Status Id", width: 200, visible: false },
                { name: 'statusName', displayName: "Status", width: 200 }
            ],
            data: []
        };
        vm.extendPeriode = function () {
            $state.go('monitoring.extendperiode', { questionaire: vm.questionaire });
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
        vm.getmot = function(){
            monitoringService.getOneMonitoring(vm.questionaire.questionnaireId).then(function (result) {
                vm.questionaire = result.data;
            });
        }
        vm.refreshParticipant = function () {
            monitoringService.getParticipant(vm.questionaire.questionnaireId).then(function (result) {
                vm.gridAvailableParticipant.data = result.data;
                vm.getmot();
            });
        }

        vm.completesurvey = function () {
            monitoringService.completesurvey(vm.questionaire.questionnaireId).then(function (result) {
                if (result.data.result == "OK") {
                    toastr.success("Success complete this survey.", 'Success');
                    monitoringService.getOneMonitoring(vm.questionaire.questionnaireId).then(function (result) {
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
