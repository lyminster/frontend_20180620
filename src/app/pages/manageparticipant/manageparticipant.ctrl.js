/**
 * @author ich-one
 * created on 3.11.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.manageparticipant')
    .controller('manageparticipantctrl', manageparticipantctrl);

  /** @ngInject */
  function manageparticipantctrl($scope, $window, managequestionaireService, $state, $filter, $timeout, ngAuthSettings, editableOptions, editableThemes, manageparticipantService, toastr, authService) {
    var vm = this;
    // Upload Module
    $scope.read = function (workbook, nameFile) {
      //$scope.clearfiles();  
      /* DO SOMETHING WITH workbook HERE */
      $scope.nameFile = nameFile;
      $scope.propslectedFile = '( - File : ' + nameFile + ' (' + workbook.Props.Application + ') - Author : ' + workbook.Props.Author + ')';
      $scope.jsonresult = $scope.to_json(workbook);
      $scope.sheetslist = Object.keys($scope.jsonresult);
      //console.log(ress);
      console.log(workbook);
    }

    $scope.error = function (e) {
      /* DO SOMETHING WHEN ERROR IS THROWN */
      console.log(e);
    }

    $scope.onSelectedSheet = function (selectedItem) {
      if (selectedItem) {
        $scope.gridOptions1.data = $scope.jsonresult[selectedItem];
      } else { $scope.gridOptions1.data = [] }

    }

    $scope.clearUploadParticipant = function () {
      $scope.jsonresult = null;
      $scope.sheetselected = null;
      $scope.sheetselected = undefined;
      $scope.sheetslist = null;
      $scope.propslectedFile = null;
      $scope.gridOptions1.data = [];
      //$scope.clearfiles();
    }

    $scope.gridOptions1 = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      enableFiltering: true,
      columnDefs: [
        { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
        { name: 'Name', displayName: "Name", width: 200 },
        { name: 'CellNo', displayName: "Cell No", width: 200 },
        { name: 'IDCardNo', displayName: "ID Card No", width: 200 },
        { name: 'CustomerCode ', displayName: "Customer Code ", width: 200 },
        { name: 'BirthDate', displayName: "Birth Date", width: 200 },
        { name: 'Address', displayName: "Address", width: 200 },
        { name: 'Gender', displayName: "Gender", width: 200 },
        { name: 'Religion', displayName: "Religion", width: 200 },
        { name: 'Profesion', displayName: "Profesion", width: 200 },
        { name: 'Spending', displayName: "Spending", width: 200 },
        { name: 'Education', displayName: "Education", width: 200 },
        { name: 'isCallable', displayName: "is Callable", width: 200 },
        { name: 'Email ', displayName: "Email ", width: 200 },
        { name: 'EngineCode', displayName: "Engine Code", width: 200 },
        { name: 'EngineNo', displayName: "Engine No", width: 200 },
        { name: 'SourceSystem', displayName: "Source System", width: 200 },
        { name: 'SourceData', displayName: "Source Data", width: 200 },
        { name: 'BikeUsage', displayName: "Bike Usage", width: 200 },
        { name: 'BikeUser', displayName: "Bike User", width: 200 },
        { name: 'PaymentType', displayName: "Payment Type", width: 200 },
        { name: 'TglBeliDLR', displayName: "Tgl Beli DLR", width: 200 },
        { name: 'UnitTypeCode', displayName: "Unit Type Code", width: 200 },
        { name: 'UnitVariantCode', displayName: "Unit Variant Code", width: 200 },
        { name: 'UnitMarketName', displayName: "Unit Market Name", width: 200 },
        { name: 'UnitTypeSegment ', displayName: "Unit Type Segment ", width: 200 },
        { name: 'SalesPersonNo', displayName: "Sales Person No", width: 200 },
        { name: 'HondaID', displayName: "Honda ID", width: 200 },
        { name: 'DealerCode', displayName: "Dealer Code", width: 200 },
        { name: 'DealerName', displayName: "Dealer Name", width: 200 },
        { name: 'MainDealerCode', displayName: "Main Dealer Code", width: 200 },
        { name: 'MainDealerName', displayName: "Main Dealer Name", width: 200 },
        { name: 'Address', displayName: "Address", width: 200 },
        { name: 'Telp1', displayName: "Telp 1", width: 200 },
        { name: 'ISActive', displayName: "IS Active", width: 200 },
        { name: 'IsHSO', displayName: "Is HSO", width: 200 },
        { name: 'KelurahanCode', displayName: "Kelurahan Code", width: 200 },
        { name: 'Kelurahan', displayName: "Kelurahan", width: 200 },
        { name: 'KecamatanCode', displayName: "Kecamatan Code", width: 200 },
        { name: 'Kecamatan', displayName: "Kecamatan", width: 200 },
        { name: 'KabupatenCode', displayName: "Kabupaten Code", width: 200 },
        { name: 'Kabupaten', displayName: "Kabupaten", width: 200 },
        { name: 'ProvinsiCode', displayName: "Provinsi Code", width: 200 },
        { name: 'Provinsi', displayName: "Provinsi", width: 200 },
        { name: 'FrameNo', displayName: "Frame No", width: 200 },
        { name: 'PoliceRegNo', displayName: "Police Reg No", width: 200 },
        { name: 'SeviceDate', displayName: "Service Date", width: 200 },
        { name: 'ServiceType', displayName: "Service Type", width: 200 },
        { name: 'MaterialNo', displayName: "Material No", width: 200 },
        { name: 'PONo', displayName: "PO No", width: 200 },
        { name: 'LastGRNo', displayName: "Last GR No", width: 200 },
        { name: 'LastGRDate', displayName: "Last GR Date", width: 200 },
        { name: 'POQuantity', displayName: "PO Quantity", width: 200 },
        { name: 'TotalGRQuantity', displayName: "Total GR Quantity", width: 200 },
        { name: 'SONo', displayName: "SO No", width: 200 },
        { name: 'PKBNo', displayName: "PKB No", width: 200 }
      ]
    };

    $scope.progressFunction = function () {
      manageparticipantService.uploadParticipant($scope.nameFile, $scope.gridOptions1.data).then(function (result) {
        if (result.status == "200") {
          toastr.success(result.data.message, 'Success');
          $scope.clearUploadParticipant();
        } else {
          toastr.error(result.data.message, 'Error');
        }
      });
    };

    vm.serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
    $scope.downloadTemplateParticipant = function () {
      manageparticipantService.getTemplateParticipant().then(function (result) {
        var wdw = $window.open(vm.serviceBase + result.data.fileName, '_blank');
        console.log(result);
        setTimeout(function () {
          wdw.close();
        }, 5000);
      });
    };
    $scope.to_json = function (workbook) {
      var result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      return result;
    }
    // Hystory Module
    $scope.filterItems = [
      {
        label: "All", value: "All"
      }, {
        label: "Success Sync", value: "Success Sync"
      }, {
        label: "Problem Sync", value: "Problem Sync"
      }, {
        label: "Queue Sync", value: "Queue Sync"
      }
    ];
    $scope.selectedFilter = $scope.filterItems[0];
    $scope.filterGrid = function (value) {
      manageparticipantService.getHistoryparticipant(value).then(
        function (result) {
          console.log(result);
          $scope.gridOptionsHystori.data = result.data;
        }
      );
    };
    $scope.gridOptionsHystori = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      enableFiltering: true,
      columnDefs: [
        { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
        { name: "CellNo", width: 100 },
        { name: "Name", width: 200 },
        { name: "IsSync", width: 100 },
        { name: "SyncDate", width: 100 },
        { name: "StatusSync", width: 100 },
        { name: "ErrorMessage", width: 200 },
        { name: "CreatedBy", width: 200 },
        { name: "CreatedDate", width: 200 }
      ]
    };
    // List Module
    vm.searchParamList = {};
    manageparticipantService.getBranch().then(function (result) {
      vm.branchItems = result.data;
      vm.filterlastPurchasebranchItem = vm.branchItems[0];
      vm.filterlastServicebranchItem = vm.branchItems[0];
    });
    managequestionaireService.getQuestionnaireType().then(function (result) {
      if (result.data) {
        if (result.data.length > 0) {
          vm.questTypeItems = result.data;
          vm.filterquestType = vm.questTypeItems[0];
          vm.searchParamList.questType = vm.filterquestType.value;
        }
      }
    });
    manageparticipantService.listTypePurchase().then(function (result) {
      if (result.data) {
        if (result.data.length > 0) {
          vm.typePurchaseItems = result.data;
          vm.filtertypePurchase = vm.typePurchaseItems[0];
          vm.searchParamList.typePurchase = vm.filtertypePurchase.value;
        }
      }
    });
    manageparticipantService.listResource().then(function (result) {
      if (result.data) {
        if (result.data.length > 0) {
          vm.resourceItems = result.data;
          vm.filterresource = vm.resourceItems[0];
          vm.searchParamList.resource = vm.filterresource.value;
        }
      }
    });
    managequestionaireService.getAreakabupatenAll().then(function (result) {
      vm.kabupatenItems = result.data;
      vm.filterkabupaten = vm.kabupatenItems[0];
    });
    $scope.gridOptionsList = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      enableFiltering: true,
      columnDefs: [
        { name: 'No', enableFiltering: false, field: 'No', width: 50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
        {
          name: 'action', enableFiltering: false, cellTemplate: '<div style="display: flex;align-items: center;justify-content: center;"><button type="button" ng-click="grid.appScope.vm.actionDetail(row.entity)" class="btn btn-success  btn-xs"><i class="ion-ios-information-outline"></i></button></div>', width: 100
        },
        { name: "title", width: 200 },
        { name: "nama", width: 200 },
        { name: "scenarioCode", width: 200 },
        { name: "scenarioName", width: 200 },
        { name: "kodeCabang", displayName: "Dealer Code", width: 200 },
        { name: "namaCabang", displayName: "Dealer Name", width: 200 },
        { name: "telepon", width: 200 },
        { name: "email", width: 200 },
        { name: "alamat", width: 200 },
        { name: "lastPurchase", width: 200 },
        { name: "source", width: 200 },
        { name: "tanggalTerima", width: 200 }
      ]
    };
    $scope.gridOptionsList.data = [];
    $scope.refreshGrid = function () {
      manageparticipantService.listParticipant(vm.searchParamList).then(function (results) {
        $scope.gridOptionsList.data = results.data;
      });
    }
    vm.actionDetail = function (params) {
      $state.go('manageparticipant.detailparticipant', { participant: params });
    };
    $scope.resetGrid = function () {
      $scope.gridOptionsList.data = [];
    }

  }
})();
