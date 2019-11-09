/**
 * @author v.Ichone
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .service('fileUpload', fileUpload);

  /** @ngInject */
  function fileUpload($http, ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceAPIBaseUri;

    this.uploadFileToUrl = function(file, uploadUrl){
      var fd = new FormData();
      fd.append('file', file);
      var uploadUrl = serviceBase + uploadUrl;
      $http.post(uploadUrl, fd, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
      })
   }
  }
})();
