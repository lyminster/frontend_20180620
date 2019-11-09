/**
 * @author ich-one
 * created on 6.11.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.monitoring')
        .factory('monitoringService', ['$http', 'ngAuthSettings', 'layoutPaths','baConfig', function ($http, ngAuthSettings, layoutPaths, baConfig) {
            var serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
            var monitoringServiceFactory = {};

            var layoutColors = baConfig.colors;
            monitoringServiceFactory.getmonitoring = function (param) {
                return $http.post(serviceBase + 'api/questionnaire/post/monitoring', param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.getOneMonitoring = function (param) {
                return $http.get(serviceBase + 'api/questionnaire/get/monitoringbyid?ID=' + param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.getParticipant = function (param) {
                return $http.get(serviceBase + 'api/questionnaire/get/monitoringparticipant?ID=' + param).then(function (results) {
                    return results;
                });
            };
            
            monitoringServiceFactory.getDealerMonitoring = function (param) {
                return $http.post(serviceBase + 'api/questionnaire/post/dealerbyregion?RegionCode=' + param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.getMonitoringDetailProgress = function (param, type) {
                return $http.get(serviceBase + 'api/questionnaire/get/monitoringdetail?ID=' + param + '&HeaderID=' + type).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.getMonitoringDetailolright = function (param) {
                return $http.post(serviceBase + 'api/olright/post/monitoringdetail?ID=' + param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.getmonitoringolright = function (param) {
                return $http.post(serviceBase + 'api/olright/post/monitoring', param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.getOneMonitoringolright = function (param) {
                return $http.post(serviceBase + 'api/olright/post/monitoringbyid?ID=' + param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.getOnechartdata = function (param) {
                return $http.post(serviceBase + 'api/olright/post/chartdata?ID=' + param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.getHystoryExtend = function (param) {
                return $http.get(serviceBase + 'api/questionnaire/get/monitoringextendhistory?ID=' + param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.saveExtendsPeriode = function (param) {
                return $http.put(serviceBase + 'api/questionnaire/put/extendperiod', param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.completesurvey = function (param) {
                return $http.post(serviceBase + 'api/questionnaire/post/completesurvey?ID=' + param).then(function (results) {
                    return results;
                });
            };
            monitoringServiceFactory.generateparticipant = function (questionnaireId, totalData) {
                return $http.post(serviceBase + 'api/questionnaire/post/generateparticipant?ID=' + questionnaireId + '&Count=' + totalData).then(function (results) {
                    return results;
                });
            };



            monitoringServiceFactory.chartbarhorisontal = function () {
                return {
                    dataForm: {
                        type: 'serial',
                        theme: 'blur',
                        color: layoutColors.defaultText,
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                title: 'Partisipan (Orang)',
                                gridAlpha: 0.5,
                                gridColor: layoutColors.border,
                            }
                        ],
                        startDuration: 2,
                        graphs: [
                            {
                                balloonText: '<b>[[category]]: [[value]]</b>',
                                fillColorsField: layoutColors.warning,
                                fillAlphas: 0.7,
                                lineAlpha: 0.2,
                                type: 'column',
                                valueField: 'value'
                            }
                        ],
                        chartCursor: {
                            categoryBalloonEnabled: false,
                            cursorAlpha: 0,
                            zoomable: false
                        },
                        categoryField: 'label',
                        categoryAxis: {
                            gridPosition: 'start',
                            labelRotation: 45,
                            gridAlpha: 0.5,
                            gridColor: layoutColors.border,
                        },
                        export: {
                            enabled: true
                        },
                        creditsPosition: 'top-right',
                        pathToImages: layoutPaths.images.amChart
                    }
                }
            };
            monitoringServiceFactory.chartbarvertical = function () {
                return {
                    dataForm: {
                        type: 'serial',
                        theme: 'blur',
                        color: layoutColors.defaultText,
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                title: 'Partisipan (Orang)',
                                gridAlpha: 0.5,
                                gridColor: layoutColors.border,
                            }
                        ],
                        startDuration: 2,
                        graphs: [
                            {
                                balloonText: '<b>[[category]]: [[value]]</b>',
                                fillColorsField: layoutColors.warning,
                                fillAlphas: 0.7,
                                lineAlpha: 0.2,
                                type: 'column',
                                valueField: 'value'
                            }
                        ],
                        "rotate": true,
                        categoryField: 'label',
                        categoryAxis: {
                            gridPosition: 'start',
                            labelRotation: 45,
                            gridAlpha: 0.5,
                            gridColor: layoutColors.border,
                        },
                        export: {
                            enabled: true
                        },
                        creditsPosition: 'top-right',
                        pathToImages: layoutPaths.images.amChart
                    }
                }
            };
            monitoringServiceFactory.chartlinehorisontal = function () {
                return {
                    dataForm: {
                        type: 'serial',
                        theme: 'blur',
                        color: layoutColors.defaultText,
                        marginTop: 0,
                        marginRight: 15,
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                gridAlpha: 0.5,
                                gridColor: layoutColors.border,
                            }
                        ],
                        graphs: [
                            {
                                id: 'g1',
                                balloonText: '<b>[[category]]: [[value]]</b>',
                                bullet: 'round',
                                bulletSize: 8,
                                lineColor: layoutColors.danger,
                                lineThickness: 1,
                                negativeLineColor: layoutColors.warning,
                                type: 'smoothedLine',
                                valueField: 'value'
                            }
                        ],
                        chartScrollbar: {
                            graph: 'g1',
                            gridAlpha: 0,
                            color: layoutColors.defaultText,
                            scrollbarHeight: 55,
                            backgroundAlpha: 0,
                            selectedBackgroundAlpha: 0.05,
                            selectedBackgroundColor: layoutColors.defaultText,
                            graphFillAlpha: 0,
                            autoGridCount: true,
                            selectedGraphFillAlpha: 0,
                            graphLineAlpha: 0.2,
                            selectedGraphLineColor: layoutColors.defaultText,
                            selectedGraphLineAlpha: 1
                        },
                        chartCursor: {
                            categoryBalloonDateFormat: 'YYYY',
                            cursorAlpha: 0,
                            valueLineEnabled: true,
                            valueLineBalloonEnabled: true,
                            valueLineAlpha: 0.5,
                            fullWidth: true
                        },
                        dataDateFormat: 'YYYY',
                        categoryField: 'label',
                        categoryAxis: {
                            "axisColor": layoutColors.defaultText,
                            "color": layoutColors.defaultText,
                            "labelRotation": 30,
                            "gridColor": layoutColors.defaultText,
                            "parseDates": false,
                            "dashLength": 1,
                            "minorGridEnabled": true
                        },
                        export: {
                            enabled: true
                        },
                        creditsPosition: 'bottom-right',
                        pathToImages: layoutPaths.images.amChart
                    }
                }
            };
            monitoringServiceFactory.chartlinevertical = function () {
                return {
                    dataForm: {
                        type: 'serial',
                        theme: 'blur',
                        color: layoutColors.defaultText,
                        marginTop: 0,
                        marginRight: 15,
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                gridAlpha: 0.5,
                                gridColor: layoutColors.border,
                            }
                        ],
                        graphs: [
                            {
                                id: 'g1',
                                balloonText: '<b>[[category]]: [[value]]</b>',
                                bullet: 'round',
                                bulletSize: 8,
                                lineColor: layoutColors.danger,
                                lineThickness: 1,
                                negativeLineColor: layoutColors.warning,
                                type: 'smoothedLine',
                                valueField: 'value'
                            }
                        ],
                        chartScrollbar: {
                            graph: 'g1',
                            gridAlpha: 0,
                            color: layoutColors.defaultText,
                            scrollbarHeight: 55,
                            backgroundAlpha: 0,
                            selectedBackgroundAlpha: 0.05,
                            selectedBackgroundColor: layoutColors.defaultText,
                            graphFillAlpha: 0,
                            autoGridCount: true,
                            selectedGraphFillAlpha: 0,
                            graphLineAlpha: 0.2,
                            selectedGraphLineColor: layoutColors.defaultText,
                            selectedGraphLineAlpha: 1
                        },
                        chartCursor: {
                            categoryBalloonDateFormat: 'YYYY',
                            cursorAlpha: 0,
                            valueLineEnabled: true,
                            valueLineBalloonEnabled: true,
                            valueLineAlpha: 0.5,
                            fullWidth: true
                        },
                        "rotate": true,
                        dataDateFormat: 'YYYY',
                        categoryField: 'label',
                        categoryAxis: {
                            "axisColor": layoutColors.defaultText,
                            "color": layoutColors.defaultText,
                            "labelRotation": 30,
                            "gridColor": layoutColors.defaultText,
                            "parseDates": false,
                            "dashLength": 1,
                            "minorGridEnabled": true
                        },
                        export: {
                            enabled: true
                        },
                        creditsPosition: 'bottom-right',
                        pathToImages: layoutPaths.images.amChart
                    }
                }
            };
            monitoringServiceFactory.chartpie = function () {
                return {
                    dataForm: {
                        type: 'pie',
                        startDuration: 2,
                        theme: 'blur',
                        addClassNames: true,
                        color: layoutColors.defaultText,
                        labelTickColor: layoutColors.borderDark,
                        innerRadius: '40%',
                        depth3D: 15,
                        angle: 30,
                        outlineAlpha: 0.4,
                        defs: {
                            filter: [
                                {
                                    id: 'shadow',
                                    width: '200%',
                                    height: '200%',
                                    feOffset: {
                                        result: 'offOut',
                                        in: 'SourceAlpha',
                                        dx: 0,
                                        dy: 0
                                    },
                                    feGaussianBlur: {
                                        result: 'blurOut',
                                        in: 'offOut',
                                        stdDeviation: 5
                                    },
                                    feBlend: {
                                        in: 'SourceGraphic',
                                        in2: 'blurOut',
                                        mode: 'normal'
                                    }
                                }
                            ]
                        },
                        valueField: 'value',
                        titleField: 'label',
                        export: {
                            enabled: true
                        },
                        creditsPosition: 'bottom-left',
                        autoMargins: false,
                        marginTop: 10,
                        alpha: 0.8,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        pullOutRadius: 0,
                        pathToImages: layoutPaths.images.amChart
                    }
                }
            };
            monitoringServiceFactory.chartspider = function () {
                return {
                    dataForm: {
                        type: 'radar',
                        startDuration: 2,
                        theme: 'blur',
                        color: layoutColors.defaultText,
                        labelTickColor: layoutColors.borderDark,
                        valueAxes: [
                            {
                                axisAlpha: 0,
                                position: 'left',
                                gridAlpha: 0.5,
                                gridColor: layoutColors.border,
                            }
                        ],
                        graphs: [
                            {
                                balloonText: '<b>[[category]]: [[value]]</b>',
                                bullet: 'round',
                                bulletSize: 8,
                                lineColor: layoutColors.danger,
                                lineThickness: 3,
                                negativeLineColor: layoutColors.warning,
                                type: 'smoothedLine',
                                valueField: 'value'
                            }
                        ],
                        categoryField: 'label',
                        export: {
                            enabled: true
                        }
                    }
                }
            };
            return monitoringServiceFactory;
        }]);
})();