/**
 * @author ichone
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

            var authInterceptorServiceFactory = {};

            var _request = function (config) {
                config.headers = config.headers || {};
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.token;
                }
                return config;
            }

            // var retryHttpRequest = function (config, deferred){
            //     function successCallback(response){
            //     deferred.resolve(response);
            //     }
            //     function errorCallback(response){
            //     deferred.reject(response);
            //     }
            //     var $http = $injector.get('$http');
            //     $http(config).then(successCallback, errorCallback);
            // }

            var _responseError = function (rejection) {

                var message = $injector.get('toastr');
                var $http = $injector.get('$http');
                if (rejection.status === 401) {
                    var authService = $injector.get('authService');
                    var authData = localStorageService.get('authorizationData');
                    if (authData) {
                        if (authData.useRefreshTokens) {

                            // first create new session server-side
                            var defer = $q.defer();
                            var promiseSession = defer.promise;
                            authService.refreshToken();
                            var promiseUpdate = promiseSession.then(function(){
                                return $http(rejection.config);
                            });
                            //retryHttpRequest(rejection.config, deferred);
                            return $q.reject(rejection);
                        }

                    }
                    authService.logOut();
                } else if (rejection.status === 400) {
                    
                } else {
                    var errorCode = 'Error : ' + rejection.status;

                    var messageError = '';
                    if (rejection.data !== null) {
                        messageError += '\n\rMessage: ' + rejection.data.message+' ';
                    }
                    messageError += '\n\rWhen call method ' + rejection.config.method + ' from url "' + rejection.config.url + '",\n\r Please contact your administrator ';

                    message.error(messageError, errorCode);
                }
                return $q.reject(rejection);
            }

            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;

            return authInterceptorServiceFactory;
        }]);
})();