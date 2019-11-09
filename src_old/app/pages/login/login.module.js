/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.login', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      // $stateProvider
      //     .state('fillingquestionaire', {
      //       url: '/fillingquestionaire',
      //       template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
      //       abstract: true,
      //       controller: 'fillingquestionairectrl',
      //       title: 'Fill Questionaire',
      //       sidebarMeta: {
      //         icon: 'ion-paper-airplane',
      //         order: 1030,
      //       },
      //     }).state('fillingquestionaire.dcsl', {
      //       url: '/dcsl',
      //       templateUrl: 'app/pages/fillingquestionaire/dcsl/dcsl-fillingquestionaire.html',
      //       title: 'DCSL',
      //       sidebarMeta: {
      //         order: 101,
      //       },
      //     }).state('fillingquestionaire.olright', {
      //       url: '/olright',
      //       templateUrl: 'app/pages/fillingquestionaire/olright/olright-fillingquestionaire.html',
      //       title: 'OLRight',
      //       sidebarMeta: {
      //         order: 102,
      //       },
      //     });
      // $urlRouterProvider.when('/fillingquestionaire','/fillingquestionaire/dcsl');
    }
  
  })();
  