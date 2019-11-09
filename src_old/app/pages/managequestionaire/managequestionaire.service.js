/**
 * @author ich-one
 * created on 6.11.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.managequestionaire')
        .factory('managequestionaireService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings, $localForage) {
            var serviceBase = ngAuthSettings.apiServiceAPIBaseUri;
            var managequestionaireServiceFactory = {};
            // managequestionaireServiceFactory.getMasterAll = function () {
            //     return $http.post(serviceBase + 'api/questionnaire/post/getMasterAll').then(function (results) {
            //         return results;
            //     });
            // };
            // $http.post(serviceBase + 'api/questionnaire/post/getMasterAll').then(function (results) {
            //     $localForage.setItem('masterAll', results).then(function() {});
            // });
            managequestionaireServiceFactory.getQuestionnaireType = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/questType').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getTotalTarget = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/totalTarget').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getTemplate = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/template').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getTemplateContent = function (templateType) {
                return $http.get(serviceBase + 'api/questionnaire/get/templateContent?TemplateType="' + templateType + '"').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getTemplateJson = function (templateType) {
                return $http.get(serviceBase + 'api/questionnaire/get/templatejson?ID=' + templateType + '').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getTemplateOlright = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/template?type=olright').then(function (results) {
                    return results;
                });
            };
            //http://surveyaiwebapi.azurewebsites.net/api/questionnaire/get/template?type=olright
            managequestionaireServiceFactory.getAgeRange = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/age').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getEducation = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/education').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getGender = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/gender').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getOccupation = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/occupation').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getReligion = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/religion').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getSES = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/ses').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getAreapropinsi = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/areapropinsi').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getAreakabupaten = function (propId) {
                return $http.get(serviceBase + 'api/questionnaire/get/areakabupatenbyid?ProID=' + propId + '').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getAreakabupatenAll = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/areakabupaten').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getAreakecamatan = function (kabupatId) {
                return $http.get(serviceBase + 'api/questionnaire/get/areakecamatanbyid?KabID=' + kabupatId + '').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getRo = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/ro').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getUnittype = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/unittype').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getScriptmaster = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/scriptmaster').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getScriptmasterheader = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/scriptmasterheader').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getScriptmastersection = function (headerCode) {
                return $http.get(serviceBase + 'api/questionnaire/get/scriptmastersection?HeaderCode=' + headerCode).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getRegion = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/region').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getsavequestionnaire = function (param) {
                return $http.put(serviceBase + 'api/questionnaire/put/savequestionnaire', param).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getsavequestionnaireOlright = function (param) {
                return $http.put(serviceBase + 'api/olright/put/saveolright', param).then(function (results) {
                    return results;
                });
            }; 
            managequestionaireServiceFactory.getQuestionnaire = function (param) {
                return $http.post(serviceBase + 'api/questionnaire/post/searchlist', param).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getApprovalQuestionnaire = function (param) {
                return $http.post(serviceBase + 'api/questionnaire/post/searchapproval', param).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getAllQuestionnaire = function () {
                return $http.get(serviceBase + 'api/questionnaire/get/list').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getDetailQuestionnaire = function (scenarioID) {
                return $http.get(serviceBase + 'api/questionnaire/get/questionnairedetail?ID=' + scenarioID + '').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getDetailquestionnairesummary = function (scenarioID) {
                return $http.get(serviceBase + 'api/questionnaire/get/questionnairesummary?ID=' + scenarioID + '').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getDetailquestionnaireolrightsummary = function (scenarioID) {
                return $http.post(serviceBase + 'api/olright/post/olrightsummary?ID=' + scenarioID + '').then(function (results) {
                    return results;
                });
            }
            managequestionaireServiceFactory.putProcessapproval = function (param) {
                return $http.put(serviceBase + 'api/questionnaire/put/processapproval', param).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.postRelateddealer = function () {
                return $http.post(serviceBase + 'api/questionnaire/post/relateddealer').then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.putsetPic = function (param) {
                return $http.post(serviceBase + 'api/questionnaire/post/relateddealer', param).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getreasignparticipantbyid = function (questionnaireID) {
                return $http.post(serviceBase + 'api/questionnaire/post/reasignparticipantbyid?ID=' + questionnaireID).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.postupdatePICquestioner = function (param) {
                return $http.post(serviceBase + 'api/questionnaire/post/updatePICquestioner', param).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.getpicQuestioner = function (param) {
                return $http.post(serviceBase + 'api/questionnaire/post/picQuestioner?ID=' + param).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.changePassword = function (param) {
                return $http.post(serviceBase + 'api/changepassword', param).then(function (results) {
                    return results;
                });
            };
            managequestionaireServiceFactory.checkbox = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "checkbox",
                        "isEditable": true,
                        "required": true,
                        "maxSelect": 0,
                        "useOther": false,
                        "answerCB": [
                            {
                                "uuid": guid(),
                                "sort": 1,
                                "answerValue": "Option 1",
                                "jumpTo": "Next"
                            },
                            {
                                "uuid": guid(),
                                "sort": 2,
                                "answerValue": "Option 2",
                                "jumpTo": "End"
                            },
                            {
                                "uuid": guid(),
                                "sort": 99,
                                "answerValue": "",
                                "jumpTo": "End"
                            }
                        ],
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.radiobutton = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "radiobutton",
                        "isEditable": true,
                        "required": true,
                        "useOther": false,
                        "answerRB": [
                            {
                                "uuid": guid(),
                                "sort": 1,
                                "answerValue": "Ya",
                                "jumpTo": "Next"
                            },
                            {
                                "uuid": guid(),
                                "sort": 2,
                                "answerValue": "Tidak",
                                "jumpTo": "End"
                            },
                            {
                                "uuid": guid(),
                                "sort": 99,
                                "answerValue": "",
                                "jumpTo": "End"
                            }
                        ],
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.date = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "date",
                        "minDate": null,
                        "maxDate": null,
                        "isEditable": true,
                        "required": true,
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.dropdown = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "dropdown",
                        "isEditable": true,
                        "required": true,
                        "answerDD": [
                            {
                                "uuid": guid(),
                                "sort": 1,
                                "answerValue": "Ya",
                                "jumpTo": "Next"
                            },
                            {
                                "uuid": guid(),
                                "sort": 2,
                                "answerValue": "Tidak",
                                "jumpTo": "End"
                            }
                        ],
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.linierscale = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "linierscale",
                        "required": true,
                        "isEditable": true,
                        "answerValue": null,
                        "counterFilling": 0,
                        "note": null,
                        "answerLS": {
                            "stdVal": 3,
                            "stdReg": 4,
                            "minVal": 0,
                            "maxVal": 10,
                            "minNote": "Sangat Tidak Puas",
                            "maxNote": "Sangat Puas",
                            "belowStdJumpTo": "Next",
                            "aboveStdJumpTo": "Next"
                        }
                    }
                }
            };
            managequestionaireServiceFactory.gridradiobutton = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "gridradiobutton",
                        "isEditable": true,
                        "required": true,
                        "answerRBG": [
                            {
                                "uuid": guid(),
                                "sort": 1,
                                "answerValue": "Question 1 ?",
                                "jumpTo": "Next"
                            },
                            {
                                "uuid": guid(),
                                "sort": 2,
                                "answerValue": "Question 2 ?",
                                "jumpTo": "End"
                            }
                        ],
                        "columnRBG": [
                            {
                                "uuid": guid(),
                                "sort": 1,
                                "columnText": "Ya"
                            },
                            {
                                "uuid": guid(),
                                "sort": 2,
                                "columnText": "Tidak"
                            }
                        ],
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.gridcheckbox = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "gridcheckbox",
                        "isEditable": true,
                        "required": true,
                        "answerCBG": [
                            {
                                "uuid": guid(),
                                "sort": 1,
                                "answerValue": "Your Question 1 ?",
                                "jumpTo": "Next"
                            },
                            {
                                "uuid": guid(),
                                "sort": 2,
                                "answerValue": "Your Question 2 ?",
                                "jumpTo": "End"
                            }
                        ],
                        "columnCBG": [
                            {
                                "uuid": guid(),
                                "sort": 1,
                                "columnText": "Ya"
                            },
                            {
                                "uuid": guid(),
                                "sort": 2,
                                "columnText": "Tidak"
                            }
                        ],
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.shortanswer = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "shortanswer",
                        "formtype": "text",
                        "isDecimal": false,
                        "numOfDecimal": 2,
                        "minLength": 0,
                        "maxLength": 100,
                        "isEditable": true,
                        "required": true,
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.paragraph = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "paragraph",
                        "minLength": 0,
                        "maxLength": 1000,
                        "isEditable": true,
                        "required": true,
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.time = function () {
                return {
                    dataForm: {
                        "uuid": guid(),
                        "question": "Your Question ?",
                        "type": "time",
                        "isEditable": true,
                        "required": true,
                        "answerValue": null
                    }
                }
            };
            managequestionaireServiceFactory.getGuid = guid;
            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
            return managequestionaireServiceFactory;
        }]);
})();