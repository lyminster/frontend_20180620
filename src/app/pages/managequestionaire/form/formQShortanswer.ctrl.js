/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQshortanswerCtrl', function($scope, $uibModalInstance, content) {
            $scope.formData = content.data; 
            $scope.formTypes = [
                {label: 'Text', value: 'text'},
                {label: 'Number', value: 'number'}
            ];
            $scope.typrselect = {label: 'Text', value: 'text'};
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
        
  })(); 