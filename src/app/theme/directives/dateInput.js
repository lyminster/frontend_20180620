/**
 * Change top "Daily Downloads", "Active Users" values with animation effect
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .directive('dateInput', dateInput);

    /** @ngInject */
    function dateInput($timeout) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: function (scope) {
                if (scope.ngModel) scope.ngModel = new Date(scope.ngModel);
            }
        }
    }
})();