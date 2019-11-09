/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('userupdatectrl', userupdatectrl);

    /** @ngInject */
    function userupdatectrl($state, toastr, $scope, $filter, privilegeService, editableOptions, editableThemes, managequestionaireService, manageparticipantService, $stateParams) {
        var vm = this;
        if ($stateParams.user === null) {
            $state.go('privilege.user');
            return;
        }
        vm.user = $stateParams.user;
        vm.formParam = {
            id: vm.user.id
        }
        privilegeService.postGroupuser().then(function (result) {
            vm.groupUserItems = result.data;
            vm.refreshGrouplistbyid(vm.user.id);
        });
        vm.refreshGrouplistbyid = function (Id) {
            privilegeService.postGroupuserById(Id).then(function (result) {
                vm.user.usergroup = result.data;
            });
        }
        vm.save = function () {
            privilegeService.postUpdateuser(vm.user).then(function (result) {
                if (result.data.result == "OK") {
                    toastr.success(result.data.message, 'Success');
                    $state.go('privilege.user');
                } else {
                    toastr.error(result.data.message, 'Error');
                }
            });
        }
        vm.cancel = function () {
            $state.go('privilege.user');
        }

    }
})();
