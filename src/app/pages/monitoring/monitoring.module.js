/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.monitoring', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('monitoring', {
            url: '/monitoring',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: 'Monitoring',
            sidebarMeta: {
              icon: 'ion-arrow-graph-up-right',
              order: 1040,
            },
          }).state('monitoring.dcsl', {
            url: '/dcsl',
            templateUrl: 'app/pages/monitoring/dcsl/dcsl-monitoring.html',
            title: 'DCSL Progress',
            controller: 'monitoringdcslctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 101,
            },
          }).state('monitoring.olright', {
            url: '/olright',
            templateUrl: 'app/pages/monitoring/olright/olright-monitoring.html',
            title: 'OLRight Progress',
            controller: 'monitoringolrightctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 102,
            },
          }).state('monitoring.detail', {
            url: '/detail',
            templateUrl: 'app/pages/monitoring/dcsl/dcsl-detail.html',
            title: 'DCSL Detail',
            controller: 'dcsldetailctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              questionaire: null
            },
          }).state('monitoring.extendperiode', {
            url: '/extendperiode',
            templateUrl: 'app/pages/monitoring/dcsl/dcsl-extendperiode.html',
            title: 'Extend Periode',
            controller: 'dcslextendperiodectrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              questionaire: null
            },
          }).state('monitoring.olrightdetail', {
            url: '/olrightdetail',
            templateUrl: 'app/pages/monitoring/olright/olright-detail.html',
            title: 'OLRIGHT Detail',
            controller: 'olrightdetailctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              questionaire: null
            },
          }).state('monitoring.olrightextendperiode', {
            url: '/olrightextendperiode',
            templateUrl: 'app/pages/monitoring/olright/olright-extendperiode.html',
            title: 'Extend Periode',
            controller: 'olrightextendperiodectrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              questionaire: null
            },
          }).state('monitoring.olrightdetailgraph', {
            url: '/olrightdetailgraph',
            templateUrl: 'app/pages/monitoring/olright/olright-detailgraph.html',
            title: 'Detail Graph',
            controller: 'olrightdetailgraphctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 103,
            },
            params: {
              questionaire: null
            },
          });
      $urlRouterProvider.when('/monitoring','/monitoring/dcsl');
    }
  
  })();
  