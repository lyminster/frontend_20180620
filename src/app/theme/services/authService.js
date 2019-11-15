/**
 * @author ichone
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('authService', ['$http', '$window', '$q', 'localStorageService', 'ngAuthSettings', 'xdLocalStorage', function ($http, $window, $q, localStorageService, ngAuthSettings, xdLocalStorage) {

            var serviceBase = ngAuthSettings.apiServiceBaseUri;
            var serviceApiBase = ngAuthSettings.apiServiceAPIBaseUri;
            var urlLoginSso = ngAuthSettings.urlLoginSso;
            var useSso = ngAuthSettings.useSso;
            var authServiceFactory = {};

            var _authentication = {
                isAuth: false,
                isOpen:false,
                userName: "",
                useRefreshTokens: false,
                dealerID: "",
                regionID: "",
                mainDealerName: "",
                mainDealerCode: "",
                dealerCode: "",
                dealerName: "",
                hsoid: "",
                IsHO: "",
                hondaID: "",
                fullName: ""
            };

            var _functionIsHave = [
            ];

            var _itsAllowFunction = function (funcName) {
                //return true;
                return _functionIsHave.indexOf(funcName) !== -1;
            }

            var _externalAuthData = {
                provider: "",
                userName: "",
                externalAccessToken: ""
            };

            var _isAllowd
            var _saveRegistration = function (registration) {

                _logOut();

                return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
                    return response;
                });

            };

            var _login = function (loginData) {

                var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

                if (loginData.useRefreshTokens) {
                    data = data + "&client_id=" + ngAuthSettings.clientId;
                }

                var deferred = $q.defer();

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                    if (loginData.useRefreshTokens) {
                        localStorageService.set('authorizationData', {
                            token: response.data.access_token,
                            userName: loginData.userName,
                            refreshToken: response.data.refresh_token,
                            useRefreshTokens: true,
                            IsHO: response.data.IsHO,
                            dealerID: response.data.dealerID,
                            regionID: response.data.regionID,
                            mainDealerName: response.data.mainDealerName,
                            mainDealerCode: response.data.mainDealerCode,
                            dealerCode: response.data.dealerCode,
                            dealerName: response.data.dealerName,
                            hsoid: response.data.hsoid,
                            hondaID: response.data.hondaID,
                            fullName: response.data.userName,
                            functionIsHave: _functionIsHave,
                            provinceID: response.data.provinceID
                        });
                    }
                    else {
                        localStorageService.set('authorizationData', {
                            token: response.data.access_token,
                            userName: loginData.userName,
                            refreshToken: "",
                            useRefreshTokens: false,
                            dealerID: response.data.dealerID,
                            regionID: response.data.regionID,
                            IsHO: response.data.IsHO,
                            mainDealerName: response.data.mainDealerName,
                            mainDealerCode: response.data.mainDealerCode,
                            dealerCode: response.data.dealerCode,
                            dealerName: response.data.dealerName,
                            hsoid: response.data.hsoid,
                            hondaID: response.data.hondaID,
                            fullName: response.data.userName,
                            functionIsHave: _functionIsHave,
                            provinceID: response.data.provinceID
                        });
                    }
                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;
                    _authentication.useRefreshTokens = loginData.useRefreshTokens;
                    _authentication.dealerID = response.data.dealerID;
                    _authentication.regionID = response.data.regionID;
                    _authentication.IsHO = response.data.IsHO;
                    _authentication.mainDealerName = response.data.mainDealerName;
                    _authentication.mainDealerCode = response.data.mainDealerCode;
                    _authentication.dealerCode = response.data.dealerCode;
                    _authentication.dealerName = response.data.dealerName;
                    _authentication.hsoid = response.data.hsoid;
                    _authentication.hondaID = response.data.hondaID;
                    _authentication.fullName = response.data.userName;
                    _authentication.provinceID = response.data.provinceID;
                    $http.post(serviceApiBase + 'api/questionnaire/post/priviledges').then(function (results) {
                        _functionIsHave = results.data;
                        if (loginData.useRefreshTokens) {
                            localStorageService.set('authorizationData', {
                                token: response.data.access_token,
                                userName: loginData.userName,
                                refreshToken: response.data.refresh_token,
                                useRefreshTokens: true,
                                dealerID: response.data.dealerID,
                                IsHO: response.data.IsHO,
                                regionID: response.data.regionID,
                                mainDealerName: response.data.mainDealerName,
                                mainDealerCode: response.data.mainDealerCode,
                                dealerCode: response.data.dealerCode,
                                dealerName: response.data.dealerName,
                                hsoid: response.data.hsoid,
                                hondaID: response.data.hondaID,
                                fullName: response.data.userName,
                                functionIsHave: _functionIsHave,
                                provinceID: response.data.provinceID
                            });
                        }
                        else {
                            localStorageService.set('authorizationData', {
                                token: response.data.access_token,
                                userName: loginData.userName,
                                refreshToken: "",
                                useRefreshTokens: false,
                                dealerID: response.data.dealerID,
                                regionID: response.data.regionID,
                                IsHO: response.data.IsHO,
                                mainDealerName: response.data.mainDealerName,
                                mainDealerCode: response.data.mainDealerCode,
                                dealerCode: response.data.dealerCode,
                                dealerName: response.data.dealerName,
                                hsoid: response.data.hsoid,
                                hondaID: response.data.hondaID,
                                fullName: response.data.userName,
                                functionIsHave: _functionIsHave,
                                provinceID: response.data.provinceID
                            });
                        }
                        debugger;
                        // $http.post(serviceApiBase + 'api/questionnaire/post/allfilters').then(function (subresults) {
                        //     localStorageService.set('mastertarget', subresults.data.target);
                        //     localStorageService.set('mastergeneral', subresults.data.general);
                        // });
                    });
                    deferred.resolve(response);

                }).catch(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });

                return deferred.promise;

            };

            var _loginSso = function () {
                $window.location.href = urlLoginSso;
            };
            var _logoutSso = function (params) {
                _loginSso();
                // var storage = new CrossStorageClient(urlLoginSso, {
                //     timeout: 5000,
                //     frameId: 'storageFrame'
                // });
                // storage.onConnect().then(function () {
                //     return storage.del('ui.TokenSet');
                //     return storage.del('ui.UserInfo');
                // }).then(function (res) {
                //     _loginSso();
                // }).catch(function (err) {
                //     _loginSso();
                // });
            }
            var _validateSso = function (dataToken) {
                //var data = dataToken;
                var data = "grant_type=derik_love_dea&access_token=" + dataToken.access_token + "&refresh_token=" + dataToken.refresh_token + "&token_type=" + dataToken.token_type;
                //data.grant_type="derik_love_dea";
                var deferred = $q.defer();
                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                    localStorageService.set('authorizationData', {
                        token: response.data.access_token,
                        userName: response.data.userName,
                        refreshToken: "",
                        useRefreshTokens: false,
                        dealerID: response.data.dealerID,
                        regionID: response.data.regionID,
                        IsHO: response.data.IsHO,
                        mainDealerName: response.data.mainDealerName,
                        mainDealerCode: response.data.mainDealerCode,
                        dealerCode: response.data.dealerCode,
                        dealerName: response.data.dealerName,
                        hsoid: response.data.hsoid,
                        hondaID: response.data.hondaID,
                        fullName: response.data.userName,
                        functionIsHave: _functionIsHave,
                        provinceID: response.data.provinceID
                    });
                    _authentication.isAuth = true;
                    _authentication.userName = response.data.userName;
                    //_authentication.useRefreshTokens = response.data.useRefreshTokens;
                    _authentication.dealerID = response.data.dealerID;
                    _authentication.regionID = response.data.regionID;
                    _authentication.IsHO = response.data.IsHO;
                    _authentication.mainDealerName = response.data.mainDealerName;
                    _authentication.mainDealerCode = response.data.mainDealerCode;
                    _authentication.dealerCode = response.data.dealerCode;
                    _authentication.dealerName = response.data.dealerName;
                    _authentication.hsoid = response.data.hsoid;
                    _authentication.hondaID = response.data.hondaID;
                    _authentication.fullName = response.data.userName;
                    _authentication.provinceID = response.data.provinceID;
                    $http.post(serviceApiBase + 'api/questionnaire/post/priviledges').then(function (results) {
                        _functionIsHave = results.data;
                        localStorageService.set('authorizationData', {
                            token: response.data.access_token,
                            userName: response.data.userName,
                            refreshToken: "",
                            useRefreshTokens: false,
                            dealerID: response.data.dealerID,
                            regionID: response.data.regionID,
                            IsHO: response.data.IsHO,
                            mainDealerName: response.data.mainDealerName,
                            mainDealerCode: response.data.mainDealerCode,
                            dealerCode: response.data.dealerCode,
                            dealerName: response.data.dealerName,
                            hsoid: response.data.hsoid,
                            hondaID: response.data.hondaID,
                            fullName: response.data.userName,
                            functionIsHave: _functionIsHave,
                            provinceID: response.data.provinceID
                        });
                        debugger;
                        $http.post(serviceApiBase + 'api/questionnaire/post/allfilters').then(function (subresults) {
                            localStorageService.set('mastertarget', subresults.data.target);
                            localStorageService.set('mastergeneral', subresults.data.general);
                        });
                    });
                    deferred.resolve(response);

                }).catch(function (err, status) {
                    debugger;
                    _logOut();
                    _loginSso();
                    deferred.reject(err);
                });
                return deferred.promise;
            }

            var _logOut = function () {
                localStorageService.remove('authorizationData');
                localStorageService.remove('mastertarget');
                localStorageService.remove('mastergeneral');
                _authentication.isAuth = false;
                _authentication.userName = "";
                _authentication.useRefreshTokens = false;
                _authentication.dealerID = "";
                _authentication.regionID = "";
                _authentication.mainDealerName = "";
                _authentication.mainDealerCode = "";
                _authentication.IsHO = "";
                _authentication.dealerCode = "";
                _authentication.dealerName = "";
                _authentication.hsoid = "";
                _authentication.hondaID = "";
                _authentication.fullName = "";
                _authentication.provinceID = "";
                _functionIsHave = [];
                if (useSso) {
                    _logoutSso();
                }
            };

            var _fillAuthData = function () {
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    _authentication.isAuth = true;
                    _authentication.userName = authData.userName;
                    _authentication.useRefreshTokens = authData.useRefreshTokens;
                    _authentication.dealerID = authData.dealerID;
                    _authentication.regionID = authData.regionID;
                    _authentication.IsHO = authData.IsHO;
                    _authentication.mainDealerName = authData.mainDealerName;
                    _authentication.mainDealerCode = authData.mainDealerCode;
                    _authentication.dealerCode = authData.dealerCode;
                    _authentication.dealerName = authData.dealerName;
                    _authentication.hsoid = authData.hsoid;
                    _authentication.hondaID = authData.hondaID;
                    _authentication.fullName = authData.fullName;
                    _functionIsHave = authData.functionIsHave;
                    // _authentication.provinceID = response.data.provinceID;
                }
            };

            var _fillAuthDataSso = function () {
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    _authentication.isAuth = true;
                    _authentication.userName = authData.userName;
                    _authentication.useRefreshTokens = authData.useRefreshTokens;
                    _authentication.dealerID = authData.dealerID;
                    _authentication.regionID = authData.regionID;
                    _authentication.IsHO = authData.IsHO;
                    _authentication.mainDealerName = authData.mainDealerName;
                    _authentication.mainDealerCode = authData.mainDealerCode;
                    _authentication.dealerCode = authData.dealerCode;
                    _authentication.dealerName = authData.dealerName;
                    _authentication.hsoid = authData.hsoid;
                    _authentication.hondaID = authData.hondaID;
                    _authentication.fullName = authData.fullName;
                    _functionIsHave = authData.functionIsHave;
                    _authentication.provinceID = authData.provinceID;
                } else {
                    var storage = new CrossStorageClient(urlLoginSso, {
                        timeout: 5000,
                        frameId: 'storageFrame'
                    });
                    storage.onConnect().then(function () {
                        return storage.get('ui.TokenSet');
                    }).then(function (res) {
                        //console.log(res);
                        var newToken = JSON.parse(res);
                        if (newToken.TokenSet) {
                            _validateSso(newToken.TokenSet);
                        } else {
                            _loginSso();
                        }
                    }).catch(function (err) {
                        // console.log("Error Read Local storage : ");
                        console.log(err);
                        //debugger;
                        // alert("");
                        alert(err.message);
                        _loginSso();
                    });

                }
            };

            var _refreshToken = function () {
                var deferred = $q.defer();
                var authData = localStorageService.get('authorizationData');
                var loginData = angular.copy(_authentication);
                if (authData) {
                    if (authData.useRefreshTokens) {
                        var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;
                        localStorageService.remove('authorizationData');
                        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                            localStorageService.set('authorizationData', {
                                token: response.data.access_token,
                                userName: loginData.userName,
                                refreshToken: response.data.refresh_token,
                                useRefreshTokens: loginData.useRefreshTokens,
                                dealerID: response.data.dealerID,
                                regionID: response.data.regionID,
                                IsHO: response.data.IsHO,
                                mainDealerName: response.data.mainDealerName,
                                mainDealerCode: response.data.mainDealerCode,
                                dealerCode: response.data.dealerCode,
                                dealerName: response.data.dealerName,
                                hsoid: response.data.hsoid,
                                hondaID: response.data.hondaID,
                                fullName: response.data.userName,
                                provinceID: response.data.provinceID
                            });
                            _authentication.isAuth = true;
                            _authentication.userName = loginData.userName;
                            _authentication.useRefreshTokens = loginData.useRefreshTokens;
                            _authentication.dealerID = response.data.dealerID;
                            _authentication.regionID = response.data.regionID;
                            _authentication.IsHO = response.data.IsHO;
                            _authentication.mainDealerName = response.data.mainDealerName;
                            _authentication.mainDealerCode = response.data.mainDealerCode;
                            _authentication.dealerCode = response.data.dealerCode;
                            _authentication.dealerName = response.data.dealerName;
                            _authentication.hsoid = response.data.hsoid;
                            _authentication.hondaID = response.data.hondaID;
                            _authentication.fullName = response.data.userName;
                            _authentication.provinceID = response.data.provinceID;
                            $http.post(serviceApiBase + 'api/questionnaire/post/priviledges').then(function (results) {
                                _functionIsHave = results.data;
                                if (loginData.useRefreshTokens) {
                                    localStorageService.set('authorizationData', {
                                        token: response.data.access_token,
                                        userName: loginData.userName,
                                        refreshToken: response.data.refresh_token,
                                        useRefreshTokens: true,
                                        dealerID: response.data.dealerID,
                                        regionID: response.data.regionID,
                                        IsHO: response.data.IsHO,
                                        mainDealerName: response.data.mainDealerName,
                                        mainDealerCode: response.data.mainDealerCode,
                                        dealerCode: response.data.dealerCode,
                                        dealerName: response.data.dealerName,
                                        hsoid: response.data.hsoid,
                                        hondaID: response.data.hondaID,
                                        fullName: response.data.userName,
                                        functionIsHave: _functionIsHave,
                                        provinceID: response.data.provinceID
                                    });
                                }
                                else {
                                    localStorageService.set('authorizationData', {
                                        token: response.data.access_token,
                                        userName: loginData.userName,
                                        refreshToken: "",
                                        useRefreshTokens: false,
                                        dealerID: response.data.dealerID,
                                        regionID: response.data.regionID,
                                        IsHO: response.data.IsHO,
                                        mainDealerName: response.data.mainDealerName,
                                        mainDealerCode: response.data.mainDealerCode,
                                        dealerCode: response.data.dealerCode,
                                        dealerName: response.data.dealerName,
                                        hsoid: response.data.hsoid,
                                        hondaID: response.data.hondaID,
                                        fullName: response.data.userName,
                                        functionIsHave: _functionIsHave,
                                        provinceID: response.data.provinceID
                                    });
                                }
                            });
                        }).catch(function (err, status) {
                            _logOut();
                            deferred.reject(err);
                        });
                    }
                }

                return deferred.promise;
            };

            var _obtainAccessToken = function (externalData) {
                var deferred = $q.defer();
                $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {
                    localStorageService.set('authorizationData', {
                        token: response.data.access_token,
                        userName: loginData.userName,
                        refreshToken: response.data.refresh_token,
                        useRefreshTokens: true,
                        dealerID: response.data.dealerID,
                        regionID: response.data.regionID,
                        IsHO: response.data.IsHO,
                        mainDealerName: response.data.mainDealerName,
                        mainDealerCode: response.data.mainDealerCode,
                        dealerCode: response.data.dealerCode,
                        dealerName: response.data.dealerName,
                        hsoid: response.data.hsoid,
                        hondaID: response.data.hondaID,
                        fullName: response.data.userName,
                        provinceID: response.data.provinceID
                    });
                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;
                    _authentication.useRefreshTokens = loginData.useRefreshTokens;
                    _authentication.dealerID = response.data.dealerID;
                    _authentication.regionID = response.data.regionID;;
                    _authentication.IsHO = response.data.IsHO;
                    _authentication.mainDealerName = response.data.mainDealerName;
                    _authentication.mainDealerCode = response.data.mainDealerCode;
                    _authentication.dealerCode = response.data.dealerCode;
                    _authentication.dealerName = response.data.dealerName;
                    _authentication.hsoid = response.data.hsoid;
                    _authentication.hondaID = response.data.hondaID;
                    _authentication.fullName = response.data.userName;
                    _authentication.provinceID = response.data.provinceID;
                    deferred.resolve(response);
                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });

                return deferred.promise;

            };

            var _registerExternal = function (registerExternalData) {
                var deferred = $q.defer();
                $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.data.userName, refreshToken: "", useRefreshTokens: false });


                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;
                    _authentication.useRefreshTokens = loginData.useRefreshTokens;
                    _authentication.dealerID = response.data.dealerID;
                    _authentication.regionID = response.data.regionID;
                    deferred.resolve(response);
                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });

                return deferred.promise;

            };

            authServiceFactory.saveRegistration = _saveRegistration;
            authServiceFactory.login = _login;
            authServiceFactory.loginsso = _loginSso;
            authServiceFactory.logOut = _logOut;
            authServiceFactory.fillAuthData = _fillAuthData;

            authServiceFactory.fillAuthDataSso = _fillAuthDataSso;
            authServiceFactory.authentication = _authentication;
            authServiceFactory.refreshToken = _refreshToken;
            authServiceFactory.getfunctionIsHave = _functionIsHave;
            authServiceFactory.itsAllowFunction = _itsAllowFunction;


            authServiceFactory.obtainAccessToken = _obtainAccessToken;
            authServiceFactory.externalAuthData = _externalAuthData;
            authServiceFactory.registerExternal = _registerExternal;

            return authServiceFactory;
        }]);
})();