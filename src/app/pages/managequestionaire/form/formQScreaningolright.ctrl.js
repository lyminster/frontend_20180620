/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQScreaningolrightCtrl', function($scope, $uibModalInstance, content, managequestionaireService) {
            $scope.formData = content.data; 
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            $scope.addAnswer = function () {
                var _uuid = managequestionaireService.getGuid();
                if ($scope.formData.answerRB) {
                    $scope.formData.answerRB.push({
                        uuid: _uuid,
                        sort: ($scope.formData.answerRB.length + 1),
                        answerValue: "",
                        jumpTo:  { label: 'Next Question', value: 'Next' }
                    });
                }else if ($scope.formData.answerDD) {
                    $scope.formData.answerDD.push({
                        uuid: _uuid,
                        sort: ($scope.formData.answerDD.length + 1),
                        answerValue: "",
                        jumpTo:  { label: 'Next Question', value: 'Next' }
                    });
                }else if ($scope.formData.answerCB) {
                    $scope.formData.answerCB.push({
                        uuid: _uuid,
                        sort: ($scope.formData.answerCB.length + 1),
                        answerValue: "",
                        jumpTo:  { label: 'Next Question', value: 'Next' }
                    });
                }
            }
            $scope.deleteAnswer = function (answer) {
                if ($scope.formData.answerCB) {
                    var numidx = $scope.formData.answerCB.indexOf(answer);
                    $scope.formData.answerCB.splice(numidx, 1);
                    for (var index = numidx; index < $scope.formData.answerCB.length; index++) {
                        var element = $scope.formData.answerCB[index];
                        if (element.sort != 99) {
                            element.sort = index;
                        }
                    }
                }
                if ($scope.formData.answerRB) {
                    var numidx = $scope.formData.answerRB.indexOf(answer);
                    $scope.formData.answerRB.splice(numidx, 1);
                    for (var index = numidx; index < $scope.formData.answerRB.length; index++) {
                        var element = $scope.formData.answerRB[index];
                        if (element.sort != 99) {
                            element.sort = index;
                        }
                    }
                }
                if ($scope.formData.answerDD) {
                    var numidx = $scope.formData.answerDD.indexOf(answer);
                    $scope.formData.answerDD.splice(numidx, 1);
                    for (var index = numidx; index < $scope.formData.answerDD.length; index++) {
                        var element = $scope.formData.answerDD[index];
                        if (element.sort != 99) {
                            element.sort = index;
                        }
                    }
                }
            }
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
  })();