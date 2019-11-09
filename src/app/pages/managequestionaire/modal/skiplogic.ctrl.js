/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('skiplogicCtrl', function ($scope, $uibModalInstance, content) {
            //var indx = content.listquestion.indexOf(content.question);
            //indx++;
            $scope.question = angular.copy(content.question);
            $scope.listquestion = angular.copy(content.listquestion);
            //$scope.listquestion.splice(0, indx);
            $scope.answerItems = [];
            $scope.skiplogic = {
                formtype: "Show"
            }
            $scope.listquestion = $scope.listquestion.filter(function (element) {
                return element.uuid != $scope.question.uuid;
            });
            $scope.skiplogic.questions = [];
            if ($scope.question.type == 'radiobutton') {
                $scope.question.answerRB.forEach(function (element) {
                    if (element.sort != 99) {
                        addAnswer(element);
                    }else if ($scope.question.useOther) {
                        addAnswer(element);
                    }
                });
            } else if ($scope.question.type == 'dropdown') {
                $scope.question.answerDD.forEach(function (element) {
                    if (element.sort != 99) {
                        addAnswer(element);
                    }else if ($scope.question.useOther) {
                        addAnswer(element);
                    }
                });
            } else if ($scope.question.type == 'checkbox') {
                $scope.question.answerCB.forEach(function (element) {
                    if (element.sort != 99) {
                        addAnswer(element);
                    }else if ($scope.question.useOther) {
                        addAnswer(element);
                    }
                });
            }
            function addAnswer(element) {
                var label_ = element.sort == 99 ? 'Other' : element.answerValue ;
                var option = { "value": element.uuid, "label": label_ }
                if (!cekuseAnswer(element.uuid)) {
                    $scope.answerItems.push(option);
                }
            }
            function cekuseAnswer(_uuid) {
                if ($scope.question.skiplogic) {
                    for (var i = 0; i < $scope.question.skiplogic.length; i++) {
                        var element = $scope.question.skiplogic[i];
                        if (element.answerSelected.value == _uuid) {
                            return true;
                        }
                    }
                }
                return false;
            }
            $scope.skiplogic.answerSelected = $scope.answerItems[0];
            $scope.ok = function () {
                var skiplogicValue = [];
                for (var i = 0; i < $scope.listquestion.length; i++) {
                    var element = $scope.listquestion[i];
                    if (element.checked) {
                        var skiplogicitem = {
                            "value": element.uuid,
                            "label": element.question,
                            "answers": []
                        }
                        if (element.answerCB) {
                            for (var j = 0; j < element.answerCB.length; j++) {
                                var subelement = element.answerCB[j];
                                if (subelement.checked) {
                                    var subskiplogicitem = {
                                        "value": subelement.uuid,
                                        "label": subelement.answerValue
                                    }
                                    skiplogicitem.answers.push(subskiplogicitem);
                                }
                            }
                        }
                        if (element.answerDD) {
                            for (var j = 0; j < element.answerDD.length; j++) {
                                var subelement = element.answerDD[j];
                                if (subelement.checked) {
                                    var subskiplogicitem = {
                                        "value": subelement.uuid,
                                        "label": subelement.answerValue
                                    }
                                    skiplogicitem.answers.push(subskiplogicitem);
                                }
                            }
                        }
                        if (element.answerRB) {
                            for (var j = 0; j < element.answerRB.length; j++) {
                                var subelement = element.answerRB[j];
                                if (subelement.checked) {
                                    var subskiplogicitem = {
                                        "value": subelement.uuid,
                                        "label": subelement.answerValue
                                    }
                                    skiplogicitem.answers.push(subskiplogicitem);
                                }
                            }
                        }
                        skiplogicValue.push(skiplogicitem);
                    }
                }
                if (skiplogicValue.length < 1) {
                    alert("Question not allow 0");
                    return;
                }
                $scope.skiplogic.questions = skiplogicValue;
                var returnModel = angular.copy($scope.skiplogic);
                $uibModalInstance.close(returnModel);
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            function convertQuestion(questionslist) {
                var question = [];
                for (var index = 0; index < questionslist.length; index++) {
                    var element = questionslist[index];

                }
            }
        });
})();