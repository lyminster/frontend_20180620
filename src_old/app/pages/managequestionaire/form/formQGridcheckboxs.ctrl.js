/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQgridcheckboxCtrl', function($scope, $uibModalInstance, content, managequestionaireService) {
            $scope.formData = content.data; 
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            $scope.addAnswer = function () {
                var _uuid = managequestionaireService.getGuid();
                $scope.formData.answerCBG.push({
                    uuid: _uuid,
                    sort: ($scope.formData.answerCBG.length + 1),
                    answerValue: "",
                    jumpTo: "Next"
                });
            }
            $scope.deleteAnswer = function (answer) {
                $scope.formData.answerCBG.splice($scope.formData.answerCBG.indexOf(answer), 1);
            }
            $scope.addColumn = function () {
                var _uuid = managequestionaireService.getGuid();
                $scope.formData.columnCBG.push({
                    uuid: _uuid,
                    sort: ($scope.formData.columnCBG.length + 1),
                    columnText: "",
                });
            }
            $scope.deleteColumn = function (col) {
                $scope.formData.columnCBG.splice($scope.formData.columnCBG.indexOf(col), 1);
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
  })();