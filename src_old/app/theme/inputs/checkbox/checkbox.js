/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.inputs')
    .directive('incheckbox', incheckbox);

  /** @ngInject */
  function incheckbox() {
    return {
      templateUrl: 'app/theme/inputs/checkbox/checkbox.html',
      scope: {
        dataprovider: '=',
        disabled: "@",
        ngChangedata: "&"
      },
      link: function (scope, element, attrs, ngModelCtrl) {
        scope.selected = 0;
        scope.changeAnswer = function (param) {
          var stringAnswer = JSON.stringify(scope.dataprovider.answerCB);
          scope.selected = (stringAnswer.match(/true/g) || []).length;
          scope.ngChangedata();
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
