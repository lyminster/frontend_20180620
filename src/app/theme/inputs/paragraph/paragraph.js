/**
 * @author v.lugovsky
 * created on 10.12.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.inputs')
      .directive('inparagraph', inparagraph);

  /** @ngInject */
  function inparagraph() {
    return {
      templateUrl: 'app/theme/inputs/paragraph/paragraph.html',
      scope: {
        dataprovider: '=',
        disabled: "@"
      }
    };
  }

})();
