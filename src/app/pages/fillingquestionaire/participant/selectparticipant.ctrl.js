/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
  "use strict";

  angular
    .module("BlurAdmin.pages.fillingquestionaire")
    .controller("selectparticipantctrl", selectparticipantctrl);

  /** @ngInject */
  function selectparticipantctrl(
    $state,
    $scope,
    monitoringService,
    $uibModal,
    toastr,
    $filter,
    editableOptions,
    editableThemes,
    fillingquestionaireService,
    authService,
    $stateParams
  ) {
    var vm = this;
    if ($stateParams.questionaire === null) {
      $state.go("fillingquestionaire.dcsl");
      return;
    }
    vm.back = function () {
      $state.go("fillingquestionaire.dcsl");
      return;
    };
    vm.questionaire = $stateParams.questionaire;
    vm.type = $stateParams.type;
    vm.isdcsl = vm.type == "DCSL";
    if (vm.isdcsl) {
      vm.title = "DCSL Quisionnaire";
    } else {
      vm.title = "OLRIGHT Quisionnaire";
    }

    vm.back = function () {
      if (vm.isdcsl) {
        $state.go("fillingquestionaire.dcsl");
      } else {
        $state.go("fillingquestionaire.olright");
      }

      return;
    };
    vm.gridAvailableParticipant = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      enableFiltering: true,
      columnDefs: [
        {
          name: "No",
          enableFiltering: false,
          field: "No",
          width: 50,
          cellTemplate:
            '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>'
        },
        {
          name: "action",
          visible: vm.isdcsl,
          enableFiltering: false,
          cellTemplate:
            '<div ng-disabled="row.entity.status != \'2\'" style="display: flex;align-items: center;justify-content: center;"><button type="button" ng-click="grid.appScope.vm.actionSelect(row.entity)" class="btn btn-success  btn-xs"><i class="ion-android-checkbox-outline"></i></button></div>',
          width: 100
        },
        { name: "id", displayName: "Id", width: 50, visible: false },
        { name: "gender", displayName: "Gender", width: 100 },
        { name: "name", displayName: "Name", width: 200 },
        {
          name: "telephone",
          displayName: "Telephone",
          visible: vm.isdcsl,
          width: 200
        },
        { name: "email", displayName: "Email", visible: vm.isdcsl, width: 200 },
        { name: "city", displayName: "City", visible: vm.isdcsl, width: 200 },
        {
          name: "source",
          displayName: "Source",
          visible: vm.isdcsl,
          width: 100
        },
        { name: "typeSurvey", displayName: "Type Survey", width: 100 },
        {
          name: "h1",
          displayName: "H1",
          width: 50,
          visible: vm.isdcsl,
          cellTemplate:
            '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h1" disabled></div>'
        },
        {
          name: "h2",
          displayName: "H2",
          width: 50,
          visible: vm.isdcsl,
          cellTemplate:
            '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h2" disabled></div>'
        },
        {
          name: "h3",
          displayName: "H3",
          width: 50,
          visible: vm.isdcsl,
          cellTemplate:
            '<div style="display: flex;align-items: center;justify-content: center;"><input type="checkbox" ng-model="row.entity.h3" disabled></div>'
        },
        { name: "surveyorName", displayName: "Surveyor Name", width: 200 },
        {
          name: "status",
          displayName: "Status Id",
          width: 200,
          visible: false
        },
        { name: "statusName", displayName: "Status", width: 200 }
      ],
      data: []
    };

    vm.viewDetail = function () {
      monitoringService
        .getMonitoringDetailolright(vm.questionaire.questionnaireId)
        .then(function (result) {
          vm.openModalGridDetail(result.data);
        });
    };
    vm.openModalGridDetail = function (data_) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: "app/pages/monitoring/modal/griddaetaiprogress.html",
        size: "lg",
        controller: "griddeatilprogressctrl",
        resolve: {
          content: function () {
            return { data: data_ };
          }
        }
      });
      modalInstance.result.then(
        function (result) {
          Console.log(result);
        },
        function () { }
      );
    };
    fillingquestionaireService
      .getAvailParticipant(vm.questionaire.questionnaireId)
      .then(function (result) {
        vm.gridAvailableParticipant.data = result.data;
      });
    vm.actionSelect = function (row) {
      $state.go("fillingquestionaire.filling", {
        questionaire: vm.questionaire,
        idparticipant: row.id,
        notpreview: true
      });
    };
    vm.createNewParticipant = function () {
      $state.go("fillingquestionaire.createparticipant", {
        questionaire: vm.questionaire,
        type: vm.type
      });
    };
  }
})();
