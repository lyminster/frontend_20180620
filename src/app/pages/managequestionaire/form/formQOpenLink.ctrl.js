/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('formQopenLinkCtrl', function($scope, $uibModalInstance, content, managequestionaireService) {
            $scope.formData = content.data; 
            console.log(content.data)
            $scope.ok = function() {
                $uibModalInstance.close($scope.formData);
            };
            
            $scope.copydata = function(){
                var copyText = document.getElementById("urldata");
                copyText.select();
                copyText.setSelectionRange(0, 99999)
                document.execCommand("copy");
            }
        });
        
  })();