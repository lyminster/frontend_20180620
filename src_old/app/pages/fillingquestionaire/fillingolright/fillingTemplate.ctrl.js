/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.fillingquestionaire')
        .controller('fillingTemplateolrightctrl', fillingTemplateolrightctrl);

    /** @ngInject */
    function fillingTemplateolrightctrl($state, fillingquestionaireService, $stateParams, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService) {
        var vm = this;
        vm.isPassScreening = false;
        if ($stateParams.questionaire === null) {
            $state.go('fillingquestionaire.olright');
            return;
        }
        if ($stateParams.data.questionList == null) {
            toastr.success('thank\'s for your Participation', 'Success');
            $state.go('fillingquestionaire.olright');
            return;
        }
        if ($stateParams.data.questionList.length <= 0) {
            toastr.success('thank\'s for your Participation', 'Success');
            $state.go('fillingquestionaire.olright');
            return;
        }
        vm.backgroundfilling = "../assets/img/background-filling.jpeg";
        vm.welcomemessage = "Your Question Is Ready..";
        vm.idparticipant = $stateParams.idparticipant;
        vm.questionaire = $stateParams.questionaire;
        if ($stateParams.data.linkbackground != null) {
            vm.backgroundfilling = $stateParams.data.linkbackground;
        }
        if ($stateParams.data.welcomemessage != null) {
            vm.welcomemessage = $stateParams.data.welcomemessage;
        }
        vm.questionList = $stateParams.data.questionList;
        vm.modelSurvey = "selfSurvey";
        vm.idparticipant = $stateParams.idparticipant;
        vm.initialScreening = function () {
            vm.title = 'Screening Question';
            vm.counterHeader = 0;
            vm.counterQScreening = 0;
            vm.counterGMain = 0;
            vm.questionsScreening = vm.questionList[0];
            vm.questionScreen = vm.questionsScreening.questions[vm.counterQScreening];
            vm.title = vm.title;
        };
        vm.intialMain = function () {
            vm.isPassScreening = true;
            vm.questionList[0] = vm.questionsScreening;
            vm.questionsScreening = null;
            vm.questionScreen = null;
            vm.counterHeader = 0;
            vm.counterQScreening = 0;
            vm.counterGMain = 0;
            vm.counterQMain = 0;
            vm.questionsMain = vm.questionList[1].questionGroup;
            vm.intialFirst(vm.questionsMain);
            vm.title = 'Main Question';
        };
        vm.submitScreening = function (question) {
            if (question.type == 'checkbox') {
                var mostValue = '';
                question.answerCB.forEach(function (element) {
                    if (element.value && mostValue != 'Next') {
                        if (element.jumpTo.value == 'Next') {
                            mostValue = 'Next';
                        } else if (element.jumpTo.value != 'End' && mostValue != 'Next') {
                            mostValue = element.jumpTo.value;
                        } else {
                            mostValue = 'End'
                        }
                    }
                });
                if (mostValue == "") {
                    alert("Answer must be selected first.");
                    return;
                }
                vm.triggerTo(mostValue);
            } else {
                if (question.answerValue == null) {
                    alert("Answer must be selected first.");
                    return;
                }
                var mostValue = question.answerValue.jumpTo.value;
                vm.triggerTo(mostValue);
            }
        };

        vm.triggerTo = function (mostValue) {
            if (vm.counterQScreening <= vm.questionsScreening.questions.length - 1) {
                if (mostValue == 'Next') {
                    toastr.success('Answer Submitted', 'Success');
                    if (vm.counterQScreening == vm.questionsScreening.questions.length - 1) {
                        vm.finishScreening();
                        return;
                    }
                    vm.counterQScreening++;
                    vm.questionScreen = vm.questionsScreening.questions[vm.counterQScreening];
                } else if (mostValue != 'End') {
                    vm.questionsScreening.questions.forEach(function (element) {
                        if (element.uuid == mostValue) {
                            vm.questionScreen = element;
                            vm.counterQScreening = vm.questionsScreening.questions.indexOf(element);
                            toastr.success('Answer Submitted', 'Success');
                            return;
                        }
                    });
                } else {
                    vm.finishAll();
                }
            } else {
                vm.finishScreening();
            }
        }
        vm.finishScreening = function () {
            toastr.success('Finish Screening', 'Success');
            console.log(vm.questionsScreening);
            vm.intialMain();
        }
        vm.submitMain = function (question) {
            vm.title = 'Main Question';
            if (vm.counterGMain < vm.questionsMain.questionGroup.length - 1) {
                vm.counterGMain++;
                vm.questionsGMain = vm.questionsMain.questionGroup[vm.counterGMain];
                vm.title = vm.questionsMain.headerSectionName + ' - ' + vm.questionsGMain.groupname;
                toastr.success('Answer Submitted', 'Success');
            } else {
                vm.finishAll();
            }
        };
        vm.finishAll = function () {
            if (vm.questionsMain) {
                vm.questionList[1].questionGroup = vm.questionsMain;
                if (vm.formmodel.$invalid) {
                    return false;
                }
            }
            var param = {
                "questionnaireId": vm.questionaire.questionnaireId,
                "idparticipant": vm.idparticipant,
                "modelSurvey": vm.modelSurvey,
                "progresGroup": "",
                "isPassScreening": vm.isPassScreening,
                "status": "1", //0 :On Progress, //1:Finish
                "alldata": vm.questionList
            }
            fillingquestionaireService.savefillingolright(param).then(function (result) {
                toastr.success('Answer Screening Saved, thank\'s for your Participation', 'Success');
                $state.go('fillingquestionaire.olright');
                // if (result.statusText == "OK") {
                //     toastr.success(result.data.message, 'Success');
                //     toastr.success('Answer Screening Saved, thank\'s for your Participation', 'Success');
                //     $state.go('fillingquestionaire.fillingolright');
                // } else {
                //     vm.prosessave = false;
                //     toastr.error(result.data.message, 'Error');
                // }
            });
        }
        vm.intialFirst = function (questionList) {
            var QuestionHide = [];
            for (var index = 0; index < questionList.length; index++) {
                var element = questionList[index];
                if (element.questions) {
                    for (var subindex = 0; subindex < element.questions.length; subindex++) {
                        var question = element.questions[subindex];
                        if (question.skiplogic) {
                            for (var ssindex = 0; ssindex < question.skiplogic.length; ssindex++) {
                                var listSkiplogic = question.skiplogic[ssindex];
                                for (var sssindex = 0; sssindex < listSkiplogic.questions.length; sssindex++) {
                                    var Skiplogic = listSkiplogic.questions[sssindex];
                                    QuestionHide.push(Skiplogic.value);
                                }
                            }
                        }
                    }
                }
            }
            for (var index = 0; index < questionList.length; index++) {
                var element = questionList[index];
                if (element.questions) {
                    for (var subindex = 0; subindex < element.questions.length; subindex++) {
                        var question = element.questions[subindex];
                        if (QuestionHide.includes(question.uuid)) {
                            question.hide = true;
                        } else {
                            question.hide = false;
                        }
                    }
                }
            }
        }
        vm.hideQuestion = function (QuestionHide) {
            for (var index = 0; index < vm.questionsMain.length; index++) {
                var element = vm.questionsMain[index];
                if (element.questions) {
                    for (var subindex = 0; subindex < element.questions.length; subindex++) {
                        var question = element.questions[subindex];
                        if (QuestionHide.includes(question.uuid)) {
                            question.hide = true;
                        }
                    }
                }
            }
        }
        vm.showQuestion = function (QuestionShow, answerShow) {
            for (var index = 0; index < vm.questionsMain.length; index++) {
                var element = vm.questionsMain[index];
                if (element.questions) {
                    for (var subindex = 0; subindex < element.questions.length; subindex++) {
                        var question = element.questions[subindex];
                        if (QuestionShow.includes(question.uuid)) {
                            question.hide = false;
                            if (question.type == 'checkbox') {
                                for (var idxs = 0; idxs < question.answerCB.length; idxs++) {
                                    var answer_ = question.answerCB[idxs];
                                    if (answerShow.includes(answer_.uuid)) {
                                        answer_.hide = false;
                                    } else {
                                        answer_.hide = true;
                                    }
                                }
                            }
                            if (question.type == 'radiobutton') {
                                for (var idxs = 0; idxs < question.answerRB.length; idxs++) {
                                    var answer_ = question.answerRB[idxs];
                                    if (answerShow.includes(answer_.uuid)) {
                                        answer_.hide = false;
                                    } else {
                                        answer_.hide = true;
                                    }
                                }
                            }
                            if (question.type == 'dropdown') {
                                for (var idxs = 0; idxs < question.answerDD.length; idxs++) {
                                    var answer_ = question.answerDD[idxs];
                                    if (answerShow.includes(answer_.uuid)) {
                                        answer_.hide = false;
                                    } else {
                                        answer_.hide = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        vm.prosesShowHideLogic = function (question) {
            if (question.skiplogic) {
                var hideQuestion = [];
                var showQuestion = [];
                var answerShow = [];
                for (var ssindex = 0; ssindex < question.skiplogic.length; ssindex++) {
                    var listSkiplogic = question.skiplogic[ssindex];
                    if (question.type == 'radiobutton' || question.type == 'dropdown') {
                        if (question.answerValue.uuid == listSkiplogic.answerSelected.value) {
                            for (var sssindex = 0; sssindex < listSkiplogic.questions.length; sssindex++) {
                                var Skiplogic = listSkiplogic.questions[sssindex];
                                showQuestion.push(Skiplogic.value);
                                if (Skiplogic.answers) {
                                    for (var idxs = 0; idxs < Skiplogic.answers.length; idxs++) {
                                        var asnwer_ = Skiplogic.answers[idxs];
                                        answerShow.push(asnwer_.value);
                                    }
                                }
                            }
                        } else {
                            for (var sssindex = 0; sssindex < listSkiplogic.questions.length; sssindex++) {
                                var Skiplogic = listSkiplogic.questions[sssindex];
                                hideQuestion.push(Skiplogic.value);
                            }
                        }
                    } else if (question.type == 'checkbox') {
                        var answerselected = [];
                        for (var idx = 0; idx < question.answerCB.length; idx++) {
                            var answr = question.answerCB[idx];
                            if (answr.value) {
                                answerselected.push(answr.uuid);
                            }
                        }
                        if (answerselected.includes(listSkiplogic.answerSelected.value)) {
                            for (var sssindex = 0; sssindex < listSkiplogic.questions.length; sssindex++) {
                                var Skiplogic = listSkiplogic.questions[sssindex];
                                showQuestion.push(Skiplogic.value);
                                if (Skiplogic.answers) {
                                    for (var idxs = 0; idxs < Skiplogic.answers.length; idxs++) {
                                        var asnwer_ = Skiplogic.answers[idxs];
                                        answerShow.push(asnwer_.value);
                                    }
                                }
                            }
                        } else {
                            for (var sssindex = 0; sssindex < listSkiplogic.questions.length; sssindex++) {
                                var Skiplogic = listSkiplogic.questions[sssindex];
                                hideQuestion.push(Skiplogic.value);
                            }
                        }
                    }

                }
                if (hideQuestion.length > 0) {
                    vm.hideQuestion(hideQuestion);
                }
                if (showQuestion.length > 0) {
                    vm.showQuestion(showQuestion, answerShow);
                }
            }
        }
        vm.showhideQuestion = function (uuid, hide) {
            for (var index = 0; index < questionList.length; index++) {
                var element = questionList[index];
                if (element.questions) {
                    for (var subindex = 0; subindex < element.questions.length; subindex++) {
                        var question = element.questions[subindex];
                        if (question.uuid == uuid) {
                            question.hide = hide;
                            break;
                        }
                    }
                }
            }
        }
        //#region note
        // vm.questionList = [
        //     {
        //         "scriptCode": "H1.S.Q1.S",
        //         "headerSectionName": "Screening Test",
        //         "sort": 1,
        //         "type": "Screening",
        //         "questions": [
        //             {
        //                 "uuid": "6b13f394-812c-c2cd-8627-a8ee05328c05",
        //                 "scriptCode": "H1.S.Q1",
        //                 "question": "Your Question ?",
        //                 "type": "checkbox",
        //                 "sort": 1,
        //                 "isEditable": false,
        //                 "answerValue": null,
        //                 "answerRB": [],
        //                 "answerCB": [
        //                     {
        //                         "uuid": "699cb13f-ea3c-7bcd-3b51-2720fb23fb47",
        //                         "scriptCode": "H1.S.Q1.1",
        //                         "sort": 1,
        //                         "answerValue": "Ya",
        //                         "jumpTo": {
        //                             "label": "Next Question",
        //                             "value": "Next"
        //                         }
        //                     },
        //                     {
        //                         "uuid": "7ec528e4-eae8-8ec2-6a10-0adb6623ea59",
        //                         "scriptCode": "H1.S.Q1.2",
        //                         "sort": 2,
        //                         "answerValue": "Tidak",
        //                         "jumpTo": {
        //                             "label": "Your Question 3 ?",
        //                             "value": "23997aa6-e582-6e5e-2922-9fbb54949fee"
        //                         }
        //                     },
        //                     {
        //                         "uuid": "4b197da2-a93a-c6f4-fbc2-b7daa37311c9",
        //                         "scriptCode": "H1.S.Q1.99",
        //                         "sort": 99,
        //                         "answerValue": "",
        //                         "jumpTo": "End"
        //                     }
        //                 ],
        //                 "answerDD": []
        //             },
        //             {
        //                 "uuid": "23997aa6-e582-6e5e-2922-9fbb54949fee",
        //                 "scriptCode": "H1.S.Q2",
        //                 "question": "Your Question 3 ?",
        //                 "type": "dropdown",
        //                 "sort": 2,
        //                 "isEditable": false,
        //                 "answerValue": null,
        //                 "answerRB": [],
        //                 "answerCB": [],
        //                 "answerDD": [
        //                     {
        //                         "uuid": "d3541e0f-3992-b43a-fa36-89d48fa76c75",
        //                         "scriptCode": "H1.S.Q2.1",
        //                         "sort": 1,
        //                         "answerValue": "Ya",
        //                         "jumpTo": {
        //                             "label": "Next Question",
        //                             "value": "Next"
        //                         }
        //                     },
        //                     {
        //                         "uuid": "1cba1253-4564-6b1b-1fb7-cd57ca2fe9d1",
        //                         "scriptCode": "H1.S.Q2.2",
        //                         "sort": 2,
        //                         "answerValue": "Tidak",
        //                         "jumpTo": {
        //                             "label": "End/Finish Questionair",
        //                             "value": "End"
        //                         }
        //                     },
        //                     {
        //                         "uuid": "adc12da2-a93a-c6f4-fbc2-b7daa37311c9",
        //                         "scriptCode": "H1.S.Q2.99",
        //                         "sort": 99,
        //                         "answerValue": "",
        //                         "jumpTo": "End"
        //                     }
        //                 ]
        //             },
        //             {
        //                 "uuid": "0d739c57-8cba-2b92-8c56-857c5b97e3f7",
        //                 "scriptCode": "H1.S.Q3",
        //                 "question": "soal screening ini membantu tidak?",
        //                 "type": "radiobutton",
        //                 "sort": 3,
        //                 "isEditable": false,
        //                 "answerValue": null,
        //                 "answerRB": [
        //                     {
        //                         "uuid": "9045412c-0bb0-a26d-e6b5-346ae4729fee",
        //                         "scriptCode": "H1.S.Q3.1",
        //                         "sort": 1,
        //                         "answerValue": "Ya",
        //                         "jumpTo": {
        //                             "label": "Next Question",
        //                             "value": "Next"
        //                         }
        //                     },
        //                     {
        //                         "uuid": "2b185cdb-cecd-e9f1-4d0e-063630911946",
        //                         "scriptCode": "H1.S.Q3.2",
        //                         "sort": 2,
        //                         "answerValue": "Tidak",
        //                         "jumpTo": {
        //                             "label": "End/Finish Questionair",
        //                             "value": "End"
        //                         }
        //                     },
        //                     {
        //                         "uuid": "1ed31f75-4a3c-1086-f3e4-4635424060f7",
        //                         "scriptCode": "H1.S.Q3.99",
        //                         "sort": 99,
        //                         "answerValue": "",
        //                         "jumpTo": {
        //                             "label": "End/Finish Questionair",
        //                             "value": "End"
        //                         }
        //                     }
        //                 ],
        //                 "answerCB": [],
        //                 "answerDD": []
        //             }
        //         ],
        //         "questionGroup": null
        //     },
        //     {
        //         "scriptCode": "H1.S.Q1.M",
        //         "headerSectionName": "Main Question",
        //         "sort": 2,
        //         "type": "Question",
        //         "questions": null,
        //         "questionGroup": [
        //             {
        //                 "scriptCode": "H1.M.1",
        //                 "uuid": null,
        //                 "groupname": "Group Perkenalan",
        //                 "sort": 1,
        //                 "isEditable": false,
        //                 "questions": [
        //                     {
        //                         "uuid": "4030187e-2075-5890-68c3-eadc12f773f4",
        //                         "question": "Siapa nama anda?",
        //                         "type": "shortanswer",
        //                         "isEditable": false,
        //                         "formtype": "text",
        //                         "isDecimal": false,
        //                         "required": false,
        //                         "numOfDecimal": 2,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.1.Q1",
        //                         "sort": 1,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 100,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "55a21e80-1c25-7672-319b-3621543d8682",
        //                         "question": "Silahkan pilih mall kesukaan anda",
        //                         "type": "checkbox",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.1.Q2",
        //                         "sort": 2,
        //                         "skiplogic": [
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "d436db95-6dca-b8e9-cb10-76a5cf83809e",
        //                                         "label": "Kapan Terakhir ke Central Park?",
        //                                         "answers": null
        //                                     },
        //                                     {
        //                                         "value": "dfa8c6a6-11a0-5e5c-b6fb-59c9df306671",
        //                                         "label": "Ke mall ini, apa sih yang anda cari?",
        //                                         "answers": [
        //                                             {
        //                                                 "value": "bdf6e849-09ba-be3b-225d-d7f1f4937999",
        //                                                 "label": "Sbux CP"
        //                                             },
        //                                             {
        //                                                 "value": "a90488bc-bd49-69ac-128f-537020b3f249",
        //                                                 "label": "Swalayan CP"
        //                                             },
        //                                             {
        //                                                 "value": "fb93d8fa-68a0-9cdb-70ba-0e0e66e7d4c4",
        //                                                 "label": ""
        //                                             },
        //                                             {
        //                                                 "value": "c460a10d-4e69-4fc1-91b7-3e63f16fa47a",
        //                                                 "label": "Toko gadget CP"
        //                                             }
        //                                         ]
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "aeadae73-2fd3-0a60-67a7-fd62187c3c10",
        //                                     "label": "Central Park"
        //                                 }
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "53ce46a5-916d-f711-4bde-7d520967ca75",
        //                                         "label": "Kapan terakhir ke Taman Anggrek?",
        //                                         "answers": null
        //                                     },
        //                                     {
        //                                         "value": "dfa8c6a6-11a0-5e5c-b6fb-59c9df306671",
        //                                         "label": "Ke mall ini, apa sih yang anda cari?",
        //                                         "answers": [
        //                                             {
        //                                                 "value": "fb93d8fa-68a0-9cdb-70ba-0e0e66e7d4c4",
        //                                                 "label": ""
        //                                             },
        //                                             {
        //                                                 "value": "0f5268b4-9785-ebd1-1d6a-f0b5f05802d6",
        //                                                 "label": "Toko gadget TA"
        //                                             },
        //                                             {
        //                                                 "value": "1ed71919-bf91-6a9f-7e73-62998ec674bf",
        //                                                 "label": "Swalayan TA"
        //                                             },
        //                                             {
        //                                                 "value": "caf7794d-1018-4e91-f1f1-6e7242d37e1b",
        //                                                 "label": "Sbux TA"
        //                                             }
        //                                         ]
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "57e8e414-102a-df29-b754-a174f972a6cd",
        //                                     "label": "Taman Anggrek"
        //                                 }
        //                             }
        //                         ],
        //                         "maxSelect": 2,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": [
        //                             {
        //                                 "uuid": "aeadae73-2fd3-0a60-67a7-fd62187c3c10",
        //                                 "scriptCode": "H1.M.1.Q2.1",
        //                                 "sort": 1,
        //                                 "answerValue": "Central Park",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "57e8e414-102a-df29-b754-a174f972a6cd",
        //                                 "scriptCode": "H1.M.1.Q2.2",
        //                                 "sort": 2,
        //                                 "answerValue": "Taman Anggrek",
        //                                 "jumpTo": "End"
        //                             },
        //                             {
        //                                 "uuid": "7f8e7bc4-0442-9b3e-e8b1-444fb2487f89",
        //                                 "scriptCode": "H1.M.1.Q2.99",
        //                                 "sort": 99,
        //                                 "answerValue": "",
        //                                 "jumpTo": "End"
        //                             }
        //                         ],
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "53ce46a5-916d-f711-4bde-7d520967ca75",
        //                         "question": "Kapan terakhir ke Taman Anggrek?",
        //                         "type": "date",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.1.Q3",
        //                         "sort": 3,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "d436db95-6dca-b8e9-cb10-76a5cf83809e",
        //                         "question": "Kapan Terakhir ke Central Park?",
        //                         "type": "date",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.1.Q4",
        //                         "sort": 4,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "dfa8c6a6-11a0-5e5c-b6fb-59c9df306671",
        //                         "question": "Ke mall ini, apa sih yang anda cari?",
        //                         "type": "radiobutton",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.1.Q5",
        //                         "sort": 5,
        //                         "skiplogic": [
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "79daa2c4-993b-96ff-9669-1306d9cd462f",
        //                                         "label": "Berikan rating untuk mall CP",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "bdf6e849-09ba-be3b-225d-d7f1f4937999",
        //                                     "label": "Sbux CP"
        //                                 }
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "79daa2c4-993b-96ff-9669-1306d9cd462f",
        //                                         "label": "Berikan rating untuk mall CP",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "a90488bc-bd49-69ac-128f-537020b3f249",
        //                                     "label": "Swalayan CP"
        //                                 }
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "79daa2c4-993b-96ff-9669-1306d9cd462f",
        //                                         "label": "Berikan rating untuk mall CP",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "c460a10d-4e69-4fc1-91b7-3e63f16fa47a",
        //                                     "label": "Toko gadget CP"
        //                                 }
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "79daa2c4-993b-96ff-9669-1306d9cd462f",
        //                                         "label": "Berikan rating untuk mall TA",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "0f5268b4-9785-ebd1-1d6a-f0b5f05802d6",
        //                                     "label": "Toko gadget TA"
        //                                 }
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "79daa2c4-993b-96ff-9669-1306d9cd462f",
        //                                         "label": "Berikan rating untuk mall TA",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "1ed71919-bf91-6a9f-7e73-62998ec674bf",
        //                                     "label": "Swalayan TA"
        //                                 }
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "79daa2c4-993b-96ff-9669-1306d9cd462f",
        //                                         "label": "Berikan rating untuk mall TA",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "caf7794d-1018-4e91-f1f1-6e7242d37e1b",
        //                                     "label": "Sbux TA"
        //                                 }
        //                             }
        //                         ],
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": [
        //                             {
        //                                 "uuid": "bdf6e849-09ba-be3b-225d-d7f1f4937999",
        //                                 "scriptCode": "H1.M.1.Q5.1",
        //                                 "sort": 1,
        //                                 "answerValue": "Sbux CP",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "a90488bc-bd49-69ac-128f-537020b3f249",
        //                                 "scriptCode": "H1.M.1.Q5.2",
        //                                 "sort": 2,
        //                                 "answerValue": "Swalayan CP",
        //                                 "jumpTo": "End"
        //                             },
        //                             {
        //                                 "uuid": "c460a10d-4e69-4fc1-91b7-3e63f16fa47a",
        //                                 "scriptCode": "H1.M.1.Q5.3",
        //                                 "sort": 3,
        //                                 "answerValue": "Toko gadget CP",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "0f5268b4-9785-ebd1-1d6a-f0b5f05802d6",
        //                                 "scriptCode": "H1.M.1.Q5.4",
        //                                 "sort": 4,
        //                                 "answerValue": "Toko gadget TA",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "1ed71919-bf91-6a9f-7e73-62998ec674bf",
        //                                 "scriptCode": "H1.M.1.Q5.5",
        //                                 "sort": 5,
        //                                 "answerValue": "Swalayan TA",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "caf7794d-1018-4e91-f1f1-6e7242d37e1b",
        //                                 "scriptCode": "H1.M.1.Q5.6",
        //                                 "sort": 6,
        //                                 "answerValue": "Sbux TA",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "fb93d8fa-68a0-9cdb-70ba-0e0e66e7d4c4",
        //                                 "scriptCode": "H1.M.1.Q5.99",
        //                                 "sort": 99,
        //                                 "answerValue": "",
        //                                 "jumpTo": "End"
        //                             }
        //                         ],
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "79daa2c4-993b-96ff-9669-1306d9cd462f",
        //                         "question": "Berikan rating untuk mall CP",
        //                         "type": "linierscale",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.1.Q6",
        //                         "sort": 6,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": {
        //                             "uuid": null,
        //                             "scriptCode": "H1.M.1.Q6.1",
        //                             "sort": 0,
        //                             "answerValue": null,
        //                             "jumpTo": null,
        //                             "stdVal": 3,
        //                             "stdReg": 0,
        //                             "minVal": 0,
        //                             "maxVal": 10,
        //                             "minNote": "Sangat Tidak Keren",
        //                             "maxNote": "Sangat Keren",
        //                             "belowStdJumpTo": "Next",
        //                             "aboveStdJumpTo": "Next"
        //                         },
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "79daa2c4-993b-96ff-9669-1306d9cd462f",
        //                         "question": "Berikan rating untuk mall TA",
        //                         "type": "linierscale",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.1.Q7",
        //                         "sort": 7,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": {
        //                             "uuid": null,
        //                             "scriptCode": "H1.M.1.Q7.1",
        //                             "sort": 0,
        //                             "answerValue": null,
        //                             "jumpTo": null,
        //                             "stdVal": 3,
        //                             "stdReg": 0,
        //                             "minVal": 0,
        //                             "maxVal": 10,
        //                             "minNote": "Sangat Tidak Keren",
        //                             "maxNote": "Sangat Keren",
        //                             "belowStdJumpTo": "Next",
        //                             "aboveStdJumpTo": "Next"
        //                         },
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     }
        //                 ]
        //             },
        //             {
        //                 "scriptCode": "H1.M.2",
        //                 "uuid": null,
        //                 "groupname": "Group Sosialita",
        //                 "sort": 2,
        //                 "isEditable": false,
        //                 "questions": [
        //                     {
        //                         "uuid": "e1b4ad38-0ddf-8770-574d-4e611ffd1e37",
        //                         "question": "Jam berapa biasa anda ke mall?",
        //                         "type": "time",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.2.Q1",
        //                         "sort": 1,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "12f04d53-8765-68ff-4ae6-6d559130258b",
        //                         "question": "Pengunjung mana yg biasa paling ramai pada jam segitu?",
        //                         "type": "dropdown",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.2.Q2",
        //                         "sort": 2,
        //                         "skiplogic": [
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "806f203c-247e-d649-dc0c-761904867cdb",
        //                                         "label": "Ceritain dong pengalaman anda jalan2 di mall tsb pas jam sibuk",
        //                                         "answers": null
        //                                     },
        //                                     {
        //                                         "value": "b4fa6b4e-0b1d-6e90-eea7-33852759cde7",
        //                                         "label": "Bisa berapa jam anda menghabiskan waktu di mall tsb?",
        //                                         "answers": null
        //                                     },
        //                                     {
        //                                         "value": "ac8795e3-6ffb-7ca6-40e6-c4ef5ca761ba",
        //                                         "label": "Kalau jam ramai tsb, anda pasti suka melipir kemana supaya ngga ikutan berdesakan?",
        //                                         "answers": [
        //                                             {
        //                                                 "value": "cb054bfb-10cb-6fb3-1862-8e3f88e8b660",
        //                                                 "label": ""
        //                                             },
        //                                             {
        //                                                 "value": "0d5bc82c-2b6a-c6a1-f4ba-09f5c7795082",
        //                                                 "label": "Food Court TA"
        //                                             },
        //                                             {
        //                                                 "value": "be25b484-cc2b-cbb7-edca-91f6d6af89cf",
        //                                                 "label": "Store ternama favorit TA"
        //                                             }
        //                                         ]
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "3e5f1d4d-71e0-d426-6dbb-0aeb70b00193",
        //                                     "label": "Mall TA"
        //                                 }
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "806f203c-247e-d649-dc0c-761904867cdb",
        //                                         "label": "Ceritain dong pengalaman anda jalan2 di mall tsb pas jam sibuk",
        //                                         "answers": null
        //                                     },
        //                                     {
        //                                         "value": "b4fa6b4e-0b1d-6e90-eea7-33852759cde7",
        //                                         "label": "Bisa berapa jam anda menghabiskan waktu di mall tsb?",
        //                                         "answers": null
        //                                     },
        //                                     {
        //                                         "value": "ac8795e3-6ffb-7ca6-40e6-c4ef5ca761ba",
        //                                         "label": "Kalau jam ramai tsb, anda pasti suka melipir kemana supaya ngga ikutan berdesakan?",
        //                                         "answers": [
        //                                             {
        //                                                 "value": "6c9d07aa-acfa-9ca9-f361-4e51ef0a8114",
        //                                                 "label": "Swalayan CP"
        //                                             },
        //                                             {
        //                                                 "value": "4c12ba77-b58b-e1f7-6302-cfe99c978407",
        //                                                 "label": "Toko buku Cp"
        //                                             },
        //                                             {
        //                                                 "value": "cb054bfb-10cb-6fb3-1862-8e3f88e8b660",
        //                                                 "label": ""
        //                                             }
        //                                         ]
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "36466a17-a2ed-2c8d-405b-bc36ebb3c1ba",
        //                                     "label": "Mall CP"
        //                                 }
        //                             }
        //                         ],
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": [
        //                             {
        //                                 "uuid": "3e5f1d4d-71e0-d426-6dbb-0aeb70b00193",
        //                                 "scriptCode": "H1.M.2.Q2.1",
        //                                 "sort": 1,
        //                                 "answerValue": "Mall TA",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "36466a17-a2ed-2c8d-405b-bc36ebb3c1ba",
        //                                 "scriptCode": "H1.M.2.Q2.2",
        //                                 "sort": 2,
        //                                 "answerValue": "Mall CP",
        //                                 "jumpTo": "End"
        //                             }
        //                         ],
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "806f203c-247e-d649-dc0c-761904867cdb",
        //                         "question": "Ceritain dong pengalaman anda jalan2 di mall tsb pas jam sibuk",
        //                         "type": "paragraph",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.2.Q3",
        //                         "sort": 3,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 1000,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "b4fa6b4e-0b1d-6e90-eea7-33852759cde7",
        //                         "question": "Bisa berapa jam anda menghabiskan waktu di mall tsb?",
        //                         "type": "shortanswer",
        //                         "isEditable": false,
        //                         "formtype": "number",
        //                         "isDecimal": false,
        //                         "required": true,
        //                         "numOfDecimal": 2,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.2.Q4",
        //                         "sort": 4,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 100,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "ac8795e3-6ffb-7ca6-40e6-c4ef5ca761ba",
        //                         "question": "Kalau jam ramai tsb, anda pasti suka melipir kemana supaya ngga ikutan berdesakan?",
        //                         "type": "radiobutton",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.2.Q5",
        //                         "sort": 5,
        //                         "skiplogic": [
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "cf4a0c04-3716-5a21-ab06-34a6f5dd1384",
        //                                         "label": "Kalo di CP coba nilai kerapian dan keramaian pada toko tsb",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "6c9d07aa-acfa-9ca9-f361-4e51ef0a8114",
        //                                     "label": "Swalayan CP"
        //                                 },
        //                                 "sort": 1,
        //                                 "scriptCode": ".1"
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "cf4a0c04-3716-5a21-ab06-34a6f5dd1384",
        //                                         "label": "Kalo di CP coba nilai kerapian dan keramaian pada toko tsb",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "4c12ba77-b58b-e1f7-6302-cfe99c978407",
        //                                     "label": "Toko buku Cp"
        //                                 },
        //                                 "sort": 2,
        //                                 "scriptCode": ".2"
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "83252178-fe62-49f7-3e70-cf2b11d8c57b",
        //                                         "label": "Di TA coba nilai kerapian dan keramaian pada TA",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "be25b484-cc2b-cbb7-edca-91f6d6af89cf",
        //                                     "label": "Store ternama favorit TA"
        //                                 },
        //                                 "sort": 3,
        //                                 "scriptCode": ".3"
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "83252178-fe62-49f7-3e70-cf2b11d8c57b",
        //                                         "label": "Di TA coba nilai kerapian dan keramaian pada TA",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "0d5bc82c-2b6a-c6a1-f4ba-09f5c7795082",
        //                                     "label": "Food Court TA"
        //                                 }
        //                             },
        //                             {
        //                                 "formtype": "Show",
        //                                 "questions": [
        //                                     {
        //                                         "value": "49a49be6-cfdf-a550-a81e-b42feb507584",
        //                                         "label": "Anda pilih other, mohon rating quisioner ini",
        //                                         "answers": null
        //                                     }
        //                                 ],
        //                                 "answerSelected": {
        //                                     "value": "cb054bfb-10cb-6fb3-1862-8e3f88e8b660",
        //                                     "label": "Other"
        //                                 }
        //                             }
        //                         ],
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": [
        //                             {
        //                                 "uuid": "6c9d07aa-acfa-9ca9-f361-4e51ef0a8114",
        //                                 "scriptCode": "H1.M.2.Q5.1",
        //                                 "sort": 1,
        //                                 "answerValue": "Swalayan CP",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "4c12ba77-b58b-e1f7-6302-cfe99c978407",
        //                                 "scriptCode": "H1.M.2.Q5.2",
        //                                 "sort": 2,
        //                                 "answerValue": "Toko buku Cp",
        //                                 "jumpTo": "End"
        //                             },
        //                             {
        //                                 "uuid": "0d5bc82c-2b6a-c6a1-f4ba-09f5c7795082",
        //                                 "scriptCode": "H1.M.2.Q5.3",
        //                                 "sort": 3,
        //                                 "answerValue": "Food Court TA",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "be25b484-cc2b-cbb7-edca-91f6d6af89cf",
        //                                 "scriptCode": "H1.M.2.Q5.4",
        //                                 "sort": 4,
        //                                 "answerValue": "Store ternama favorit TA",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "cb054bfb-10cb-6fb3-1862-8e3f88e8b660",
        //                                 "scriptCode": "H1.M.2.Q5.99",
        //                                 "sort": 99,
        //                                 "answerValue": "",
        //                                 "jumpTo": "End"
        //                             }
        //                         ],
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "cf4a0c04-3716-5a21-ab06-34a6f5dd1384",
        //                         "question": "Kalo di CP coba nilai kerapian dan keramaian pada toko tsb",
        //                         "type": "gridcheckbox",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.2.Q6",
        //                         "sort": 6,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": [
        //                             {
        //                                 "uuid": "94ce5ed0-d132-8723-43c6-f3ea4195bbcf",
        //                                 "scriptCode": "H1.M.2.Q6.1",
        //                                 "sort": 1,
        //                                 "answerValue": "Zara",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "b7f36e1b-9165-ba2a-3fd9-c830ffaa192e",
        //                                 "scriptCode": "H1.M.2.Q6.2",
        //                                 "sort": 2,
        //                                 "answerValue": "Sbux",
        //                                 "jumpTo": "End"
        //                             }
        //                         ],
        //                         "answerRBG": null,
        //                         "answerLS": null,
        //                         "columnRBG": null,
        //                         "columnCBG": [
        //                             {
        //                                 "scriptCode": "H1.M.2.Q6.C1",
        //                                 "uuid": "d6009f2a-8fe4-9182-25a5-a991c720c02d",
        //                                 "sort": 1,
        //                                 "columnText": "Paling ramai"
        //                             },
        //                             {
        //                                 "scriptCode": "H1.M.2.Q6.C2",
        //                                 "uuid": "44d8d256-c63c-3a20-a28e-a75a95b45ac7",
        //                                 "sort": 2,
        //                                 "columnText": "Paling bersih"
        //                             }
        //                         ]
        //                     },
        //                     {
        //                         "uuid": "83252178-fe62-49f7-3e70-cf2b11d8c57b",
        //                         "question": "Di TA coba nilai kerapian dan keramaian pada TA",
        //                         "type": "gridradiobutton",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.2.Q7",
        //                         "sort": 7,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": [
        //                             {
        //                                 "uuid": "637ec27d-ba40-4201-6a85-248a78f19ca7",
        //                                 "scriptCode": "H1.M.2.Q7.1",
        //                                 "sort": 1,
        //                                 "answerValue": "Pizza hut",
        //                                 "jumpTo": "Next"
        //                             },
        //                             {
        //                                 "uuid": "b240a253-b2e1-b10e-1180-d77fdcc394f2",
        //                                 "scriptCode": "H1.M.2.Q7.2",
        //                                 "sort": 2,
        //                                 "answerValue": "Bioskop",
        //                                 "jumpTo": "End"
        //                             }
        //                         ],
        //                         "answerLS": null,
        //                         "columnRBG": [
        //                             {
        //                                 "scriptCode": "H1.M.2.Q7.C1",
        //                                 "uuid": "5b740062-218c-e7cd-d350-a8170bad51d1",
        //                                 "sort": 1,
        //                                 "columnText": "Paling ramai"
        //                             },
        //                             {
        //                                 "scriptCode": "H1.M.2.Q7.C2",
        //                                 "uuid": "1e0c1e77-6ec9-3685-17a0-ca8dc62f1dea",
        //                                 "sort": 2,
        //                                 "columnText": "Paling rapi"
        //                             }
        //                         ],
        //                         "columnCBG": null
        //                     },
        //                     {
        //                         "uuid": "49a49be6-cfdf-a550-a81e-b42feb507584",
        //                         "question": "Anda pilih other, mohon rating quisioner ini",
        //                         "type": "linierscale",
        //                         "isEditable": false,
        //                         "formtype": null,
        //                         "isDecimal": null,
        //                         "required": true,
        //                         "numOfDecimal": 0,
        //                         "answerValue": null,
        //                         "scriptCode": "H1.M.2.Q8",
        //                         "sort": 8,
        //                         "skiplogic": null,
        //                         "maxSelect": 0,
        //                         "minLength": 0,
        //                         "maxLength": 0,
        //                         "minDate": null,
        //                         "maxDate": null,
        //                         "answerRB": null,
        //                         "answerCB": null,
        //                         "answerDD": null,
        //                         "answerCBG": null,
        //                         "answerRBG": null,
        //                         "answerLS": {
        //                             "uuid": null,
        //                             "scriptCode": "H1.M.2.Q8.1",
        //                             "sort": 0,
        //                             "answerValue": null,
        //                             "jumpTo": null,
        //                             "stdVal": 3,
        //                             "stdReg": 0,
        //                             "minVal": 0,
        //                             "maxVal": 10,
        //                             "minNote": "Sangat Tidak Cerdas",
        //                             "maxNote": "Sangat Cerdas",
        //                             "belowStdJumpTo": "Next",
        //                             "aboveStdJumpTo": "Next"
        //                         },
        //                         "columnRBG": null,
        //                         "columnCBG": null
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ];
        //#endregion note
        vm.initialScreening();
    }
})();
