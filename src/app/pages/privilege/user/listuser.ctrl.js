/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('listuserctrl', listuserctrl);

    /** @ngInject */
    function listuserctrl($state, $scope, $filter, privilegeService, editableOptions, editableThemes, managequestionaireService, manageparticipantService) {
        var vm = this;
        vm.searchParam = {
            positionID: null
        }
        
        vm.actionSelect = function (params) {
            $state.go('privilege.updateuser', { user: params });
        };
        vm.refreshGrid = function () {
            privilegeService.postListuser().then(function (result) {
                vm.griduser.data = result.data;
            });
        }
        vm.addUser = function() {
            $state.go('privilege.insertuser');
        }
        vm.refreshGrid();
        vm.griduser = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                {
                    name: 'action', enableFiltering: false, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" ng-click="grid.appScope.vm.actionSelect(row.entity)" class="btn btn-success  btn-xs"><i class="ion-android-checkmark-circle"></i></button></div>', width: 100
                },
                { name: 'id', displayName: "Id", width: 50, visible: false },
                { name: 'username', displayName: "Username", width: 200 },
                { name: 'name', displayName: "Name", width: 200 },
                { name: 'regionID', displayName: "Region Id", width: 200, visible: false },
                { name: 'regionName', displayName: "Region", width: 200 },
                { name: 'dealerID', displayName: "Dealer id", width: 200, visible: false },
                { name: 'dealerName', displayName: "Dealer", width: 200 },
                { name: 'groupUserID', displayName: "groupuser id", width: 200,visible: false  },
                { name: 'groupUserName', displayName: "Group User", width: 200 },
                { name: 'positionID', displayName: "Position id", width: 200, visible: false },
                { name: 'positionName', displayName: "Position", width: 100 },
                { name: 'hsoID', displayName: "HSO ID", width: 100 },
                { name: 'hondaID', displayName: "HONDA ID", width: 100 },
                { name: 'npk', displayName: "NPK", width: 100 }
            ],
            data: []
        };
    }

})();
