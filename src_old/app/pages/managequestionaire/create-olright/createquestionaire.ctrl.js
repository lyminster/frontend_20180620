/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('createquestionaireolrightctrl', createquestionaireolrightctrl);

    /** @ngInject */
    function createquestionaireolrightctrl($state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService, reportService, localStorageService) {
        var vm = this;
        vm.typeolright = true;
        vm.currentUser = authService;
        vm.isHO = vm.currentUser.authentication.IsHO == 'YES';
        vm.title = 'Create New OLRIGHT'
        vm.sdate = new Date().toISOString().slice(0, 10);
        vm.general = {};
        vm.target = {};
        vm.tempEditIdQuis = 0;
        vm.questionList = [];
        vm.general.teleSurvey = false;
        vm.general.fieldSurvey = false;
        vm.general.selfSurvey = false;
        vm.general.questType = { "label": "OLRIGHT", "value": "OLRIGHT" };
        vm.general.year = (new Date()).getFullYear();
        vm.general.region = [];
        vm.general.createdBy = authService.authentication.fullName;
        vm.general.createdDate = vm.sdate;
        vm.general.status = "Draft";

        /** Modal Config */
        vm.openFormQuestionScreaning = function (type, scriptCodeH, questions) {
            if (questions == null) {
                questions = new Array();
            }
            var answers = [
                {
                    uuid: managequestionaireService.getGuid(),
                    sort: 1,
                    answerValue: "Ya",
                    jumpTo: { label: 'Next Question', value: 'Next' }
                }, {
                    uuid: managequestionaireService.getGuid(),
                    sort: 2,
                    answerValue: "Tidak",
                    jumpTo: { label: 'End/Finish Questionair', value: 'End' }
                }, {
                    uuid: managequestionaireService.getGuid(),
                    sort: 99,
                    answerValue: "",
                    jumpTo: { label: 'End/Finish Questionair', value: 'End' }
                }
            ];
            var formdata = {
                uuid: managequestionaireService.getGuid(),
                question: "Your Question ?",
                type: type,
                scriptCode: scriptCodeH + '.Q' + (questions.length + 1),
                sort: (questions.length + 1),
                isEditable: true,
            };
            if (type == 'dropdown') {
                formdata.answerDD = answers;
            } else if (type == 'checkbox') {
                formdata.answerCB = answers;
            } else if (type == 'radiobutton') {
                formdata.answerRB = answers;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formQ-screaningolright.html',
                size: 'md',
                controller: 'formQScreaningolrightCtrl',
                resolve: {
                    content: function () {
                        return { 'data': formdata };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                questions.push(result);
                vm.resertSortscriptCode(scriptCodeH, questions);
            }, function () {
            });
        };
        vm.resertSortscriptCode = function (scriptCodeH, list) {
            for (var i = 0; i < list.length; i++) {
                list[i].sort = i + 1;
                list[i].scriptCode = scriptCodeH + '.Q' + (i + 1);
            }
        };
        vm.resertSortscriptCodeG = function (scriptCodeH, list) {
            for (var i = 0; i < list.length; i++) {
                list[i].sort = i + 1;
                list[i].scriptCode = scriptCodeH + '.' + (i + 1);
            }
        };
        vm.openEditFormQuestionScreaning = function (questions, formdata) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formQ-screaningolright.html',
                size: 'md',
                isEditable: true,
                controller: 'formQScreaningolrightCtrl',
                resolve: {
                    content: function () {
                        return { 'data': angular.copy(formdata)};
                    }
                }
            });
            modalInstance.result.then(function (result) {
                questions[questions.indexOf(formdata)] = result;
            }, function () {
            });
        };
        vm.openModalJumpto = function (headerSections, answer, questions, question) {
            var indx = questions.indexOf(question);
            indx++;
            var questionsFilter = angular.copy(questions);
            questionsFilter.splice(0, indx);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formSelectJompTo.html',
                size: 'lg',
                controller: 'formSelectJompToCtrl',
                resolve: {
                    content: function () {
                        return { 'data': headerSections, 'questions': questionsFilter };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                answer.jumpTo = result;
            }, function () {
            });
        };
        vm.openbelowStdJumpTo = function (headerSections, answer) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formSelectJompTo.html',
                size: 'lg',
                controller: 'formSelectJompToCtrl',
                resolve: {
                    content: function () {
                        return { 'data': headerSections };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                answer.answerLS.belowStdJumpTo = result;
            }, function () {
            });
        };
        vm.openaboveStdJumpTo = function (headerSections, answer) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formSelectJompTo.html',
                size: 'lg',
                controller: 'formSelectJompToCtrl',
                resolve: {
                    content: function () {
                        return { 'data': headerSections };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                answer.answerRB.aboveStdJumpTo = result;
            }, function () {
            });
        };
        vm.openFormGroup = function (scriptCodeH, list) {
            if (list == null) {
                list = [];
            }
            var formdata = {
                groupname: "Name",
                sort: (list.length + 1),
                scriptCode: scriptCodeH + '.Q' + (list.length + 1),
                isEditable: true,
                questions: []
            };
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formSection.html',
                size: 'md',
                controller: 'formSectionCtrl',
                resolve: {
                    content: function () {
                        return { 'data': formdata };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                list.push(result);
                vm.resertSortscriptCodeG(scriptCodeH, list);
            }, function () {
            });
        };
        vm.openEditFormGroup = function (list, formdata) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formSection.html',
                size: 'md',
                controller: 'formSectionCtrl',
                resolve: {
                    content: function () {
                        return { 'data': formdata };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                list[list.indexOf(formdata)] = result;
            }, function () {
            });
        };
        vm.editQuestionnaire = function (paramdata, qtype, scriptCodeH, list) {
            if (paramdata.skiplogic != null) {
                if (paramdata.skiplogic.length > 0) {
                    alert("Soal sudah memiliki skip logic. Hapus skip logic terlebih dahulu untuk edit.");
                    return;
                }
            }
            if (vm.isExistonSkipLogic(paramdata.uuid)) {
                alert("Soal sudah memiliki depedensi skip logic. Hapus skip logic terlebih dahulu untuk edit data ini.");
                return;
            }
            if (list == null) {
                list = [];
            }
            var formdata = angular.copy(paramdata);

            formdata.scriptCode = scriptCodeH + '.Q' + (list.length + 1);
            formdata.sort = (list.length + 1);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formQ-' + qtype.toLowerCase() + '.html',
                size: 'md',
                controller: 'formQ' + qtype.toLowerCase() + 'Ctrl',
                resolve: {
                    content: function () {
                        return { 'data': formdata, "isolright": true };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                list[list.indexOf(paramdata)] = result;
                vm.resertSortscriptCode(scriptCodeH, list);
            }, function () {
            });
        };
        vm.addQuestionnaire = function (qtype, scriptCodeH, list) {
            if (list == null) {
                list = [];
            }
            var aa = managequestionaireService[qtype]();
            var formdata = angular.copy(aa.dataForm);
            formdata.scriptCode = scriptCodeH + '.Q' + (list.length + 1);
            formdata.sort = (list.length + 1);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formQ-' + qtype.toLowerCase() + '.html',
                size: 'md',
                controller: 'formQ' + qtype.toLowerCase() + 'Ctrl',
                resolve: {
                    content: function () {
                        return { 'data': formdata, "isolright": true };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                list.push(result);
                vm.resertSortscriptCode(scriptCodeH, list);
            }, function () {
            });
        };
        vm.delete = function (list, formdata, scriptCodeH, type) {
            if (formdata.skiplogic != null) {
                if (formdata.skiplogic.length > 0) {
                    alert("Soal sudah memiliki skip logic. Hapus logic terlebih dahulu untuk menghapus.");
                    return;
                }
            }
            if (type == "question") {
                if (vm.isExistonSkipLogic(formdata.uuid)) {
                    alert("Soal sudah memiliki depedensi skip logic. Hapus logic terlebih dahulu untuk menghapus data ini.");
                    return;
                }
            }
            var r = confirm("Are you sure, want to delete this data.?");
            if (r == true) {
                list.splice(list.indexOf(formdata), 1);
            }
            if (type == "question") {
                vm.resertSortscriptCode(scriptCodeH, list);
            } else {
                vm.resertSortscriptCodeG(scriptCodeH, list);
            }
        };
        vm.duplicate = function (list, formdata, scriptCodeH, type) {
            var dataClone = angular.copy(formdata);
            //console.log("before");
            //console.log(formdata);
            dataClone.uuid = managequestionaireService.getGuid();
            if (dataClone.answerCB) {
                for (var indx = 0; indx < dataClone.answerCB.length; indx++) {
                    var element = dataClone.answerCB[indx];
                    element.uuid = managequestionaireService.getGuid();
                }
            }
            if (dataClone.answerRB) {
                for (var indx = 0; indx < dataClone.answerRB.length; indx++) {
                    var element = dataClone.answerRB[indx];
                    element.uuid = managequestionaireService.getGuid();
                }
            }
            if (dataClone.answerDD) {
                for (var indx = 0; indx < dataClone.answerDD.length; indx++) {
                    var element = dataClone.answerDD[indx];
                    element.uuid = managequestionaireService.getGuid();
                }
            }
            if (dataClone.answerRBG) {
                for (var indx = 0; indx < dataClone.answerRBG.length; indx++) {
                    var element = dataClone.answerRBG[indx];
                    element.uuid = managequestionaireService.getGuid();
                }
            }
            if (dataClone.columnRBG) {
                for (var indx = 0; indx < dataClone.columnRBG.length; indx++) {
                    var element = dataClone.columnRBG[indx];
                    element.uuid = managequestionaireService.getGuid();
                }
            }
            if (dataClone.answerCBG) {
                for (var indx = 0; indx < dataClone.answerCBG.length; indx++) {
                    var element = dataClone.answerCBG[indx];
                    element.uuid = managequestionaireService.getGuid();
                }
            }
            if (dataClone.columnCBG) {
                for (var indx = 0; indx < dataClone.columnCBG.length; indx++) {
                    var element = dataClone.columnCBG[indx];
                    element.uuid = managequestionaireService.getGuid();
                }
            }
            if (dataClone.skiplogic != null) {
                dataClone.skiplogic = null;
            }
            list.push(dataClone);
            //console.log("after");
            //console.log(dataClone);
            if (type == "question") {
                vm.resertSortscriptCode(scriptCodeH, list);
            } else {
                vm.resertSortscriptCodeG(scriptCodeH, list);
            }
            toastr.success('Questionnaire success duplicated', 'Success');
        };
        vm.openaskiplogic = function (listquestionGroup, questionGroup, listquestion, question) {
            var listGroupAvail = listquestionGroup.filter(function (elm) {
                return elm.sort > questionGroup.sort;
            });
            var listQuestAvail = listquestion.filter(function (elm) {
                return elm.sort > question.sort;
            });
            var allquesttionn = [];
            for (var index = 0; index < listQuestAvail.length; index++) {
                var element = listQuestAvail[index];
                allquesttionn.push(element);
            }
            for (var index = 0; index < listGroupAvail.length; index++) {
                var element = listGroupAvail[index];
                for (var iindex = 0; iindex < element.questions.length; iindex++) {
                    var subelement = element.questions[iindex];
                    allquesttionn.push(subelement);
                }
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/modal/skiplogic.html',
                size: 'lg',
                controller: 'skiplogicCtrl',
                resolve: {
                    content: function () {
                        return { 'question': question, 'listquestion': allquesttionn };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (question.skiplogic == null) {
                    question.skiplogic = [];
                }
                var temp = angular.copy(result);
                question.skiplogic.push(temp);
            }, function () {
            });
        };
        vm.groupmove = function (typeMove, gquestion, questionList, scriptCodeH, $event) {
            var indx = questionList.indexOf(gquestion);
            if ($event) {
                $event.stopPropagation();
                $event.preventDefault();
            }
            if (typeMove == 'up') {
                if (indx > 0) {
                    vm.move(questionList, indx, (indx - 1));
                    vm.resertSortscriptCodeG(scriptCodeH, questionList);
                }
            } else {
                if (indx < (questionList.length - 1)) {
                    vm.move(questionList, indx, (indx + 1));
                    vm.resertSortscriptCodeG(scriptCodeH, questionList);
                }
            }
        };
        vm.move = function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        };
        vm.isExistonSkipLogic = function (stringResult) {
            var allStringuuidused = "";
            for (var i1 = 0; i1 < vm.questionList.length; i1++) {
                var element = vm.questionList[i1];
                if (element.questionGroup) {
                    for (var i2 = 0; i2 < element.questionGroup.length; i2++) {
                        var element1 = element.questionGroup[i2];
                        if (element1.questions) {
                            for (var i3 = 0; i3 < element1.questions.length; i3++) {
                                var element3 = element1.questions[i3];
                                if (element3.skiplogic) {
                                    allStringuuidused += JSON.stringify(element3.skiplogic);
                                }
                            }
                        }
                    }
                }
            }
            var n = allStringuuidused.includes(stringResult);
            return n;
        }
        // initial Select 
        vm.savedraftquestionnaire = function () {
            vm.prosessave = true;
            var param = {
                id: vm.tempEditIdQuis,
                status: "0",
                general: vm.general,
                target: vm.target,
                questionList: vm.questionList
            }
            managequestionaireService.getsavequestionnaireOlright(param).then(function (result) {
                if (result.data.result == "OK") {
                    vm.prosessave = false;
                    toastr.success(result.data.message, 'Success');
                    $state.go('managequestionaire.list');
                } else {
                    vm.prosessave = false;
                    toastr.error(result.data.message, 'Error');
                }
            }).finally(function() { vm.prosessave = false; });
        };
        vm.savefinishquestionnaire = function () {
            vm.prosessave = true;
            if (vm.questionList.length == 0) {
                toastr.error("Main Question tidak boleh 0", 'Error');
                vm.prosessave = false;
                return;
            }
            var param = {
                id: vm.tempEditIdQuis,
                status: "1",
                general: vm.general,
                target: vm.target,
                questionList: vm.questionList
            }
            managequestionaireService.getsavequestionnaireOlright(param).then(function (result) {
                if (result.data.result == "OK") {
                    vm.prosessave = false;
                    toastr.success(result.data.message, 'Success');
                    $state.go('managequestionaire.list');
                } else {
                    vm.prosessave = false;
                    toastr.error(result.data.message, 'Error');
                }
            }).finally(function() { vm.prosessave = false; });
        };
        vm.quartals = [
            { label: "I", value: 1 },
            { label: "II", value: 2 },
            { label: "III", value: 3 },
            { label: "IV", value: 4 }
        ];
        vm.changeTypeQuest = function () {
            if (vm.general.questType != 'DCSL') {
                vm.general.quartal = null;
            }
        };

        //#region Initial Master
        vm.mastertarget = localStorageService.get('mastertarget');
        vm.mastergeneral = localStorageService.get('mastergeneral');
        vm.general.region = vm.mastergeneral.regionOlright;
        if (vm.isHO) {
            vm.mastergeneral.regionOlright = vm.mastergeneral.region;
            vm.general.region = vm.mastergeneral.region;
        }
        vm.mastergeneral.regionOlright = vm.mastergeneral.regionOlright.filter(function (element) {
            return element.Code != '';
        });
        vm.general.region = vm.general.region.filter(function (element) {
            return element.Code != '';
        });
        vm.mastertarget.ageRange = vm.mastertarget.ageRange.filter(function (element) {
            return element.value != '';
        });
        vm.mastertarget.education = vm.mastertarget.education.filter(function (element) {
            return element.value != '';
        });
        vm.mastertarget.gender = vm.mastertarget.gender.filter(function (element) {
            return element.value != '';
        });
        vm.mastertarget.occupation = vm.mastertarget.occupation.filter(function (element) {
            return element.value != '';
        });
        vm.mastertarget.ses = vm.mastertarget.ses.filter(function (element) {
            return element.value != '';
        });
        vm.mastertarget.religion = vm.mastertarget.religion.filter(function (element) {
            return element.value != '';
        });

        if (vm.mastertarget == null) {

        }
        vm.getTemplate = function () {
            managequestionaireService.getTemplateOlright().then(function (result) {
                vm.templateItems = result.data;
                vm.templateItems = vm.templateItems.filter(function (element) {
                    return element.value != '';
                });
                vm.general.template = [];
            });
        };
        vm.getTemplate();
        vm.getTemplateContent = function (templateType) {
            managequestionaireService.getTemplateJson(templateType).then(function (result) {
                vm.questionList = result.data.questionList;
            });
        };
        vm.getAreakabupaten = function (propId) {
            managequestionaireService.getAreakabupaten(propId).then(function (result) {
                vm.kabupatenItems = result.data;
                vm.kabupatenItems = vm.kabupatenItems.filter(function (element) {
                    return element.Code != '';
                });
                if (vm.kabupatenItems.length > 0) {
                    vm.target.kabupaten = [];
                    //vm.getAreakecamatan(vm.target.kabupaten.ID)
                }
            });
        };
        vm.postRelateddealer = function () {
            managequestionaireService.postRelateddealer().then(function (result) {
                vm.relatedDealerItems = result.data;
                if (vm.relatedDealerItems.length > 0) {
                    vm.general.dealer = angular.copy(vm.relatedDealerItems);
                }
            });
        };
        vm.postRelateddealer();
        vm.getScriptmaster = function () {
            // managequestionaireService.getScriptmaster().then(function (result) {
            //     //console.log("Script Master");
            //     //console.log(result);
            //     vm.questionList = result.data;
            //     vm.questionList.forEach(function (element) {
            //         element.headerSections.forEach(function (element1) {
            //             if (element1.type == 'Screening') {
            //                 if (!Array.isArray(element1.questions)) {
            //                     element1.questions = [];
            //                 }
            //             } else {
            //                 element1.questionGroup.forEach(function (element2) {
            //                     if (!Array.isArray(element2.questions)) {
            //                         element2.questions = [];
            //                     }
            //                 }, this);
            //             }
            //         }, this);
            //     }, this);
            // });
            vm.questionList = [
                {
                    "scriptCode": "H1.S",
                    "headerSectionName": "Screening Test",
                    "type": "Screening",
                    "sort": 1,
                    "questions": [],
                    "questionGroup": null
                },
                {
                    "scriptCode": "H1.M",
                    "headerSectionName": "Main Question",
                    "type": "Question",
                    "sort": 2,
                    "questions": null,
                    "questionGroup": []
                }
            ];
        };
        vm.getScriptmaster();
        //#endregion Initial Master
    }
})();