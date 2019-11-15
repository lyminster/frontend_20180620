/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('loginctrl', loginctrl);
    /** @ngInject */
    function loginctrl($scope, $location, authService, ngAuthSettings, toastr) {
        $scope.loginData = {
            userName: null,
            password: null,
            useRefreshTokens: true
        };
        $scope.message = "";
        $scope.login = function () {
            console.log("log");
            authService.login($scope.loginData).then(function (response) {
                $location.path('/dashboard');
            },
                function (err) {
                    if (err.data) {
                        toastr.error(err.data.error_description, 'Error');
                    }
                    console.log(err);
                });
        };
        $scope.authExternalProvider = function (provider) {
            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';
            var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                + "&response_type=token&client_id=" + ngAuthSettings.clientId
                + "&redirect_uri=" + redirectUri;
            window.$windowScope = $scope;
            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        };
        $scope.authCompletedCB = function (fragment) {
            $scope.$apply(function () {
                if (fragment.haslocalaccount == 'False') {
                    authService.logOut();
                    authService.externalAuthData = {
                        provider: fragment.provider,
                        userName: fragment.external_user_name,
                        externalAccessToken: fragment.external_access_token
                    };
                    $location.path('/associate');
                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    authService.obtainAccessToken(externalData).then(function (response) {

                        $location.path('/orders');
                    },
                        function (err) {
                            $scope.message = err.error_description;
                        });
                }
            });
        }
    }
    angular.module('BlurAdmin.pages.login').controller('indexController', ['$scope', '$location', 'authService', '$uibModal', function ($scope, $location, authService, $uibModal) {
        $scope.logOut = function () {
            authService.logOut();
            $location.path('/dashboard');
        }
        $scope.openModalChangePassword = function () {
            var status = '';
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/login/modal/changepassword.html',
                size: 'lg',
                controller: 'changepasswordController',
                resolve: {
                    content: function () {
                        return { 'data': '' };
                    }
                }
            });
            modalInstance.result.then(function () {
            }, function () {
            });
        };
        var absUrl = $location.path();
        if(absUrl.indexOf('openlink') > -1){
            authService.authentication.isOpen = true;
            
        }
        $scope.authentication = authService.authentication;
    }]);
    angular.module('BlurAdmin.pages.login').controller('changepasswordController', ['$scope', '$uibModalInstance', 'content', 'managequestionaireService', 'toastr', function ($scope, $uibModalInstance, content, managequestionaireService, toastr) {
        $scope.formData = {};

        $scope.ok = function () {
            managequestionaireService.changePassword($scope.formData).then(function (result) {
                if (result.data.result == "OK") {
                    toastr.success(result.data.message, 'Success');
                    $uibModalInstance.close();
                } else {
                    vm.prosessave = false;
                    toastr.error(result.data.message, 'Error');
                }
            });
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})();
