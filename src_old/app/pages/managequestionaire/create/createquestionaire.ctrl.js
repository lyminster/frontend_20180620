/**
 * @author v.ichwan
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .controller('createquestionairectrl', createquestionairectrl);

    /** @ngInject */
    function createquestionairectrl($state, $scope, $uibModal, toastr, $filter, editableOptions, editableThemes, managequestionaireService, authService, reportService) {
        var vm = this;
        vm.currentUser = authService;
        vm.typedcsl = true;
        vm.title = 'Create New DCSL'
        vm.sdate = new Date().toISOString().slice(0,10); 
        vm.general = {};
        vm.target = {};
        vm.tempEditIdQuis = 0;
        vm.questionList = [];
        vm.general.teleSurvey = false;
        vm.general.fieldSurvey = false;
        vm.general.selfSurvey = false;
        vm.general.questType = { "label": "DCSL", "value": "DCSL" };
		vm.general.year = (new Date()).getFullYear();
        vm.general.region = authService.authentication.mainDealerCode +' - ' + authService.authentication.mainDealerName;
        vm.general.createdBy = authService.authentication.fullName;
        vm.general.createdDate = vm.sdate;
        vm.general.status = "Draft";
        vm.quartals = [
            { label: "I", value: 1 },
            { label: "II", value: 2 },
            { label: "III", value: 3 },
            { label: "IV", value: 4 }
        ];
        vm.general.quartal = vm.quartals[0];
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
                answer.jumpTo = result.value;
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
                vm.prosessave = false;
            }).finally(function() { vm.prosessave = false; });
        };
        vm.savefinishquestionnaire = function () {
            vm.prosessave = true;
            var i = 0;
            vm.questionList.forEach(function (element) {
                element.headerSections.forEach(function (element1) {
                    if (element1.type != 'Screening') {
                        element1.questionGroup.forEach(function (element2) {
                            i = i+element2.questions.length;
                        }, this);
                    }
                }, this);
            }, this);
            if (i == 0) {
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
        // vm.changeTypeQuest = function () {
        //     if (vm.general.questType != 'DCSL') {
        //         vm.general.quartal = null;
        //     }
        // };
        // vm.getQuestionnaireType = function () {
        //     managequestionaireService.getQuestionnaireType().then(function (result) {
        //         vm.questTypeItems = result.data;
        //         vm.general.questType = result.data[0];
        //     });
        // };
        //vm.getQuestionnaireType();
        vm.getTemplate = function () {
            managequestionaireService.getTemplate().then(function (result) {
                vm.templateItems = result.data;
                vm.templateItems = vm.templateItems.filter(function (element) {
                    return element.value != '';
                });
                //vm.general.template = result.data[0];
            });
        };
        vm.getTemplate();
        // reportService.getreportregion().then(function (result) {
        //     vm.regionItems = result.data;
        //     vm.general.region = [];
        // });
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
        vm.getAgeRange = function () {
            managequestionaireService.getAgeRange().then(function (result) {
                vm.ageRangeItems = result.data;
                vm.target.ageRange = result.data[0];
            });
        };
        vm.getAgeRange();
        vm.getEducation = function () {
            managequestionaireService.getEducation().then(function (result) {
                vm.educationItems = result.data;
                vm.target.education = result.data[0];
            });
        };
        vm.getEducation();
        vm.getGender = function () {
            managequestionaireService.getGender().then(function (result) {
                vm.genderItems = result.data;
                vm.target.gender = result.data[0];
            });
        };
        vm.getGender();
        vm.getOccupation = function () {
            managequestionaireService.getOccupation().then(function (result) {
                vm.occupationItems = result.data;
                vm.target.occupation = result.data[0];
            });
        };
        vm.getOccupation();
        vm.getReligion = function () {
            managequestionaireService.getReligion().then(function (result) {
                vm.religionItems = result.data;
                vm.target.religion = result.data[0];
            });
        };
        vm.getReligion();
        vm.getSES = function () {
            managequestionaireService.getSES().then(function (result) {
                vm.sesItems = result.data;
                vm.target.ses = result.data[0];
            });
        };
        vm.getSES();
        vm.getAreapropinsi = function () {
            managequestionaireService.getAreapropinsi().then(function (result) {
                vm.propinsiItems = result.data;
                if (vm.propinsiItems.length > 0) {
                    vm.target.propinsi = result.data[0];
                    //vm.getAreakabupaten(vm.target.propinsi.ID)
                }
            });
        };
        vm.getAreapropinsi();
        vm.getAreakabupaten = function (propId) {
            managequestionaireService.getAreakabupaten(propId).then(function (result) {
                vm.kabupatenItems = result.data;
                if (vm.kabupatenItems.length > 0) {
                    vm.target.kabupaten = result.data[0];
                    //vm.getAreakecamatan(vm.target.kabupaten.ID)
                }
            });
        };
        vm.getAreakecamatan = function (kabupatId) {
            managequestionaireService.getAreakecamatan(kabupatId).then(function (result) {
                vm.kecamatanItems = result.data;
                vm.target.kecamatan = result.data[0];
            });
        }
        vm.getRo = function () {
            managequestionaireService.getRo().then(function (result) {
                vm.getRoItems = result.data;
                vm.target.ro = result.data[0];
            });
        };
        vm.getRo();
        vm.getUnittype = function () {
            managequestionaireService.getUnittype().then(function (result) {
                vm.unitTypeItems = result.data;
                vm.target.unitType = result.data[0];
            });
        };
        vm.getUnittype();
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
            managequestionaireService.getScriptmaster().then(function (result) {
                console.log("Script Master");
                console.log(result);
                vm.questionList = result.data;
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
        vm.getScriptmaster();
    }
})();