/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('updategroupuserctrl', updategroupuserctrl);

    /** @ngInject */
    function updategroupuserctrl($state, toastr, $stateParams, $scope, $filter, privilegeService, editableOptions, editableThemes, managequestionaireService, manageparticipantService) {
        var vm = this;
        if ($stateParams.data === null) {
            $state.go('privilege.groupuser');
        }
        
        vm.gridConfig = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width:50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                { name: 'id', displayName: "Id", width: 50, visible: false },
                { name: 'isAllowed', displayName: "is Allowed", width: 50 , cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.isAllowed" ></div>' },
                { name: 'groupUserName', displayName: "Group Username", width: 200,visible: false },
                { name: 'idGroupUser', displayName: "id group user", width: 50,visible: false },
                { name: 'priviledgeCode', displayName: "Code", width: 200 },
                { name: 'priviledgeName', displayName: "Name", width: 200 },
                { name: 'priviledgeDesc', displayName: "Description", width: 200 },
            ],
            data: []
        };
        vm.groupuser = $stateParams.data;
        privilegeService.getPriviledgeByGroup(vm.groupuser.value).then(function (result) {
            vm.dataSubmit = result.data;
            vm.gridConfig.data = vm.dataSubmit.priviledge;
        });
        
        vm.save = function () {
            privilegeService.postUpdatePriviledge(vm.dataSubmit).then(function (result) {
                if (result.data.result == "OK") {
                    toastr.success(result.data.message, 'Success');
                    $state.go('privilege.groupuser');    
                } else {
                    toastr.error(result.data.message, 'Error');
                }
            });
        }
        vm.cancel = function () {
            $state.go('privilege.groupuser');    
        }
    }
})();
