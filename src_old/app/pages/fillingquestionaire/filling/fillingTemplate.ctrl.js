/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.fillingquestionaire')
        .controller('fillingTemplatectrl', fillingTemplatectrl);

    /** @ngInject */
    function fillingTemplatectrl($state, fillingquestionaireService, $stateParams, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService) {
        var vm = this;
        if ($stateParams.questionaire === null) {
            $state.go('fillingquestionaire.dcsl');
            return;
        }
        //vm.modelSurvey = 'fieldSurvey';
        vm.idparticipant = $stateParams.idparticipant;
        vm.questionaire = $stateParams.questionaire;
        vm.dataMentah = {};
        vm.modelSurvey = "fieldSurvey";
        fillingquestionaireService.getScreening(vm.questionaire.questionnaireId, vm.idparticipant).then(function (result) {
            vm.dataMentah = result.data.screeningQuestionList;
            if (vm.dataMentah.length <= 0) {
                toastr.success('Survey has been Completed. \r thank\'s for your Participation', 'Success');
                $state.go('fillingquestionaire.selectparticipant', { questionaire: vm.questionaire, type: 'DCSL' });
                return;
            }
            for (var index = 0; index < vm.dataMentah.length; index++) {
                vm.dataMentah[index].fill = true;
            }
            vm.initialPrefilling();
        });
        vm.submitPreFilling = function () {
            var aa = vm.dataMentah.filter(function (el) {
                return el.fill == true;
            });
            if (aa.length <= 0) {
                toastr.warning('Can\'t Allow Empty', 'Warning');
                return;
            }
            vm.tempFillingScreening = vm.dataMentah.filter(function (el) {
                return el.fill == true;
            });
            for (var index = 0; index < vm.tempFillingScreening.length; index++) {
                vm.tempFillingScreening[index].fill = true;
            }
            vm.dataMentah = null;
            vm.initialScreening();
        }
        vm.changeCheck = function (item) {
            if (vm.selectedQuestionnaire.indexOf(item) !== -1) {
                vm.selectedQuestionnaire.splice(vm.selectedQuestionnaire.indexOf(item), 1);
            } else {
                vm.selectedQuestionnaire.push(item);
            }
        }
        vm.getMainQuestion = function () {
            var param = {
                "questionnaireID": parseInt(vm.questionaire.questionnaireId),
                "participantID": vm.idparticipant,
                "screeningQuestionList": vm.tempFillingScreening
            }
            fillingquestionaireService.getMainQuestion(param).then(function (result) {
                if (result.statusText == "OK") {
                    vm.prosessave = false;
                    toastr.success(result.data.message, 'Success');
                    if (result.data.length <= 0) {
                        toastr.success('thank\'s for your Participation', 'Success');
                        $state.go('fillingquestionaire.selectparticipant', { questionaire: vm.questionaire, type: 'DCSL' });
                        return;
                    }
                    if (result.data[0].questions.length <= 0) {
                        toastr.success('thank\'s for your Participation', 'Success');
                        $state.go('fillingquestionaire.selectparticipant', { questionaire: vm.questionaire, type: 'DCSL' });
                        return;
                    }
                    vm.tempFillingMain = result.data;
                    vm.intialMain();
                } else {
                    vm.prosessave = false;
                    toastr.error(result.data.message, 'Error');
                }

            })
        }
        vm.finishAll = function () {
            var param = {
                "questionnaireId": vm.questionaire.questionnaireId,
                "idparticipant": vm.idparticipant,
                "modelSurvey": vm.modelSurvey,
                "progresGroup": "",
                "status": "1", //0 :On Progress, //1:Finish
                "ScreeningAnswer": vm.tempFillingMain
            }
            fillingquestionaireService.savefilling(param).then(function (result) {
                if (result.statusText == "OK") {
                    toastr.success(result.data.message, 'Success');
                    toastr.success('Answer Screening Saved, thank\'s for your Participation', 'Success');
                    $state.go('fillingquestionaire.selectparticipant', { questionaire: vm.questionaire, type: 'DCSL' });
                } else {
                    vm.prosessave = false;
                    toastr.error(result.data.message, 'Error');
                }
            });
        }
        vm.initialPrefilling = function () {
            vm.title = 'Select Screening';
        }
        vm.idparticipant = $stateParams.idparticipant;
        vm.initialScreening = function () {
            vm.title = 'Screening Question';
            vm.counterHeader = 0;
            vm.counterQScreening = 0;
            vm.counterGMain = 0;
            vm.questionsScreening = vm.tempFillingScreening[vm.counterHeader];
            vm.questionScreen = vm.questionsScreening.questions[vm.counterQScreening];
            vm.title = vm.questionsScreening.headerName + ' - ' + vm.title;
        };
        vm.intialMain = function () {
            vm.questionsScreening = null;
            vm.questionScreen = null;
            vm.counterHeader = 0;
            vm.counterQScreening = 0;
            vm.counterGMain = 0;
            vm.counterQMain = 0;
            vm.questionsMain = vm.tempFillingMain[vm.counterHeader];
            vm.questionsGMain = vm.questionsMain.questions[vm.counterGMain];
            vm.title = vm.questionsMain.headerName + ' - ' + vm.questionsGMain.groupname + ' - ' + 'Main Question';
        };
        vm.submitScreening = function (question) {
            if (vm.counterQScreening < vm.questionsScreening.questions.length - 1 && question.answerValue.jumpTo === "Next") {
                vm.counterQScreening++;
                vm.questionScreen = vm.questionsScreening.questions[vm.counterQScreening];
                toastr.success('Answer Submitted', 'Success');
            } else {
                vm.counterQScreening = 0;
                vm.title = 'Screening Question';
                if (vm.counterHeader < vm.tempFillingScreening.length - 1) {
                    vm.counterHeader++;
                    vm.questionsScreening = vm.tempFillingScreening[vm.counterHeader];
                    vm.questionScreen = vm.questionsScreening.questions[vm.counterQScreening];
                    vm.title = vm.questionsScreening.headerName + ' - ' + vm.title;
                    toastr.success('Answer Submitted', 'Success');
                } else {
                    vm.getMainQuestion();
                }
            }
        };
        vm.submitMain = function (question) {
            vm.title = 'Main Question';
            if (vm.counterGMain < vm.questionsMain.questions.length - 1) {
                vm.counterGMain++;
                vm.questionsGMain = vm.questionsMain.questions[vm.counterGMain];
                vm.title = vm.questionsMain.headerName + ' - ' + vm.questionsGMain.groupname + ' - ' + vm.title;
                toastr.success('Answer Submitted', 'Success');
            } else {
                vm.counterGMain = 0;
                if (vm.counterHeader < vm.tempFillingMain.length - 1) {
                    vm.counterHeader++;
                    vm.questionsMain = vm.tempFillingMain[vm.counterHeader];
                    vm.questionsGMain = vm.questionsMain.questions[vm.counterGMain];
                    vm.title = vm.questionsMain.headerName + ' - ' + vm.questionsGMain.groupname + ' - ' + vm.title;
                    toastr.success('Answer Submitted', 'Success');
                } else {
                    vm.finishAll();
                }
            }
        };
    }
})();
