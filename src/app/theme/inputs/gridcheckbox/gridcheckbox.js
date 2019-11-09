/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.inputs')
      .directive('ingridcheckbox', ingridcheckbox);

  /** @ngInject */
  function ingridcheckbox() {
    return {
      templateUrl: 'app/theme/inputs/gridcheckbox/gridcheckbox.html',
      scope: {
        dataprovider: '=',
        disabled: "@"
      },
      link: function (scope, element, attrs, ngModelCtrl) {
        scope.selected = 0;
        scope.changeAnswer = function (param) {
          var stringAnswer = JSON.stringify(param);
          scope.selected = (stringAnswer.match(/true/g) || []).length;
        }
        scope.validatecheck = function (required) {
          if (required == null) {
            return false;
          } else {
            if (required) {
              return scope.selected == 0;
            } else {
              return required;
            }
          }
        }
      }
    };
  }

})();
