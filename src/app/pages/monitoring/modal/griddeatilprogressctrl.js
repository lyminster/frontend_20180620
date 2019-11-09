/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('griddeatilprogressctrl', function ($scope,toastr, monitoringService, $uibModalInstance, content) {
            $scope.gridProgressDetail = {
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
                    $scope.gridApi = gridApi;
                    $scope.gridApi.grid.registerDataChangeCallback(function () {
                        $scope.gridApi.treeBase.expandAllRows();
                    });
                },
                data: []
            };
            $scope.gridProgressDetail.data = content.data;
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });
})();