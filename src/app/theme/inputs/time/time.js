/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.inputs')
      .directive('intime', intime);

  /** @ngInject */
  function intime() {
    return {
      templateUrl: 'app/theme/inputs/time/time.html',
      scope: {
        dataprovider: '=',
        disabled: "@"
      }
    };
  }

})();
