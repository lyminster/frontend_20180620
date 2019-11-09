/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.report')
        .controller('questionnairedetailctrl', questionnairedetailctrl);

    /** @ngInject */
    function questionnairedetailctrl($q, $state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService, $stateParams) {
        if ($stateParams.id === null) {
            $state.go('managequestionaire.list');
            return;
        }
        var vm = this;
        vm.gridDefaultQuestion = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                {name: 'No', enableFiltering: false, field: 'No', width:50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
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
        managequestionaireService.getDetailquestionnairesummary($stateParams.id).then(function (result) {
            console.log(result);
            vm.detailApprovalSelected = result.data;
            vm.gridDefaultQuestion.data = result.data.defaultQuestion;
            vm.gridCustomQuestion.data = result.data.customQuestion;
        });
    }
})();
