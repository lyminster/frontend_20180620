/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQScreaningCtrl', function($scope, $uibModalInstance, content) {
            $scope.formData = content.data; 
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            $scope.addAnswer = function () {
                $scope.formData.answerRB.push({
                    sort: ($scope.formData.answerRB.length + 1),
                    answerValue: "",
                    jumpTo: "Next"
                });
            }
            $scope.deleteAnswer = function (answer) {
                $scope.formData.answerRB.splice($scope.formData.answerRB.indexOf(answer), 1);
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
        
  })();