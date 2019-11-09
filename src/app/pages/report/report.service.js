/**
 * @author ich-one
 * created on 6.11.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.report')
        .factory('reportService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
        var reportServiceFactory = {};
        reportServiceFactory.postSerachRowData = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/searchrawdata', param).then(function (results) {
                return results;
            });
        }; 
        reportServiceFactory.postSerachPica = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/searchpica', param).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.getSummaryPica = function (param) {
            return $http.get(serviceBase + 'api/questionnaire/get/picasummary?ID='+ param).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.postGeneratePica = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/generatepica?ID='+ param).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.getPicalist = function (param) {
            return $http.get(serviceBase + 'api/questionnaire/get/picalist?ID='+ param).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.submitPica = function (param, data) {
            return $http.put(serviceBase + 'api/questionnaire/put/submitpica?ID='+ param, data).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.savePica = function (param, data) {
            return $http.put(serviceBase + 'api/questionnaire/put/savepica?ID='+ param, data).then(function (results) {
                return results;
            });
        };

        reportServiceFactory.downloadrawdata = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/downloadrawdata?id='+param).then(function (results) {
                return results;
            });
        };
        
        reportServiceFactory.downloadfile = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/downloadfile/?ID='+param).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.downloadsummaryrawdata = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/downloadsummaryrawdata',param).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.downloadpica = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/downloadpica?id='+ param).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.printpica = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/printpica?id='+ param).then(function (results) {
                return results;
            });
        };
        reportServiceFactory.getscenariostatus = function (param) {
            return $http.get(serviceBase + 'api/questionnaire/get/getscenariostatus').then(function (results) {
                return results;
            });
        };
        reportServiceFactory.generatewormreport = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/generatewormreport', param).then(function (results) {
                return results;
            });
        };
        
        reportServiceFactory.getreportregion = function () {
            return $http.post(serviceBase + 'api/questionnaire/post/getreportregion').then(function (results) {
                return results;
            });
        };
        
        reportServiceFactory.getreportdealer = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/getreportdealer?regionCode='+ param).then(function (results) {
                return results;
            });
        };
        return reportServiceFactory;
    }]);
})();