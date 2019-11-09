/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('editquestionairectrl', editquestionairectrl);

    /** @ngInject */
    function editquestionairectrl($q, $state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService, $stateParams) {
        var vm = this;
        vm.currentUser = authService;
        if ($stateParams.id === null) {
            $state.go('managequestionaire.list');
        }
        vm.note = null;
        vm.tempEditIdQuis = $stateParams.id;
        vm.siDuplicate = $stateParams.duplicate;
        vm.title = 'Edit Questionnaire DCSL';
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
        vm.general.region = authService.authentication.mainDealerCode + ' - ' + authService.authentication.mainDealerName;
        //vm.general.dealer = authService.authentication.dealerCode +' - ' + authService.authentication.dealerName;
        vm.general.createdBy = authService.authentication.fullName;

        if (vm.tempEditIdQuis !== null) {
            managequestionaireService.getDetailQuestionnaire(vm.tempEditIdQuis).then(function (result) {
                var tempResult = result;
                vm.tempEditIdQuis = result.data.id;
                var promises = [];
                promises.push(managequestionaireService.getQuestionnaireType());
                promises.push(managequestionaireService.getTemplate());
                promises.push(managequestionaireService.getAgeRange());
                promises.push(managequestionaireService.getEducation());
                promises.push(managequestionaireService.getGender());
                promises.push(managequestionaireService.getOccupation());
                promises.push(managequestionaireService.getReligion());
                promises.push(managequestionaireService.getSES());
                promises.push(managequestionaireService.getAreapropinsi());
                promises.push(managequestionaireService.getRo());
                promises.push(managequestionaireService.getUnittype());
                promises.push(managequestionaireService.postRelateddealer());
                if (tempResult.data.target.propinsi !== null) {
                    promises.push(managequestionaireService.getAreakabupaten(tempResult.data.target.propinsi.ID));
                    if (tempResult.data.target.kabupaten !== null) {
                        promises.push(managequestionaireService.getAreakecamatan(tempResult.data.target.kabupaten.ID));
                    }
                }

                $q.all(promises).then(function (results) {
                    vm.questTypeItems = results[0].data;
                    vm.templateItems = results[1].data;
                    vm.templateItems = vm.templateItems.filter(function (element) {
                        return element.value != '';
                    });
                    vm.ageRangeItems = results[2].data;
                    vm.educationItems = results[3].data;
                    vm.genderItems = results[4].data;
                    vm.occupationItems = results[5].data;
                    vm.religionItems = results[6].data;
                    vm.sesItems = results[7].data;
                    vm.propinsiItems = results[8].data;
                    vm.getRoItems = results[9].data;
                    vm.unitTypeItems = results[10].data;
                    vm.relatedDealerItems = results[11].data;
                    if (results.length > 12) {
                        vm.kabupatenItems = results[12].data;
                        if (results.length > 13) {
                            vm.kecamatanItems = results[13].data;
                        }
                    }
                    vm.note = tempResult.data.note;
                    vm.general = tempResult.data.general;
                    vm.target = tempResult.data.target;
                    vm.general.status = tempResult.data.statusName;
                    if (vm.siDuplicate) {
                        vm.general.status = 'Draft';
                    }
                    vm.questionList = tempResult.data.questionList;
                    if (vm.siDuplicate) {
                        vm.tempEditIdQuis = 0;
                        vm.general.questName = '';
                        vm.general.startDistributionDate = '';
                        vm.general.endDistributionDate = '';
                    }

                    vm.general.region = authService.authentication.mainDealerCode + ' - ' + authService.authentication.mainDealerName;
                    //vm.general.dealer = authService.authentication.dealerCode +' - ' + authService.authentication.dealerName;
                    vm.general.createdBy = authService.authentication.fullName;
                });
            });
        }
        /** Modal Config */
        vm.openFormQuestionScreaning = function (scriptCodeH, questions) {
            if (questions == null) {
                questions = new Array();
            }
            var formdata = {
                question: "Your Question ?",
                type: "RadioButton",
                scriptCode: scriptCodeH + '.Q' + (questions.length + 1),
                sort: (questions.length + 1),
                isEditable: true,
                answerRB: [
                    {
                        sort: 1,
                        answerValue: "Ya",
                        jumpTo: "Next"
                    }, {
                        sort: 2,
                        answerValue: "Tidak",
                        jumpTo: "End"
                    }
                ]
            };
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formQ-screaning.html',
                size: 'md',
                controller: 'formQScreaningCtrl',
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
                templateUrl: 'app/pages/managequestionaire/form/formQ-screaning.html',
                size: 'md',
                isEditable: true,
                controller: 'formQScreaningCtrl',
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
        vm.openModalJumpto = function (headerSections, answer) {
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
        vm.openFormQuestionLinierScale = function (scriptCodeH, list) {
            if (list == null) {
                list = [];
            }
            var formdata = {
                question: "Your Question ?",
                type: "linierscale",
                scriptCode: scriptCodeH + '.Q' + (list.length + 1),
                sort: (list.length + 1),
                required: true,
                isEditable: true,
                answerLS: {
                    minVal: 1,
                    minNote: "Sangat Tidak Puas",
                    maxVal: 5,
                    maxNote: "Sangat Puas",
                    stdVal: 3,
                    stdReg: 0,
                    belowStdJumpTo: "Next",
                    aboveStdJumpTo: "Next"
                }
            };
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formQ-linierscale.html',
                size: 'md',
                controller: 'formQlinierscaleCtrl',
                resolve: {
                    content: function () {
                        return { 'data': formdata };
                    }
                }
            });
            modalInstance.result.then(function (result) {
                list.push(result);
                vm.resertSortscriptCode(scriptCodeH, list);
            }, function () {
            });
        };
        vm.openEditFormQuestionLinierScale = function (list, formdata) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/managequestionaire/form/formQ-linierscale.html',
                size: 'md',
                controller: 'formQlinierscaleCtrl',
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
        vm.delete = function (list, formdata, scriptCodeH, type) {
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
        // initial Select 
        
        vm.getTemplateContent = function (templateType) {
            managequestionaireService.getTemplateJson(templateType).then(function (result) {
                console.log(result.data);
                console.log("Script Template Master");
                vm.questionList = result.data.questionList;
                vm.questionList.forEach(function (element) {
                    element.headerSections.forEach(function (element1) {
                        if (element1.type == 'Screening') {
                            if (!Array.isArray(element1.questions)) {
                                element1.questions = [];
                            }
                        } else {
                            element1.questionGroup.forEach(function (element2) {
                                if (!Array.isArray(element2.questions)) {
                                    element2.questions = [];
                                }
                            }, this);
                        }
                    }, this);
                }, this);
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
            managequestionaireService.getsavequestionnaire(param).then(function (result) {
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
            var param = {
                id: vm.tempEditIdQuis,
                status: "1",
                general: vm.general,
                target: vm.target,
                questionList: vm.questionList
            }
            managequestionaireService.getsavequestionnaire(param).then(function (result) {
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
        // vm.changeTypeQuest = function () {
        //     if (vm.general.questType != 'DCSL') {
        //         vm.general.quartal = null;
        //     }
        // };
        vm.getAreakabupaten = function (propId) {
            managequestionaireService.getAreakabupaten(propId).then(function (result) {
                vm.kabupatenItems = result.data;
                if (vm.kabupatenItems.length > 0) {
                    vm.target.kabupaten = result.data[0];
                    vm.getAreakecamatan(vm.target.kabupaten.ID)
                }
            });
        };
        vm.getAreakecamatan = function (kabupatId) {
            managequestionaireService.getAreakecamatan(kabupatId).then(function (result) {
                vm.kecamatanItems = result.data;
                vm.target.kecamatan = result.data[0];
            });
        };
    }
})();
