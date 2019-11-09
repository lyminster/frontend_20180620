/**
 * @author ich-one
 * created on 6.11.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.privilege')
        .factory('privilegeService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
        var privilegeServiceFactory = {};
        privilegeServiceFactory.postListemployee = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/searchlistemployee', param).then(function (results) {
                return results;
            });
        }; 
        privilegeServiceFactory.postListuser = function () {
            return $http.post(serviceBase + 'api/user/post/listuser').then(function (results) {
                return results;
            });
        }; 
        privilegeServiceFactory.getEmployeedetail = function (param) {
            return $http.get(serviceBase + 'api/questionnaire/get/getemployeedetail?id='+param).then(function (results) {
                return results;
            });
        };
        
        privilegeServiceFactory.postGroupuserPrivilege = function () {
            return $http.post(serviceBase + 'api/user/post/groupuserpriviledge').then(function (results) {
                return results;
            });
        };
        privilegeServiceFactory.postGroupuser = function () {
            return $http.post(serviceBase + 'api/user/post/groupuser').then(function (results) {
                return results;
            });
        };
        privilegeServiceFactory.postUpdateuser = function (param) {
            return $http.post(serviceBase + 'api/user/post/edit', param).then(function (results) {
                return results;
            });
        };
        privilegeServiceFactory.postinsertuser = function (param) {
            return $http.post(serviceBase + 'api/user/post/create', param).then(function (results) {
                return results;
            });
        };
        privilegeServiceFactory.postGroupuserById = function (id) {
            return $http.post(serviceBase + 'api/user/post/groupuser?id='+id).then(function (results) {
                return results;
            });
        };
        privilegeServiceFactory.getPriviledgeByGroup = function (param) {
            return $http.get(serviceBase + 'api/questionnaire/get/getPriviledgeByGroup?idGroup='+param).then(function (results) {
                return results;
            });
        };
        privilegeServiceFactory.postUpdatePriviledge = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/updatePriviledge', param).then(function (results) {
                return results;
            });
        };
        return privilegeServiceFactory;
    }]);
})();