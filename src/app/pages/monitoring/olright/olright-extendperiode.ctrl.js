/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('olrightextendperiodectrl', olrightextendperiodectrl);

    /** @ngInject */ 
    function olrightextendperiodectrl($state, monitoringService, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, fillingquestionaireService, authService, $stateParams) {
        var vm = this;
        if ($stateParams.questionaire === null) {
            $state.go('monitoring.olright');
            return;
        }
        vm.questionaire = $stateParams.questionaire;
        monitoringService.getHystoryExtend(vm.questionaire.questionnaireId).then(function (result) {
            vm.extendHistory = result.data
        });
        vm.type = $stateParams.type;
        vm.nowDate = new Date();
        vm.tempdate = new Date(vm.questionaire.endDistributionDate);
        vm.tempdate.setDate(vm.tempdate.getDate() + 1)
        vm.dataExtend = {
            extendedBy: authService.authentication.userName,
            questionnaireId: vm.questionaire.questionnaireCode,
            questionnaireCode: vm.questionaire.questionnaireCode,
            endDate: vm.tempdate.toISOString().slice(0,10),
            target: vm.questionaire.totalTarget
        }
        if (vm.type = 'olright') {
            vm.title = 'olright Quisionnaire';
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
                { name: 'No', enableFiltering: false, field: 'No', width:50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                { name: 'id', displayName: "Id", width: 50, visible: false },
                { name: 'title', displayName: "title", width: 50 },
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
        fillingquestionaireService.getAvailQuestionnaireOlright(vm.questionaire.questionnaireId).then(function (result) {
            vm.gridAvailableParticipant.data = result.data;
        });
        vm.setPeriode = function () {
            var param = {
                "questionnaireID" : vm.questionaire.questionnaireId,
                "endDate" : vm.dataExtend.endDate,
                "reasons" : vm.dataExtend.reasons,
                "target" : vm.dataExtend.target
              }
            monitoringService.saveExtendsPeriode(param).then(function (result) {
                if (result.data.result == "OK") {
                    toastr.success(result.data.message, 'Success');
                    vm.questionaire.endDistributionDate = vm.dataExtend.endDate;
                    $state.go('monitoring.olrightdetail', {questionaire: vm.questionaire});
                } else {
                    vm.prosessave = false;
                    toastr.error(result.data.message, 'Error');
                }
            });
        }
    }

})();
