/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.inputs')
    .directive('inradiobutton', inradiobutton);

  /** @ngInject */
  function inradiobutton() {
    return {
      templateUrl: 'app/theme/inputs/radiobutton/radiobutton.html',
      scope: {
        dataprovider: '=',
        disabled: "@",
        ngChangedata: "&"
      },
      link: function (scope, element, attrs, ngModelCtrl) {
        scope.updateModel = function () {
          scope.ngChangedata();
        }
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
