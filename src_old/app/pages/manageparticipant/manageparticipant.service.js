/**
 * @author ich-one
 * created on 6.11.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.manageparticipant')
        .factory('manageparticipantService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
        var manageparticipantServiceFactory = {};
        console.log("");
        manageparticipantServiceFactory.uploadParticipant = function (filename, data) {
            return $http.post(serviceBase + 'api/participant/post/uploadJson?FileName="'+filename+'"', data).then(function (results) {
                return results;
            }).catch(function (err, status) {
                return err;
            });
        };
        manageparticipantServiceFactory.listParticipant = function (param) {
            return $http.post(serviceBase + 'api/participant/post/searchlistparticipant', param).then(function (results) {
                return results;
            });
        };
        manageparticipantServiceFactory.listTypePurchase = function () {
            return $http.post(serviceBase + 'api/participant/post/typePurchase').then(function (results) {
                return results;
            });
        };
        manageparticipantServiceFactory.listResource = function () {
            return $http.post(serviceBase + 'api/participant/post/listResource').then(function (results) {
                return results;
            });
        };
        manageparticipantServiceFactory.getHistoryparticipant = function (SyncStatus) {
            return $http.get(serviceBase + 'api/participant/get/historyparticipant?SyncStatus='+SyncStatus+'').then(function (results) {
                return results;
            });
        };
        manageparticipantServiceFactory.getBranch = function () {
            return $http.get(serviceBase + 'api/questionnaire/get/dealer').then(function (results) {
                return results;
            });
        };
        manageparticipantServiceFactory.getParticipantById = function (id) {
            return $http.get(serviceBase + '/api/participant/get/getParticipantByID?id='+id).then(function (results) {
                return results;
            });
        };
        
        manageparticipantServiceFactory.getTemplateParticipant = function (id) {
            return $http.post(serviceBase + 'api/participant/post/downloadTemplateParticipant').then(function (results) {
                return results;
            });
        };
        return manageparticipantServiceFactory;
    }]);
})();