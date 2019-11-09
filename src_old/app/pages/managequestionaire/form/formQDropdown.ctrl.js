/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQdropdownCtrl', function($scope, $uibModalInstance, content, managequestionaireService) {
            $scope.formData = content.data; 
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            $scope.addAnswer = function () {
                var _uuid = managequestionaireService.getGuid();
                $scope.formData.answerDD.push({
                    uuid: _uuid,
                    sort: ($scope.formData.answerDD.length),
                    answerValue: "",
                    jumpTo: "Next"
                });
            }
            $scope.deleteAnswer = function (answer) {
                var numidx = $scope.formData.answerDD.indexOf(answer);
                $scope.formData.answerDD.splice(numidx, 1);
                for (var index = numidx; index < $scope.formData.answerDD.length; index++) {
                    var element = $scope.formData.answerDD[index];
                    if (element.sort != 99) {
                        element.sort = index;
                    }
                }
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
        
  })();