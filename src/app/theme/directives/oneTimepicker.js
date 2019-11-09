(function () {
    'use strict';
  
    angular.module('BlurAdmin.theme')
        .directive('myTimepicker', myTimepicker);
  
    /** @ngInject */
    function myTimepicker() {
        return {
	        restrict: 'E',
	        templateUrl: [
                '<div class="timePicker">',
                '<label ng-click="toggleTimePicker()">',
                '<input type="text" ng-model="timeLabel" ng-bind="timeValue" disabled>',
                '</label>',
                '<div class="cal-wraper shadow"  ng-show="selecting">',
                '<table>',
                '<tr class="navigation">',
                '<tr class="time">',
                '<td class="mer"><div ng-click="selectMeridian(meridian)" ng-repeat="meridian in meridians" ng-bind="meridian"></div></td>',
                '<td class="hours"><div ng-click="selectHour(hour)" ng-repeat="hour in hours" ng-bind="hour.label"></div></td>',
                '<td class="minutes"><div ng-click="selectMinute(minute)" ng-repeat="minute in minutes" ng-bind="minute"></div></td>',
                '</tr>',
                '</table>',
                '</div>',
                '</div>'
            ].join('\n'),
	        transclude: true,
	        controller: function ($scope) {

	            var timeObj = { AM: [], PM: [] };
	            for (var i = 0; i <= 11; i++) {
	                timeObj.AM.push({ label: (i < 10 ? '0' + i : i), value: i });
	            }
	            timeObj.PM.push({ label: 12, value: 12 });
	            for (var i = 1; i <= 11; i++) {
	                timeObj.PM.push({ label: (i < 10 ? '0' + i : i), value: i + 12 });
	            }

	            $scope.meridians = ["AM", "PM"];
	            $scope.hours = timeObj.AM;
	            $scope.minutes = ["00", "15", "30", "45"];

	            if ($scope.timeValue == undefined) {
	                $scope.timeValue = 9 * 60 * 60 * 1000;
	            }

	            $scope.toggleTimePicker = function () {
	                $scope.selecting = !$scope.selecting;
	            };

	            $scope.$watch('timeValue', function (val) {
	                $scope.updateLabel(val);
	            });

	            $scope.selectMeridian = function (meridian) {
	                $scope.hours = timeObj[meridian];
	                $scope.timeValue = (meridian == "AM" ? (9 * 60 * 60 * 1000) : (15 * 60 * 60 * 1000));
	            };

	            $scope.selectHour = function (hour) {
	                $scope.timeValue = (hour.value * 60 * 60 * 1000);
	            };

	            $scope.selectMinute = function (minute) {
	                var time = $scope.timeValue;
	                var mts = time % (60 * 60 * 1000);
	                $scope.timeValue = (time - mts + minute * 60 * 1000);
	            };

	            $scope.updateLabel = function (timeValue) {
	                var mts = timeValue % (60 * 60 * 1000);
	                var hrs = (timeValue - mts) / (60 * 60 * 1000);
	                var mts2 = mts / (60 * 1000);
	                var mer = (hrs < 11) ? "AM" : "PM";
	                var hrs2 = (hrs > 12) ? hrs - 12 : hrs;

	                $scope.timeLabel = (hrs2 < 10 ? '0' + hrs2 : hrs2) + ":" + (mts2 == 0 ? '00' : mts2) + " " + mer;
	            };
	        }
	    }
    }

    angular.module('BlurAdmin.theme')
    .directive('myDatepickerInput', myDatepickerInput);

    function myDatepickerInput() {
        return {
            require: 'ngModel',
            scope: {           
                ngModel: '=',
                minDate: '=?',
                maxDate: '=?',
                refreshDate: '&',
                dateFormat: '=?',
                yearRange: '=?'
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$formatters.push(function (modelValue) {
                    //return $filter('date')(modelValue, "dd-MM-yy");
                    return $filter('dateFormat')(modelValue);
                });            
                
                if (!scope.dateFormat) {
                    scope.dateFormat = 'dd/mm/yy';
                }      
                
                var startDate = new Date();
                startDate.setYear(1980);           
    
                if (scope.minDate !== undefined && scope.minDate instanceof Date) {
                    startDate = scope.minDate;                
                }
    
                var endDate = new Date();
                endDate.setYear(startDate.getFullYear() + 100);
    
                if (scope.maxDate !== undefined && scope.maxDate instanceof Date) {
                    endDate = scope.maxDate;                
                }
    
                if (!scope.yearRange) {
                    scope.yearRange = startDate.getFullYear() + ':' + endDate.getFullYear();
                }
    
                var dateFunction = function () {
                    $(function () {
                        element.datepicker({
                            numberOfMonths: 2,
                            //showOn: "both", jika mau ada tombol juga
                            changeYear: true,
                            changeMonth: true,
                            dateFormat: scope.dateFormat,
                            minDate: startDate,
                            maxDate: endDate,
                            yearRange: scope.yearRange,
                            beforeShow: function (e, t) {
                                //var id = $(this).attr('id');
                                //t.dpDiv.addClass("hide-calendar");
                                //t.dpDiv.addClass("MonthDatePicker");
                                //t.dpDiv.addClass("HideTodayButton");
                                $("#ui-datepicker-div").removeClass("hide-calendar");
                                //$("#ui-datepicker-div").addClass('MonthDatePicker');
                                $("#ui-datepicker-div").removeClass('HideTodayButton');
                            },
                            //showButtonPanel: true,
                            onSelect: function (dateText, inst) {
                                var parsedDate = $.datepicker.parseDate(scope.dateFormat, dateText);
                                ngModelCtrl.$setViewValue(parsedDate);
                                //if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                                //    scope.$apply();
                                //}
                                scope.$applyAsync();
                            }
                        });
                    });
                };
                scope.refreshDate = function () {
                    dateFunction();
                };
    
                scope.refreshDate();            
            }
        }
    }

    angular.module('BlurAdmin.theme')
    .directive('myDatepicker', myDatepicker);
    
    function myDatepicker() {
        return {
            require: 'ngModel',
            scope: {           
                ngModel: '=',
                minDate: '=?',
                maxDate: '=?',
                refreshDate: '&',
                dateFormat: '=?',
                yearRange: '=?'
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$formatters.push(function (modelValue) {
                    //return $filter('date')(modelValue, "dd-MM-yy");
                    return $filter('dateFormat')(modelValue);
                });            
                
                if (!scope.dateFormat) {
                    scope.dateFormat = 'dd/mm/yy';
                }      
                
                var startDate = new Date();
                startDate.setYear(1980);           
    
                if (scope.minDate !== undefined && scope.minDate instanceof Date) {
                    startDate = scope.minDate;                
                }
    
                var endDate = new Date();
                endDate.setYear(startDate.getFullYear() + 100);
    
                if (scope.maxDate !== undefined && scope.maxDate instanceof Date) {
                    endDate = scope.maxDate;                
                }
    
                if (!scope.yearRange) {
                    scope.yearRange = startDate.getFullYear() + ':' + endDate.getFullYear();
                }
    
                var dateFunction = function () {
                    $(function () {
                        element.datepicker({
                            numberOfMonths: 2,
                            //showOn: "both", jika mau ada tombol juga
                            changeYear: true,
                            changeMonth: true,
                            dateFormat: scope.dateFormat,
                            minDate: startDate,
                            maxDate: endDate,
                            yearRange: scope.yearRange,
                            beforeShow: function (e, t) {
                                //var id = $(this).attr('id');
                                //t.dpDiv.addClass("hide-calendar");
                                //t.dpDiv.addClass("MonthDatePicker");
                                //t.dpDiv.addClass("HideTodayButton");
                                $("#ui-datepicker-div").removeClass("hide-calendar");
                                //$("#ui-datepicker-div").addClass('MonthDatePicker');
                                $("#ui-datepicker-div").removeClass('HideTodayButton');
                            },
                            //showButtonPanel: true,
                            onSelect: function (dateText, inst) {
                                var parsedDate = $.datepicker.parseDate(scope.dateFormat, dateText);
                                ngModelCtrl.$setViewValue(parsedDate);
                                //if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                                //    scope.$apply();
                                //}
                                scope.$applyAsync();
                            }
                        });
                    });
                };
                scope.refreshDate = function () {
                    dateFunction();
                };
    
                scope.refreshDate();            
            }
        }
    }
  
  })();