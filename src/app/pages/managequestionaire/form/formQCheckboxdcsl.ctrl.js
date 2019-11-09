/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQcheckboxdcslCtrl', function ($scope, $uibModalInstance, content, managequestionaireService) {
            $scope.formData = content.data;
            $scope.ok = function () {
                $uibModalInstance.close($scope.formData);
            };
            $scope.addAnswer = function () {
                var _uuid = managequestionaireService.getGuid();
                $scope.formData.answerCB.push({
                    uuid: _uuid,
                    sort: ($scope.formData.answerCB.length),
                    answerValue: "",
                    jumpTo: "Next"
                });
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
            }
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });

})();