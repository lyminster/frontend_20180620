/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.privilege', ['ui.select', 'ngSanitize'])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('privilege', {
            url: '/privilege',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: 'Privilege',
            sidebarMeta: {
              icon: 'ion-ios-paper-outline',
              order: 1060,
            },
          }).state('privilege.user', {
            url: '/user',
            controller: 'listuserctrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/privilege/user/listuser.html',
            title: 'User',
            sidebarMeta: {
              order: 101,
            },
          }).state('privilege.groupuser', {
            url: '/groupuser',
            controller: 'listgroupuserctrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/privilege/groupuser/listgroupuser.html',
            title: 'Group User',
            sidebarMeta: {
              order: 102,
            },
          })
          .state('privilege.updateuser', {
            url: '/updateuser',
            controller: 'userupdatectrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/privilege/user/userupdate.html',
            title: 'Update User',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              user: null
            },
          })
          .state('privilege.insertuser', {
            url: '/insertuser',
            controller: 'userinsertctrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/privilege/user/userinsert.html',
            title: 'Insert User',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              user: null
            },
          }).state('privilege.updategroupuser', {
            url: '/updategroupuser',
            controller: 'updategroupuserctrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/privilege/groupuser/updategroupuser.html',
            title: 'Update Group User',
            sidebarMeta: {
              hidenavbar: true,
              order: 104,
            },
            params: {
              data: null
            },
          });
      $urlRouterProvider.when('/privilege','/privilege/create');
    }
  })();
  