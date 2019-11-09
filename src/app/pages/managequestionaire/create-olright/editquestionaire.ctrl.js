/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('editquestionaireolrightctrl', editquestionaireolrightctrl);

    /** @ngInject */
    function editquestionaireolrightctrl($q, $state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService, $stateParams, localStorageService) {
        var vm = this;
        vm.typeolright = true;
        vm.currentUser = authService;
        if ($stateParams.id === null) {
            $state.go('managequestionaire.list');
        }
        vm.note = null;
        vm.tempEditIdQuis = $stateParams.id;
        vm.siDuplicate = $stateParams.duplicate;
        vm.title = 'Edit Questionnaire OLRIGHT';
        vm.sdate = new Date().toISOString().slice(0,10); 
        if (vm.siDuplicate) {
            vm.title = 'Duplicate Questionnaire OLRIGHT';
        }
        vm.general = {};
        vm.target = {};
        vm.questionList = [];
        vm.general.teleSurvey = false;
        vm.general.fieldSurvey = false;
        vm.general.selfSurvey = false;
        //vm.general.region = authService.authentication.mainDealerCode + ' - ' + authService.authentication.mainDealerName;
        //vm.general.dealer = authService.authentication.dealerCode +' - ' + authService.authentication.dealerName;
        vm.general.createdBy = authService.authentication.fullName;

        if (vm.tempEditIdQuis !== null) {
            managequestionaireService.getDetailQuestionnaire(vm.tempEditIdQuis).then(function (result) {
                var tempResult = result;
                vm.tempEditIdQuis = result.data.id;
                
                vm.note = tempResult.data.note;
                vm.general = tempResult.data.general;
                vm.target = tempResult.data.target;
                vm.questionList = tempResult.data.questionList;
                vm.general.status = tempResult.data.statusName;
                if (vm.siDuplicate) {
                    vm.general.status = 'Draft';
                }
                if (vm.siDuplicate) {
                    vm.tempEditIdQuis = 0;
                    vm.general.questName = '';
                    vm.general.startDistributionDate = '';
                    vm.general.endDistributionDate = '';
                }

                //vm.general.region = authService.authentication.mainDealerCode + ' - ' + authService.authentication.mainDealerName;
                //vm.general.dealer = authService.authentication.dealerCode +' - ' + authService.authentication.dealerName;
                vm.general.createdBy = authService.authentication.fullName;
                // var promises = [];

                // promises.push(managequestionaireService.getQuestionnaireType());
                // promises.push(managequestionaireService.getTemplate());
                // promises.push(managequestionaireService.getAgeRange());
                // promises.push(managequestionaireService.getEducation());
                // promises.push(managequestionaireService.getGender());
                // promises.push(managequestionaireService.getOccupation());
                // promises.push(managequestionaireService.getReligion());
                // promises.push(managequestionaireService.getSES());
                // promises.push(managequestionaireService.getAreapropinsi());
                // promises.push(managequestionaireService.getRo());
                // promises.push(managequestionaireService.getUnittype());
                // promises.push(managequestionaireService.postRelateddealer());
                // promises.push(managequestionaireService.getRegion());
                // if (tempResult.data.target.propinsi !== null) {
                //     promises.push(managequestionaireService.getAreakabupaten(tempResult.data.target.propinsi.ID));
                // }

                // $q.all(promises).then(function (results) {
                //     vm.questTypeItems = results[0].data;
                //     vm.templateItems = results[1].data;
                //     vm.ageRangeItems = results[2].data;
                //     vm.educationItems = results[3].data;
                //     vm.genderItems = results[4].data;
                //     vm.occupationItems = results[5].data;
                //     vm.religionItems = results[6].data;
                //     vm.sesItems = results[7].data;
                //     vm.propinsiItems = results[8].data;
                //     vm.getRoItems = results[9].data;
                //     vm.unitTypeItems = results[10].data;
                //     vm.relatedDealerItems = results[11].data;
                //     vm.regionItems = results[12].data;
                //     if (results.length > 13) {
                //         vm.kabupatenItems = results[13].data;
                //     }
                // });
            });
        }
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
                        return { 'data': formdata };
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
                    alert("Soal sudah memiliki skip logic. Hapus logic terlebih dahulu untuk edit.");
                    return;
                }
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
            if (dataClone.skiplogic != null) {
                dataClone.skiplogic = null;
            }
            list.push(dataClone);
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
        }

        vm.move = function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        }
        // initial Select 
        vm.mastertarget = localStorageService.get('mastertarget');
        vm.mastergeneral = localStorageService.get('mastergeneral');
        vm.mastergeneral.region =  vm.mastergeneral.region.filter(function (element) {
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
        vm.general.region = vm.mastergeneral.region;
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
        vm.getAreakabupaten = function (propId) {
            managequestionaireService.getAreakabupaten(propId).then(function (result) {
                vm.kabupatenItems = result.data;
                vm.kabupatenItems = vm.kabupatenItems.filter(function (element) {
                    return element.Code != '';
                });
                if (vm.kabupatenItems.length > 0) {
                    vm.target.kabupaten = result.data[0];
                    vm.getAreakecamatan(vm.target.kabupaten.ID)
                }
            });
        };
    }
})();
