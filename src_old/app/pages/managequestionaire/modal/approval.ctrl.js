/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('approvalCtrl', function($scope, $uibModalInstance, content) {
            $scope.formData = {}; 
            if (content.data == 'approve') {
                $scope.title = 'Note Approve';
                $scope.isNote = true;
            }else if (content.data == 'revise') {
                $scope.title = 'Reasons Revise';
                $scope.isNote = false;
            }else if (content.data == 'reject') {
                $scope.title = 'Reasons Reject';
                $scope.isNote = false;
            }
            $scope.ok = function() {
                var returnNote = '';
                if ($scope.isNote) {
                    returnNote = $scope.formData.note;
                }else{
                    returnNote = $scope.formData.reasons;
                }
                $uibModalInstance.close(returnNote);
            };
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });
  })();