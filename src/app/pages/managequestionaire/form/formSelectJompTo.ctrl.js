/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formSelectJompToCtrl', function ($scope, $uibModalInstance, content) {
            $scope.header = angular.copy(content.data);
            $scope.questions = angular.copy(content.questions);
            $scope.listSelect = [{ label: 'Next Question', value: 'Next' }];
            if ($scope.questions) {
                $scope.questions.forEach(function (element) {
                    var _option = {
                        label: element.question, value: element.uuid
                    }
                    $scope.listSelect.push(_option);
                })
            }

            $scope.listSelect.push({ label: 'End/Finish Questionair', value: 'End' });
            $scope.selected = $scope.listSelect[0];
            $scope.ok = function () {
                $uibModalInstance.close($scope.selected);
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });

})();