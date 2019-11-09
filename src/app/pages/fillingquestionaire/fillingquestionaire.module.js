/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.fillingquestionaire', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('fillingquestionaire', {
        url: '/fillingquestionaire',
        template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Fill Questionaire',
        sidebarMeta: {
          icon: 'ion-paper-airplane',
          order: 1030,
        },
      }).state('fillingquestionaire.dcsl',
        {
          url: '/dcsl',
          templateUrl: 'app/pages/fillingquestionaire/dcsl/dcsl-fillingquestionaire.html',
          title: 'Filling DCSL',
          controller: 'fillingquestionairedcslctrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 101,
          },
        }).state('fillingquestionaire.olright', {
          url: '/olright',
          templateUrl: 'app/pages/fillingquestionaire/olright/olright-fillingquestionaire.html',
          title: 'Filling OLRight',
          controller: 'fillingquestionaireolrightctrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 102,
          },
        }).state('fillingquestionaire.selectparticipant', {
          url: '/selectparticipant',
          templateUrl: 'app/pages/fillingquestionaire/participant/selectparticipant.html',
          title: 'Choose Participant',
          controller: 'selectparticipantctrl',
          controllerAs: 'vm',
          sidebarMeta: {
            hidenavbar: true,
            order: 103,
          },
          params: {
            questionaire: null,
            type: null,
          },
        }).state('fillingquestionaire.createparticipant', {
          url: '/createparticipant',
          templateUrl: 'app/pages/fillingquestionaire/participant/createparticipant.html',
          title: 'Create Participant',
          controller: 'createparticipantctrl',
          controllerAs: 'vm',
          sidebarMeta: {
            hidenavbar: true,
            order: 104,
          },
          params: {
            questionaire: null,
            type: null
          },
        }).state('fillingquestionaire.filling', {
          url: '/filling',
          templateUrl: 'app/pages/fillingquestionaire/filling/fillingTemplate.html',
          title: 'Filling Questionnaire',
          controller: 'fillingTemplatectrl',
          controllerAs: 'vm',
          sidebarMeta: {
            hidenavbar: true,
            order: 105,
          },
          params: {
            questionaire: null,
            idparticipant: null,
            notpreview: null
          },
        }).state('fillingquestionaire.fillingolright', {
          url: '/fillingolright',
          templateUrl: 'app/pages/fillingquestionaire/fillingolright/fillingTemplate.html',
          title: 'Filling OLRIGHT Questionnaire',
          controller: 'fillingTemplateolrightctrl',
          controllerAs: 'vm',
          sidebarMeta: {
            hidenavbar: true,
            order: 105,
          },
          params: {
            questionaire: null,
            idparticipant: null,
            data: null
          },
        });
    $urlRouterProvider.when('/fillingquestionaire', '/fillingquestionaire/dcsl');
  }

})();
