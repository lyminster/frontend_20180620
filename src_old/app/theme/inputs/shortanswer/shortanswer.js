/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.inputs')
      .directive('inshortanswer', inshortanswer);

  /** @ngInject */
  function inshortanswer() {
    return {
      templateUrl: 'app/theme/inputs/shortanswer/shortanswer.html',
      scope: {
        dataprovider: '=',
        disabled: "@"
      }
    };
  }
})();
