/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('generatenewctrl', function ($scope,toastr, monitoringService, $uibModalInstance, content) {
            $scope.title = content.title;
            $scope.formData = content.data;
            $scope.questionaire = content.questionaire;
            $scope.ok = function () {
                monitoringService.generateparticipant($scope.questionaire.questionnaireId, $scope.formData.value).then(function (result) {
                    if (result.data.result == "OK") {
                        toastr.success(result.data.message, 'Success');
                        $uibModalInstance.close($scope.formData);
                    } else {
                        toastr.error(result.data.message, 'Error');
                        return;
                    }
                });
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });
})();