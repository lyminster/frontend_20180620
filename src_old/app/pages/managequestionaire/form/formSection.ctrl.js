/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formSectionCtrl', function($scope, $uibModalInstance, content) {
            $scope.formData = content.data; 
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
  })();