/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('approvaldetailquestionairectrl', approvaldetailquestionairectrl);

    /** @ngInject */
    function approvaldetailquestionairectrl($q, $state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService, $stateParams) {
        if ($stateParams.id === null) {
            $state.go('managequestionaire.approval');
        }
        var vm = this;
        vm.typeolright = $stateParams.typeolright;
        vm.gridDefaultQuestion = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                { name: 'type', displayName: "Type", width: 75 },
                { name: 'name', displayName: "String", width: 500 },
                { name: 'level', displayName: "Level", width: 75 },
                { name: 'parrent', displayName: "Parent", width: 75 },
                { name: 'squence', displayName: "Sequence", width: 100 },
                { name: 'grouping', displayName: "Grouping", width: 100 },
                { name: 'answerType', displayName: "Answer Type", width: 150 },
                { name: 'answerChoice', displayName: "Answer Choice", width: 150 }
            ]
        };
        vm.gridCustomQuestion = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                { name: 'type', displayName: "Type", width: 75 },
                { name: 'name', displayName: "String", width: 500 },
                { name: 'level', displayName: "Level", width: 75 },
                { name: 'parrent', displayName: "Parent", width: 75 },
                { name: 'squence', displayName: "Sequence", width: 100 },
                { name: 'grouping', displayName: "Grouping", width: 100 },
                { name: 'answerType', displayName: "Answer Type", width: 150 },
                { name: 'answerChoice', displayName: "Answer Choice", width: 150 }
            ]
        };
        vm.detailApprovalSelected = null;
        if (vm.typeolright) {
            vm.title = 'Approve OLRIGHT';
            managequestionaireService.getDetailquestionnairesummary($stateParams.id).then(function (result) {
                console.log(result);
                vm.detailApprovalSelected = result.data;
                vm.gridDefaultQuestion.data = result.data.defaultQuestion;
                vm.gridCustomQuestion.data = result.data.customQuestion;
                //$state.go('managequestionaire.detailapprove');
            });
        } else {
            vm.title = 'Approve DCSL';
            managequestionaireService.getDetailquestionnairesummary($stateParams.id).then(function (result) {
                console.log(result);
                vm.detailApprovalSelected = result.data;
                vm.gridDefaultQuestion.data = result.data.defaultQuestion;
                vm.gridCustomQuestion.data = result.data.customQuestion;
                //$state.go('managequestionaire.detailapprove');
            });
        }
        vm.openModalApproval = function (action) {
            var status = '';
            if (action == 'approve') {
                status = '2';
            } else if (action == 'revise') {
                status = '4';
            } else if (action == 'reject') {
                status = '3';
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/modal/approval.html',
                size: 'md',
                controller: 'approvalCtrl',
                resolve: {
                    content: function () {
                        return { 'data': action };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                managequestionaireService.putProcessapproval({ id: vm.detailApprovalSelected.id, status: status, note: result }).then(function (result) {
                    if (result.data.result == "OK") {
                        toastr.success(result.data.message, 'Success');
                        $state.go('managequestionaire.approval');
                    } else {
                        toastr.error(result.data.message, 'Error');
                    }
                });
                console.log({ id: vm.detailApprovalSelected.id, status: status, note: result });
            }, function () {
            });
        };
    }
})();
