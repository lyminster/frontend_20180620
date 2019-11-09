/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .controller('uploadfilectrl', function ($scope, ngAuthSettings, fileUpload, $http, toastr, monitoringService, $uibModalInstance, content) {
            $scope.id = content.data;
            var serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.uploadFile = function () {
                var file = $scope.myFile;
                var namefile = angular.copy(file.name);
                console.log('file is ');
                console.dir(file);

                var uploadUrl = "api/questionnaire/post/uploadfile/?ID=" + $scope.id;
                var fd = new FormData();
                fd.append('file', file);
                var uploadUrl = serviceBase + uploadUrl;
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).then(function () {
                    $uibModalInstance.close(namefile);
                });
            };
        });
})();