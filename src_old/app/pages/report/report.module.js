/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.report', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('report', {
            url: '/report',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: 'Report',
            sidebarMeta: {
              icon: 'ion-document-text',
              order: 1050,
            },
          }).state('report.downloadraw', {
            url: '/downloadraw',
            templateUrl: 'app/pages/report/downloadraw/downloadraw-report.html',
            title: 'Download Raw',
            controller: 'downloadrowctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 101,
            },
          })
          // .state('report.downloadrawolright', {
          //   url: '/downloadrawolright',
          //   templateUrl: 'app/pages/report/downloadrawolright/downloadraw-report.html',
          //   title: 'Download Raw OLRIGHT',
          //   controller: 'downloadrowolrightctrl',
          //   controllerAs: 'vm',
          //   sidebarMeta: {
          //     order: 102,
          //   },
          // })
          .state('report.downloadsummaryraw', {
            url: '/downloadsummaryraw',
            templateUrl: 'app/pages/report/downloadsummaryraw/downloadsummaryraw-report.html',
            title: 'Download Summary Raw Data',
            controller: 'downloadsummaryrawctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 109,
            },
          })
          .state('report.generate', {
            url: '/generate',
            templateUrl: 'app/pages/report/generate/generate-report.html',
            title: 'Generate Report',
            controller: 'generatereportctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 103,
            },
          }).state('report.upload', {
            url: '/upload',
            templateUrl: 'app/pages/report/upload/upload-report.html',
            title: 'Upload Report',
            controller: 'reportuploadctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 104,
            },
          }).state('report.download', {
            url: '/download',
            templateUrl: 'app/pages/report/download/download-report.html',
            title: 'Download Report',
            controller: 'downloadreportctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 106,
            },
          }).state('report.pica', {
            url: '/pica',
            templateUrl: 'app/pages/report/pica/pica-report.html',
            title: 'PICA',
            controller: 'reportpicactrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 105,
            },
          }).state('report.updownolright', {
            url: '/updownolright',
            templateUrl: 'app/pages/report/updownolright/updownolright.html',
            title: 'Upload Download OLRIGHT',
            controller: 'updownolrightctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              order: 105,
            },
          }).state('report.questionnairedetail', {
            url: '/questionnairedetail',
            templateUrl: 'app/pages/report/questionnairedetail/questionnairedetail.html',
            title: 'Detail Questionnaire',
            controller: 'questionnairedetailctrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 104,
            },
            params: {
              id: null,
            },
          }).state('report.generatepica', {
            url: '/generatepica',
            templateUrl: 'app/pages/report/pica/generatepica.html',
            title: 'Generate PICA',
            controller: 'generatepicactrl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 104,
            },
            params: {
              questionaire: null,
            },
          }).state('report.generatedreport', {
            url: '/generatedreport',
            templateUrl: 'app/pages/report/generate/generatedreport.html',
            title: 'Generated Report',
            controller: 'generatedreportcrtl',
            controllerAs: 'vm',
            sidebarMeta: {
              hidenavbar: true,
              order: 203,
            },
            params: {
              param: null,
            },
          });
      $urlRouterProvider.when('/report','/report/downloadraw');
    }
  
  })();
  