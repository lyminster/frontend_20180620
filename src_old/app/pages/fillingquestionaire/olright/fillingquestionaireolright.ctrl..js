/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.fillingquestionaire')
        .controller('fillingquestionaireolrightctrl', fillingquestionaireolrightctrl);

    /** @ngInject */
    function fillingquestionaireolrightctrl($state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, fillingquestionaireService, authService) {
        var vm = this;
        vm.gridAvailableQuestionaire = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                {
                    name: 'action', enableFiltering: false, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" ng-click="grid.appScope.vm.actionSelect(row.entity)" class="btn btn-success  btn-xs"><i class="ion-android-checkmark-circle"></i></button></div>', width: 100
                },
                { name: 'questionnaireId', displayName: "Questionnaire Id", width: 200, visible: false },
                { name: 'questionnaireCode', displayName: "Questionnaire Code", width: 200 },
                { name: 'questionnaireName', displayName: "Questionnaire Name", width: 300 },
                { name: 'regionCode', displayName: "Region Code", width: 200 },
                { name: 'regionName', displayName: "Region Name", width: 200 },
                // { name: 'branchCode', displayName: "Dealer Code", width: 200 },
                // { name: 'branchName', displayName: "Dealer Name", width: 200 },
                // { name: 'dealerType', displayName: "Dealer Type", width: 200 },
                { name: 'status', displayName: "Status Complete", width: 200 },
                { name: 'createdBy', displayName: "Created By", width: 200 },
                { name: 'startDistributionDate', displayName: "Start Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'endDistributionDate', displayName: "End Date", type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'', width: 100 },
                { name: 'description', displayName: "Description", width: 200, visible: false }
            ],
            data: []
        };
        fillingquestionaireService.getAvailQuestionnaireOlright().then(function (result) {
            vm.gridAvailableQuestionaire.data = result.data;
        });
        // vm.gridAvailableQuestionaire.data = [{
        //     'questionnaireId': 1,
        //         'questionnaireCode': "9182981",
        //         'questionnaireName': "Derik",
        //         'regionCode': "Region Code",
        //         'regionName': "Region Name",
        //         'branchCode': "Dealer Code",
        //         'branchName': "Dealer Name",
        //         'dealerType': "Dealer Type",
        //         'status': "Status Complete",
        //         'createdBy': "Created By",
        //         'startDistributionDate': new Date(),
        //         'endDistributionDate': new Date(),
        //         'description': "Description"
        // }]
        vm.actionSelect = function (params) {
            $state.go('fillingquestionaire.selectparticipant', { questionaire: params, type: 'OLRIGHT' });
        }
    }

})();
