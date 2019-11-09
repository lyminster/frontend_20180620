/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQradiobuttonCtrl', function($scope, $uibModalInstance, content, managequestionaireService) {
            $scope.formData = content.data; 
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            $scope.addAnswer = function () {
                var _uuid = managequestionaireService.getGuid();
                $scope.formData.answerRB.push({
                    uuid: _uuid,
                    sort: ($scope.formData.answerRB.length),
                    answerValue: "",
                    jumpTo: "Next"
                });
            }
            $scope.deleteAnswer = function (answer) {
                var numidx = $scope.formData.answerRB.indexOf(answer);
                $scope.formData.answerRB.splice(numidx, 1);
                for (var index = numidx; index < $scope.formData.answerRB.length; index++) {
                    var element = $scope.formData.answerRB[index];
                    if (element.sort != 99) {
                        element.sort = index;
                    }
                }
                //$scope.formData.answerRB.splice($scope.formData.answerRB.indexOf(answer), 1);
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
        
  })();