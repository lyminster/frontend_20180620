/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.report')
        .controller('generatepicactrl', generatepicactrl);
  
    /** @ngInject */
    function generatepicactrl($state,  $window, authService, ngAuthSettings, $stateParams, $scope, $filter, toastr, editableOptions, editableThemes, managequestionaireService, manageparticipantService, reportService) {
        var vm = this;
        if ($stateParams.questionaire === null) {
            $state.go('report.pica');
            return;
        }
        
        vm.serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
        vm.title = 'General Information';
        vm.questionaire = $stateParams.questionaire;
        vm.picaModel = [];
        vm.gridPica = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            rowHeight: 100,
            enableFiltering: true,
            columnDefs: [
                { name: 'No', enableFiltering: false, field: 'No', width:50, cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1 }}</div>' },
                { name: 'attributeProblem', displayName: "Attribute Problem", width: 300, cellTemplate: '<textarea readonly type="text" name="reasons" style="color: black;background: #f2f2f2;resize: none;" class="col-sm-8 form-control" ng-model="row.entity.attributeProblem"></textarea>' , enableCellEdit: false},
                { name: 'indexAttribute', displayName: "Index Attribute", width: 200 , enableCellEdit: false},
                { name: 'topTwoBox', displayName: "Top Two Box", width: 200 , enableCellEdit: false},
                { name: 'problemIdentification', displayName: "Problem Identification", width: 300 , cellTemplate: '<textarea readonly type="text" name="reasons" style="color: black;background: #f2f2f2;resize: none;" class="col-sm-8 form-control" ng-model="row.entity.problemIdentification"></textarea>', enableCellEdit: false},
                { name: 'planCounterMeasure', displayName: "Plan Counter Measure", width: 300, cellTemplate: '<textarea type="text" name="reasons"  style="color: black;background: #f2f2f2;resize: none;" class="col-sm-8 form-control" ng-model="row.entity.planCounterMeasure"></textarea>', enableCellEdit: false},
                { name: 'planImplementation', displayName: "Plan Implementation", width: 300, cellTemplate: '<textarea type="text" name="reasons"  style="color: black;background: #f2f2f2;resize: none;" class="col-sm-8 form-control" ng-model="row.entity.planImplementation"></textarea>', enableCellEdit: false},
                { name: 'picName', displayName: "PIC Name", width: 100, cellTemplate: '<input type="text" id="exampleInput" name="input" ng-model="row.entity.picName" placeholder="PIC Name" />', enableCellEdit: false},
                { name: 'startdate', displayName: "Start Date", width: 150, type: 'date', cellFilter: 'date:"yyyy-MM-dd"', cellTemplate: '<input date-input  type="date" id="exampleInput" name="input" ng-model="row.entity.startdate" placeholder="yyyy-MM-dd" />', enableCellEdit: false },
                { name: 'enddate', displayName: "End Date", width: 150, type: 'date', cellFilter: 'date:"yyyy-MM-dd"', cellTemplate: '<input date-input  type="date" id="exampleInput" name="input" ng-model="row.entity.enddate" placeholder="yyyy-MM-dd" />', enableCellEdit: false }
            ],
            data: []
        };
        vm.getSummaryPica = function () {
            reportService.getSummaryPica(vm.questionaire.questionnaireId).then(function (result) {
                vm.questionaire = result.data;
                vm.questionaire.status
                vm.gridPica.data = vm.questionaire.picaData;
            });
        }
        vm.getSummaryPica();
        vm.getListPica = function () {
            reportService.getPicalist(vm.questionaire.questionnaireId).then(function (result) {
                vm.gridPica.data = result.data;
            });
        }
        
        vm.getListPica();
        vm.generatePica = function () {
            reportService.postGeneratePica(vm.questionaire.questionnaireId).then(function (result) {
                vm.gridPica.data = result.data;
            });
        };
        vm.resetGrid = function () {
            vm.gridQuestionaire.data = [];
        };
        vm.downloadrow = function () {
            toastr.info('This Fiture will available soon', 'Info');
        };
        
        reportService.getscenariostatus().then(function (result) {
            vm.statusItems = result.data;
            vm.filterStatus = vm.statusItems[0];
            vm.searchParam.status = vm.filterStatus.value;
        });
        vm.savePica = function () {
            reportService.savePica(vm.questionaire.questionnaireId,vm.gridPica.data).then(function (result) {
                if (result.data.result == "OK") {
                    toastr.success(result.data.message, 'Success');
                    vm.getSummaryPica();
                } else {
                    toastr.error(result.data.message, 'Error');
                } 
            });
        };
        vm.submitPica = function () {
            reportService.submitPica(vm.questionaire.questionnaireId,vm.gridPica.data).then(function (result) {
                if (result.data.result == "OK") {
                    toastr.success(result.data.message, 'Success');
                    vm.getSummaryPica();
                } else {
                    toastr.error(result.data.message, 'Error');
                } 
            });
        };
        vm.printPica = function () {
            reportService.printpica(vm.questionaire.questionnaireId).then(function (result) {
                var wdw = $window.open(vm.serviceBase +'file/'+result.data.fileName,'_blank');
                console.log(result);
                setTimeout(function() {
                    wdw.close();
                }, 5000);
            });
        };
        
    }
  })();