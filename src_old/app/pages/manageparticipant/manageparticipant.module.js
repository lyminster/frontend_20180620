/**
 * @author ich-one
 * created on 3.11.2017
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.manageparticipant', ['ui.select','ngSanitize'])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('manageparticipant', {
            url: '/manageparticipant',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'manageparticipantctrl',
            controllerAs: 'vm',
            title: 'Participant',
            sidebarMeta: {
              icon: 'ion-person-stalker',
              order: 1010,
            },
          }).state('manageparticipant.upload', {
            url: '/upload',
            templateUrl: 'app/pages/manageparticipant/upload/upload-participant.html',
            title: 'Upload Participant',
            sidebarMeta: {
              order: 101,
            },
          }).state('manageparticipant.list', {
            url: '/list',
            templateUrl: 'app/pages/manageparticipant/list/list-participant.html',
            title: 'List Participant',
            sidebarMeta: {
              order: 103,
            },
          }).state('manageparticipant.history', {
            url: '/history',
            templateUrl: 'app/pages/manageparticipant/history/history-participant.html',
            title: 'History Upload',
            sidebarMeta: {
              order: 102,
            },
          }).state('manageparticipant.detailparticipant', {
            url: '/detailparticipant',
            templateUrl: 'app/pages/manageparticipant/list/detail-participant.html',
            title: 'Detail Participant',
            controller: 'detailparticipantctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 104,
            },
            params: {
              participant: null,
            },
          });
      $urlRouterProvider.when('/manageparticipant','/manageparticipant/upload');
    }
  
  })();
  