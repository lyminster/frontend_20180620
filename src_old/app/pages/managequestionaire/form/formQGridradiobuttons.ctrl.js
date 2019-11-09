/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQgridradiobuttonCtrl', function($scope, $uibModalInstance, content, managequestionaireService) {
            $scope.formData = content.data; 
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            $scope.addAnswer = function () {
                var _uuid = managequestionaireService.getGuid();
                $scope.formData.answerRBG.push({
                    uuid: _uuid,
                    sort: ($scope.formData.answerRBG.length + 1),
                    answerValue: "",
                    jumpTo: "Next"
                });
            }
            $scope.deleteAnswer = function (answer) {
                $scope.formData.answerRBG.splice($scope.formData.answerRBG.indexOf(answer), 1);
            }
            $scope.addColumn = function () {
                var _uuid = managequestionaireService.getGuid();
                $scope.formData.columnRBG.push({
                    uuid: _uuid,
                    sort: ($scope.formData.columnRBG.length + 1),
                    columnText: "",
                });
            }
            $scope.deleteColumn = function (col) {
                $scope.formData.columnRBG.splice($scope.formData.columnRBG.indexOf(col), 1);
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
        
  })();