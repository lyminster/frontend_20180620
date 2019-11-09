/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.monitoring')
        .controller('listgroupuserctrl', listgroupuserctrl);
  
    /** @ngInject */
    function listgroupuserctrl($state, $scope, $filter,privilegeService, editableOptions, editableThemes, managequestionaireService, manageparticipantService) {
        var vm = this;
        vm.searchParam = {
            year: (new Date()).getFullYear(),
            positionID: null
        }
        privilegeService.postGroupuserPrivilege().then(function (result) {
            vm.gridConfig.data = result.data;
        });
        vm.actionSelect = function (params) {
            $state.go('privilege.updategroupuser', {data: params});
        };
        vm.gridConfig = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width:50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                // {
                //     name: 'action', enableFiltering: false,  cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" ng-click="grid.appScope.vm.actionSelect(row.entity)" class="btn btn-success  btn-xs"><i class="ion-android-checkmark-circle"></i></button></div>', width: 100
                // },
                { name: 'id', displayName: "Id", width: 200, visible:false },
                { name: 'label', displayName: "Name", width: 200 },
                { name: 'privilege', displayName: "Privilege", width: 200 },
                { name: 'status', displayName: "Status", width: 200 }
            ],
            data: []
        };
    }
  
  })();
  