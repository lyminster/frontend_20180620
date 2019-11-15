/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.fillingquestionaire')
        .controller('openlinkctrl', openlinkctrl);

    /** @ngInject */
    function openlinkctrl(
        $q,
        $state,
        $scope,
        $location,
        $uibModal,
        toastr,
        $filter,
        editableOptions,
        editableThemes,
        fillingquestionaireService,
        managequestionaireService,
        authService,
        $stateParams,
        localStorageService) {
        var vm = this;
        vm.getdata = true;
        vm.isipertanyaan = false;
        vm.thanks = false;
        vm.newParticipant = {};
        vm.genderList = [{ label: "MR", value: 1 }, { label: "MRS", value: 2 }];
        vm.newParticipant.gender = vm.genderList[0];
        vm.questionnaireId = "";
        vm.idparticipant = "";
        vm.modelSurvey = "fieldSurvey";

        var params = $location.search();
        var verif = decodeURI(params['verifikasi']).replace(" " , "+");
        
        function simpandata(){
            
            // console.log(vm.newParticipant)
            // console.log(verif)

            fillingquestionaireService
            .saveScreeningNewParticipantOpenLink(verif,vm.newParticipant)
            .then(function (result) {
                vm.questionnaireId = result.data.scenarioID;
                vm.idparticipant = result.data.leadsID;
                fillingquestionaireService.openlinkStart(result.data.scenarioID,result.data.leadsID).then(function(result){
                    console.log(result)
                    vm.getdata = false;
                    vm.isipertanyaan = true;
                    vm.dataMentah = result.data.screeningQuestionList;
                    for (var index = 0; index < vm.dataMentah.length; index++) {
                        vm.dataMentah[index].fill = true;
                    }
                    vm.tempFillingScreening = vm.dataMentah.filter(function (el) {
                        return el.fill == true;
                    });
                    for (var index = 0; index < vm.tempFillingScreening.length; index++) {
                        vm.tempFillingScreening[index].fill = true;
                    }
                    vm.dataMentah = null;
                    vm.initialScreening();
                })
                
            });
        }
        vm.initialScreening = function () {
            vm.title = 'Screening Question';
            vm.counterHeader = 0;
            vm.counterQScreening = 0;
            vm.counterGMain = 0;
            vm.questionsScreening = vm.tempFillingScreening[vm.counterHeader];
            vm.questionScreen = vm.questionsScreening.questions[vm.counterQScreening];
            vm.title = vm.questionsScreening.headerName + ' - ' + vm.title;
        };
        vm.submitScreening = function (question) {
            console.log("masuk ke next")
            if (vm.counterQScreening < vm.questionsScreening.questions.length - 1 && question.answerValue.jumpTo === "Next") {
                vm.counterQScreening++;
                vm.questionScreen = vm.questionsScreening.questions[vm.counterQScreening];
                toastr.success('Answer Submitted1', 'Success');
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
        vm.getMainQuestion = function () {
            console.log("masuk ke main")
            var param = {
                "questionnaireID": parseInt(vm.questionnaireId),
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
        vm.submitMain = function (question) {
            var param = {
                "questionnaireId": vm.questionnaireId,
                "idparticipant": vm.idparticipant,
                "modelSurvey": vm.modelSurvey,
                "progresGroup": "",
                "status": "1", //0 :On Progress, //1:Finish
                "ScreeningAnswer": vm.tempFillingMain
            }
            
            
            

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
                    fillingquestionaireService.savefillingNext(param).then(function (result) {
                        // console.log(result);
                        if (result.statusText == "OK") {
                            
                            // toastr.success(result.data.message, 'Success');
                            // toastr.success('Answer Screening Saved, thank\'s for your Participation', 'Success');
                            // $state.go('fillingquestionaire.selectparticipant', { questionaire: vm.questionaire, type: 'DCSL' });
                        } else {
                            vm.prosessave = false;
                            toastr.error(result.data.message, 'Error');
                        }
                    });
                } else {
                    vm.finishAll();
                }
            }
        };
        vm.finishAll = function () {
            var param = {
                "questionnaireId": vm.questionnaireId,
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
                        //$state.go('fillingquestionaire.selectparticipant', { questionaire: vm.questionaire, type: 'DCSL' });
                        vm.isipertanyaan = false;
                        vm.thanks = true;
                    } else {
                        vm.prosessave = false;
                        toastr.error(result.data.message, 'Error');
                    }
                });
        }
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
        $scope.simpandata = simpandata
        
        vm.getOccupation1 = function(){
            managequestionaireService.getOccupation().then(function(results){
                vm.occupationItems = results.data;
                vm.newParticipant.occupation = vm.occupationItems[0];
                vm.getses();
            });
        }
        vm.getOccupation1();
        vm.getses = function(){
            managequestionaireService.getSES().then(function(results){
                vm.sesItems = results.data;
                vm.newParticipant.ses = vm.sesItems[0];
                vm.getallkabu();
            });
        }
        vm.getallkabu = function(){
            managequestionaireService.getAreakabupatenAll().then(function(results){
                vm.kabupatenItems = results.data;
                vm.newParticipant.kabupaten = vm.kabupatenItems[0];
                vm.getedu();
            });
        }
        vm.getedu = function(){
            managequestionaireService.getEducation().then(function(results){
                vm.educationItems = results.data;
                vm.newParticipant.education = vm.educationItems[0];
            });
        }
        
    }
})();
