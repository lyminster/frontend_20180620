/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
  "use strict";

  angular
    .module("BlurAdmin.pages.fillingquestionaire")
    .controller("createparticipantctrl", createparticipantctrl);

  /** @ngInject */
  function createparticipantctrl(
    $q,
    $state,
    $scope,
    $uibModal,
    toastr,
    $filter,
    editableOptions,
    editableThemes,
    fillingquestionaireService,
    managequestionaireService,
    authService,
    $stateParams,
    localStorageService
  ) {
    var vm = this;
    if ($stateParams.questionaire === null) {
      $state.go("fillingquestionaire.olright");
      return;
    }
    vm.type = $stateParams.type;
    vm.isdcsl = vm.type == "DCSL";
    vm.questionaire = $stateParams.questionaire;
    vm.newParticipant = {};
    vm.newParticipant.questionaireId = vm.questionaire.questionnaireId;
    vm.type = $stateParams.type;
    //vm.mastertarget = localStorageService.get("mastertarget");
    // vm.mastertarget.ageRange = vm.mastertarget.ageRange.filter(function(
    //   element
    // ) {
    //   return element.value != "";
    // });
    vm.genderList = [{ label: "MR", value: 1 }, { label: "MRS", value: 2 }];
    vm.newParticipant.gender = vm.genderList[0];
    // vm.mastertarget.education = vm.mastertarget.education.filter(function (element) {
    //     return element.value != '';
    // });
    // vm.mastertarget.gender = vm.mastertarget.gender.filter(function(element) {
    //   return element.value != "";
    // });
    // vm.mastertarget.occupation = vm.mastertarget.occupation.filter(function(
    //   element
    // ) {
    //   return element.value != "";
    // });
    // vm.mastertarget.ses = vm.mastertarget.ses.filter(function (element) {
    //     return element.value != '';
    // });
    // vm.mastertarget.religion = vm.mastertarget.religion.filter(function(
    //   element
    // ) {
    //   return element.value != "";
    // });
    vm.getAreakabupaten = function (propId) {
      managequestionaireService.getAreakabupaten(propId).then(function (result) {
        vm.kabupatenItems = result.data;
        if (vm.kabupatenItems.length > 0) {
        }
      });
    };
    vm.gender =
      "New " +
      vm.type +
      " Participant (" +
      vm.questionaire.questionnaireName +
      ")";
    var promises = [];
    promises.push(managequestionaireService.getOccupation());
    promises.push(managequestionaireService.getSES());
    promises.push(managequestionaireService.getAreakabupatenAll());
    $q.all(promises).then(function (results) {
      vm.occupationItems = results[0].data;
      vm.sesItems = results[1].data;
      vm.kabupatenItems = results[2].data;
      vm.newParticipant.kabupaten = vm.kabupatenItems[0];
      //vm.newParticipant.ses = vm.sesItems[0];
      //vm.newParticipant.occupation = vm.occupationItems[0];
    });
    vm.saveParticipant = function () {
      if (!vm.formmodel.$invalid) {
        if (vm.isdcsl) {
          fillingquestionaireService
            .saveScreeningNewParticipant(vm.newParticipant)
            .then(function (result) {
              if (result.statusText == "OK") {
                toastr.success("Data berhasil di simpan", "Success");
                $state.go("fillingquestionaire.filling", {
                  questionaire: vm.questionaire,
                  idparticipant: result.data
                });
              } else {
                toastr.error(result.message, "Error");
              }
            });
        } else {
          //$state.go('fillingquestionaire.fillingolright', { questionaire: vm.questionaire, idparticipant: 1 });
          fillingquestionaireService
            .saveScreeningNewParticipantOlright(vm.newParticipant)
            .then(function (result) {
              if (result.statusText == "OK") {
                toastr.success("Data berhasil di simpan", "Success");
                $state.go("fillingquestionaire.fillingolright", {
                  questionaire: vm.questionaire,
                  idparticipant: result.data.participantID,
                  data: result.data
                });
              } else {
                toastr.error(result.message, "Error");
              }
            });
        }
      }
    };
  }
})();
