/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.managequestionaire', ['ui.select', 'ngSanitize'])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('managequestionaire', {
            url: '/managequestionaire',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: 'Questionnaire',
            sidebarMeta: {
              icon: 'ion-ios-paper-outline',
              order: 1020,
            },
          }).state('managequestionaire.create', {
            url: '/create',
            controller: 'createquestionairectrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/managequestionaire/create/create-managequestionaire.html',
            title: 'Create DCSL',
            sidebarMeta: {
              order: 101,
            },
          }).state('managequestionaire.createolright', {
            url: '/createolright',
            controller: 'createquestionaireolrightctrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/managequestionaire/create-olright/create-managequestionaire.html',
            title: 'Create OLRIGHT',
            sidebarMeta: {
              order: 102,
            },
          }).state('managequestionaire.list', {
            url: '/list',
            templateUrl: 'app/pages/managequestionaire/list/list-managequestionaire.html',
            title: 'List',
            controller: 'managequestionairectrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 104,
            },
          }).state('managequestionaire.approval', {
            url: '/approval',
            templateUrl: 'app/pages/managequestionaire/approval/approval-managequestionaire.html',
            title: 'Approval',
            controller: 'manageapprovalquestionairectrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 105,
            },
          }).state('managequestionaire.detailapprove', {
            url: '/detailapprove',
            templateUrl: 'app/pages/managequestionaire/approval/approval-datail.html',
            title: 'Detail Approve',
            controller: 'approvaldetailquestionairectrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 106,
            },
            params: {
              id: null,
              typeolright: null
            },
          }).state('managequestionaire.edit', {
            url: '/edit',
            controller: 'editquestionairectrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/managequestionaire/create/create-managequestionaire.html',
            title: 'Edit',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              id: null,
              duplicate: null,
            },
          }).state('managequestionaire.editolright', {
            url: '/editolright',
            controller: 'editquestionaireolrightctrl',
            controllerAs: 'vm',
            templateUrl: 'app/pages/managequestionaire/create-olright/create-managequestionaire.html',
            title: 'Edit',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              id: null,
              duplicate: null,
            },
          });
      $urlRouterProvider.when('/managequestionaire','/managequestionaire/create');
    }
  
  })();
  