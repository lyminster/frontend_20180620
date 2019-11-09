/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.inputs')
      .directive('indate', indate);

  /** @ngInject */
  function indate() {
    return {
      templateUrl: 'app/theme/inputs/date/date.html',
      scope: {
        dataprovider: '=',
        disabled: "@"
      }
    };
  }

})();
