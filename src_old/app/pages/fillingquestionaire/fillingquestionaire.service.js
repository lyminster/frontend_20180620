/**
 * @author ich-one
 * created on 6.11.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.fillingquestionaire')
        .factory('fillingquestionaireService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
        var fillingquestionaireServiceFactory = {};
        
        fillingquestionaireServiceFactory.getAvailQuestionnaire = function () {
            return $http.get(serviceBase + 'api/questionnaire/get/availablequestionnaire').then(function (results) {
                return results;
            });
        };
        
        fillingquestionaireServiceFactory.getAvailQuestionnaireOlright = function () {
            return $http.get(serviceBase + 'api/questionnaire/get/availablequestionnaire?type=olright').then(function (results) {
                return results;
            });
        };
        
        fillingquestionaireServiceFactory.getAvailParticipant = function (questionnaireID) {
            return $http.get(serviceBase + 'api/questionnaire/get/fillingparticipantbyid?ID='+questionnaireID).then(function (results) {
                return results;
            });
        };
        fillingquestionaireServiceFactory.postNewParticipant = function (participant) {
            return $http.post(serviceBase + 'api/questionnaire/post/createfillingnewparticipant', participant).then(function (results) {
                return results;
            });
        };

        fillingquestionaireServiceFactory.getMainQuestion = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/startfilling', param).then(function (results) {
                return results;
            });
        };

        fillingquestionaireServiceFactory.getScreening = function (param, idParticipant) {
            return $http.get(serviceBase + 'api/questionnaire/get/startscreening?ID=' + param+'&idParticipant=' + idParticipant).then(function (results) {
                return results;
            });
        };
        fillingquestionaireServiceFactory.saveScreeningNewParticipant = function (param) {
            return $http.post(serviceBase + 'api/questionnaire/post/startscreeningnewparticipant', param).then(function (results) {
                return results;
            });
        };

        
        fillingquestionaireServiceFactory.saveScreeningNewParticipantOlright = function (param) {
            return $http.post(serviceBase + 'api/olright/post/startscreeningnewparticipant', param).then(function (results) {
                return results;
            });
        };

        fillingquestionaireServiceFactory.savefilling = function (param) {
            return $http.put(serviceBase + 'api/questionnaire/put/savefilling', param).then(function (results) {
                return results;
            });
        };
        
        fillingquestionaireServiceFactory.savefillingolright = function (param) {
            return $http.put(serviceBase + 'api/olright/put/savefilling', param).then(function (results) {
                return results;
            });
        };
        return fillingquestionaireServiceFactory;
    }]);
})();