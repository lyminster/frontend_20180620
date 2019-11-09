/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.manageparticipant')
        .controller('detailparticipantctrl', detailparticipantctrl);
  
    /** @ngInject */
    function detailparticipantctrl($state, authService, $stateParams, $scope, $filter, toastr, editableOptions, editableThemes, managequestionaireService, manageparticipantService, reportService) {
        var vm = this;
        if ($stateParams.participant === null) {
            $state.go('manageparticipant.list');
            return;
        }
        vm.title = 'General Information';
        vm.participant = $stateParams.participant;
        vm.picaModel = [];
        vm.getDetailParticipant = function () {
            manageparticipantService.getParticipantById(vm.participant.codeLeads).then(function (result) {
                vm.questionaire = result.data;
            });
        }
        vm.getDetailParticipant();
    }
  })();