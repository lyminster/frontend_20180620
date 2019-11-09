/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.inputs')
      .directive('inlinierscale', inlinierscale);

  /** @ngInject */
  function inlinierscale() {
    return {
      templateUrl: 'app/theme/inputs/linierscale/linierscale.html',
      scope: {
        dataprovider: '=',
        disabled: "@"
      },
      link: function (scope, element, attrs, ngModelCtrl) {
        scope.validatecheck = function (required) {
          if (required == null) {
            return false;
          } else {
            return required;
          }
        }
      }
    };
  }

})();
