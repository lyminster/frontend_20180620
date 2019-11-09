'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'xdLocalStorage',
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.rowEdit',
  'ui.grid.pagination',
  'ui.grid.selection',
  'ui.grid.cellNav',
  'ui.grid.resizeColumns',
  'ui.grid.treeView',
  'ui.grid.grouping',
  '720kb.datepicker',
  'LocalStorageModule',
  'jkAngularRatingStars',
  'LocalForageModule',
  'snapscroll'
]);

var serviceBase = window.__env.serviceBase;
var serviceAPIBase = window.__env.serviceAPIBase;
var urlLoginSso = window.__env.serviceSsoBase;
var useSso = window.__env.useSso;

// var storage = new CrossStorageClient('https://devproxy.astra.co.id/hsohome/#/apps', {
//   timeout: 5000,
//   frameId: 'storageFrame'
// });

// storage.onConnect().then(function () {
//   return storage.get('ui.TokenSet');
// }).then(function (res) {
//   var newToken = JSON.parse(res);
//   session.accessToken = angular.copy(newToken.TokenSet.access_token);
//   session.refreshToken = angular.copy(newToken.TokenSet.refresh_token);
//   authService
//     .login()
//     .then(function (response) {
//       $scope.setCurrentUser(response.data.userInfo);
//       $rootScope.$broadcast(EVENTS.AUTH.loginSuccess);
//     });
// })

angular.module('BlurAdmin.theme').constant('ngAuthSettings', {
  apiServiceBaseUri: serviceBase,
  apiServiceAPIBaseUri: serviceAPIBase,
  urlLoginSso: urlLoginSso,
  useSso: useSso,
  clientId: 'ngAuthApp'
});

angular.module('BlurAdmin.theme').config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
});
angular.module('BlurAdmin.theme').run(['authService', function (authService) {
  if (useSso) {
    authService.fillAuthDataSso();
  } else {
    authService.fillAuthData();
  }
}]);
