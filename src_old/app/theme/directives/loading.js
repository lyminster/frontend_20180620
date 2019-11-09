/**
 * Animated load block
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .directive('loading', loading);

  /** @ngInject */
  function loading($http)
  {
      return {
          restrict: 'A',
          template: '',
          link: function (scope, elm, attrs)
          {
              scope.isLoading = function () {
                  return $http.pendingRequests.length > 0;
              };
  
              scope.$watch(scope.isLoading, function (v)
              {
                  if(v){
                      elm.show();
                  }else{
                      elm.hide();
                  }
              });
          }
      };
  }
})();