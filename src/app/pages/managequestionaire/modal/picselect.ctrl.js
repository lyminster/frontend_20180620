/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('picselectCtrl', function ($scope, toastr, managequestionaireService, fillingquestionaireService, $uibModalInstance, content) {
            $scope.questionaire = angular.copy(content.data);
            managequestionaireService.getpicQuestioner($scope.questionaire.scenarioID).then(function (result) {
                $scope.listSelect = result.data;
                $scope.selected = $scope.listSelect[0];
                managequestionaireService.getreasignparticipantbyid($scope.questionaire.scenarioID).then(function (result) {
                    //fillingquestionaireService.getAvailParticipant($scope.questionaire.scenarioID).then(function (result) {
                        $scope.gridAvailableParticipant.data = result.data;
                        
                    });
            });
            
                
            $scope.rowSelected = [];
            $scope.gridAvailableParticipant = {
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: 25,
                enableFiltering: true,
                showGridFooter:true,
                enableRowSelection: true,
                enableSelectAll: true,
                columnDefs: [
                    { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                    { name: 'id', displayName: "Id", width: 50, visible: false },
                    { name: 'title', displayName: "title", width: 50 },
                    { name: 'name', displayName: "Name", width: 200 },
                    { name: 'lastSalesmanID', displayName: "Last Salesman ID", width: 150 },
                    { name: 'lastSalesmanName', displayName: "Last Salesman Name", width: 200 },
                    { name: 'surveyorID', displayName: "Surveyor ID", width: 100 },
                    { name: 'surveyorName', displayName: "Surveyor Name", width: 200 },
                    { name: 'status', displayName: "Status Id", width: 200, visible: false },
                    { name: 'statusName', displayName: "Status", width: 200 },
                    { name: 'telephone', displayName: "Telephone", width: 200 },
                    { name: 'email', displayName: "Email", width: 200 },
                    { name: 'city', displayName: "City", width: 200 },
                    { name: 'source', displayName: "Source", width: 100 },
                    { name: 'typeSurvey', displayName: "Type Survey", width: 100 },
                    //{ name: 'oldSurveyor', displayName: "Old Surveyor", width: 100 },
                    //{ name: 'oldSurveyorName', displayName: "Old Surveyor Name", width: 100 },
                    { name: 'h1', displayName: "H1", width: 50, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h1" disabled></div>' },
                    { name: 'h2', displayName: "H2", width: 50, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h2" disabled></div>' },
                    { name: 'h3', displayName: "H3", width: 50, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h3" disabled></div>' }
                ],
                data: []
            };
            $scope.getSelectedRows = function () {
            }
            $scope.gridAvailableParticipant.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;
            };
            
            $scope.ok = function () {
                if ($scope.selected.value == "" || $scope.selected == null) {
                    toastr.error('Please Select surveyor first.', 'Validation');
                    return;
                }
                var row = $scope.gridApi.selection.getSelectedRows();
                if (row.length <= 0) {
                    toastr.error('Please choose Leads.', 'Validation');
                    return;
                }
                $scope.paramSend = {
                    surveyor: $scope.selected,
                    selectedLeads: row
                }
                managequestionaireService.postupdatePICquestioner($scope.paramSend).then(function (result) {
                    if (result.data.result == "OK") {
                        toastr.success(result.data.message, 'Success');
                        $uibModalInstance.close("Oke");
                    } else {
                        toastr.error(result.data.message, 'Error');
                        return;
                    }
                });
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });
})();