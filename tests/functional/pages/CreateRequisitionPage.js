'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var DesktopPage = require('./DesktopPage.js');
    var JobPostingPage = require('./JobPostingPage.js')

    var CreateRequisition = Object.create(new DefaultLayoutPage(), {
            //WEB ELEMENTS
            viewPostingListBtn: {
                value: element(by.css('.a_d')).all(by.css('.btn')).get(2)
            },
            clickViewPostingListBtn: {
                value: function() {
                    return this.viewPostingListBtn.click().then(function() {
                        return new JobPostingPage();
                    });
                }
            },
            //manager field information
            manager: {
                value: element(by.css('#vw1lstContact_div .tbl_l-bit-editable-input'))
            },
            //recruiter field information
            recruiter: {
                value: element(by.id('ajaxvw1lstUtilisateur'))
            },
            recruiterClear: {
                value: element(by.id('ajaxvw1lstUtilisateur')).element(by.css('.action-close'))
            },
            recruiterAdd: {
                value: element(by.id('ajaxvw1lstUtilisateur')).element(by.css('.action-add'))
            },
            recruiterAvailable: {
                value: element(by.id('ajaxvw1lstUtilisateur')).
                    element(by.css('.wsel_sel')).
                    all(by.tagName('option'))
            },
            //employment type field information
            employmentType: {
                value: element(by.id('ajaxvw1lstTypeContrat'))
            },
            //driver license field information
            driversLicence: {
                value: element(by.id('ajaxvw1lstEditable9'))
            },
            //job Category field information - Department
            jobCategory: {
                value: element(by.id('ajaxvw1lstFiliere'))
            },
            //position infromation
            position: {
                value: element(by.id('ajaxvw1lstMetier'))
            },
            //position category - like what type of job it is, salesman, technicians etc.
            categories: {
                value: element(by.id('ajaxvw1lstCategorie'))
            },
            //matching position field information
            matchingPosition: {
                value: element(by.id('ajaxvw1lstMetier1'))
            },
            matchingPositionClear: {
                value: element(by.id('ajaxvw1lstMetier1')).element(by.css('.action-close'))
            },
            matchingPositionAdd: {
                value: element(by.id('ajaxvw1lstMetier1')).element(by.css('.action-add'))
            },
            //region/country field information
            region: {
                value: element(by.id('ajaxvw1lstPays'))
            },
            //area/state field information
            area: {
                value: element(by.id('ajaxvw1lstRegion'))
            },
            //departmentGeo/city field information
            geographicDepartment: {
                value: element(by.id('vw1lstDepartementGeo'))
            },
            //agency/zipcode field information
            agency: {
                value: element(by.id('ajaxvw1lstAgence'))
            },
            //posting location information
            postingLocation: {
                value: element(by.id('vw1txtLocation'))
            },
            //requisitionId field information
            requisitionId: {
                value: element(by.id('vw1txtReference'))
            },
            //title field information
            title: {
                value: element(by.id('vw1txtIntitule'))
            },
            //number of positions field
            numberOfPositions: {
                value: element(by.id('vw1txtNbPoste'))
            },
            //category code field information
            categoryCode: {
                value: element(by.id('ajaxvw1txtCbnCategory'))
            },
            categoryCodeClear: {
                value: element(by.id('ajaxvw1txtCbnCategory')).element(by.css('.action-close'))
            },
            categoryCodeAdd: {
                value: element(by.id('ajaxvw1txtCbnCategory')).element(by.css('.action-add'))
            },
            getCategoryByCode: {
                value: function(id) {
                    return element(by.id('vw1txtCbnCategory#'+id))
                }
            },
            //start date field information
            startDate: {
                value: element(by.css('#vw1dtDateDebut + input'))
            },
            //end date field information
            endDate: {
                value: element(by.css('#vw1dtDateFin + input'))
            },
            //context field information - note that it is a frame for tinymce
            context: {
                value: element(by.id('vw1txtContexte_ifr'))
            },
            contextText: {
                value: element(by.id('vw1txtContexte_en'))
            },
            //job description field information
            jobDescription: {
                value: element(by.id('vw1txtMission_ifr'))
            },
            jobDescriptionText: {
                value: element(by.id('vw1txtMission_en'))
            },
            //negotiated salary field information
            negotiatedSalary: {
                value: element(by.id('vw1txtSalaireNegocie'))
            },
            //coefficient/grade field information
            grade: {
                value: element(by.id('vw1txtCoefficient'))
            },
            ok: {
                value: element(by.id('vw1btnSave'))
            },
            back: {
                value: element(by.id('vw1btnRetour'))
            },
            error: {
                value: element(by.css('.alert-error'))
            },

            // FUNCTIONS
            // This setManager is not as simple as it sounds. It types name, then wait for auto-completion then
            // pick option
            setManager: {
                value: function (name, option) {
                    var page = this;
                    return this.manager.sendKeys(name).then(function() {
                        page.waitElementToBeShown(element(by.css('.tbl_l-autocomplete-result')));
                        return element(by.css('.tbl_l-autocomplete-results')).
                            getWebElement().findElements(by.tagName('li'));
                    }).then (function(options) {
                        return options[option].click();
                    });
                }
            },

            clearRecruiter: {
                value: function () {
                    return this.recruiterClear.click();
                }
            },
            addRecruiter: {
                value: function (option) {
                    var page = this;
                    return this.recruiterAdd.click().then(function() {
                        return page.recruiter.getWebElement().findElements(by.tagName('option'));
                    }).then (function(options) {
                        return options[option].click();
                    });
                }
            },
            clearMatchingPosition: {
                value: function() {
                    return this.matchingPositionClear.click();
                }
            },
            addMatchingPosition: {
                value: function(option) {
                    var page = this;
                    return this.matchingPositionAdd.click().then(function() {
                        return page.waitElementToBeShown(element(by.css('#ajaxvw1lstMetier1 option')))
                    }).then(function() {
                        return page.matchingPosition.getWebElement().findElements(by.tagName('option'));
                    }).then (function(options) {
                        options[option].getText().then(function(test){
                            console.error(test);
                        })
                        return options[option].click();
                    });
                }
            },
            addCategoryCode: {
                value: function(option) {
                    var page = this;
                    var selectOption = function(theOption) {
                        return page.categoryCode.getWebElement().findElements(by.tagName('option')).
                            then(function(options) {
                                return options[theOption].click();
                            });
                    };
                    return this.categoryCodeAdd.click().then(function() {
                        return page.waitElementToBeShown(element(by.css('#ajaxvw1txtCbnCategory option:nth-child(1)')));
                    }).then(function() {
                        return selectOption(option[0]);
                    }).then(function() {
                        return selectOption(option[1]);
                    }).then(function()  {
                        return selectOption(option[2]);
                    });
                }
            },
            writeToContext: {
                value: function(text) {
                    var frame = this.context.getWebElement();
                    return browser.switchTo().frame(frame).then(function() {
                        return element(by.id('tinymce')).clear()
                    }).then(function() {
                        return element(by.id('tinymce')).sendKeys(text);
                    }).then(function() {
                        return browser.switchTo().defaultContent();
                    });

                }
            },
            writeToJobDescription: {
                value: function(text) {
                    var frame = this.jobDescription.getWebElement();
                    return browser.switchTo().frame(frame).then(function() {
                        return element(by.id('tinymce')).clear()
                    }).then(function() {
                        return element(by.id('tinymce')).sendKeys(text);
                    }).then(function() {
                        return browser.switchTo().defaultContent();
                    });
                }
            },
            write: {
                value: function(field, text) {
                    var page = this;
                    var helper = function(field, text) {
                        return field.clear().then(function() {
                            field.sendKeys(text);
                        })
                    };
                    switch (field) {
                        case 'title':
                            return helper(this.title, text);
                        case 'numberOfPositions':
                            return helper(this.numberOfPositions, text);
                        case 'postingLocation':
                            return browser.sleep(1000).then(function() {
                                return helper(page.postingLocation, text);
                            });
                        case 'startDate':
                            return helper(this.startDate, text);
                        case 'endDate':
                            return helper(this.endDate, text);
                        case 'negotiatedSalary':
                            return helper(this.negotiatedSalary, text)
                        case 'grade':
                            return helper(this.grade, text);
                    }
                }
            },
            select: {
                value: function(field, option) {
                    var page = this;
                    var helper = function(field, option) {
                        return field.getWebElement().findElements(by.tagName('option')).then(function(options) {
                            return options[option].click();
                        })
                    };
                    switch (field) {
                        case 'employmentType':
                            return helper(this.employmentType, option);
                        case 'driversLicense':
                            return helper(this.driversLicence, option);
                        case 'jobCategory':
                            return helper(this.jobCategory, option);
                        case 'position' :
                            return helper(this.position, option);
                        case 'categories':
                            return helper(this.categories, option);
                        case 'region':
                            return helper(this.region, option);
                        case 'area':
                            return helper(this.area, option).then(function() {
                                page.waitElementToBeShown(element(by.
                                    css('#vw1lstDepartementGeo option:nth-child(2)')));
                            });
                        case 'geographicDepartment':
                            return helper(page.geographicDepartment, option).then(function() {
                                page.waitElementToBeShown(element(by.
                                    css('#vw1lstAgence option:nth-child(2)')));
                            });
                        case 'agency':
                            return helper(this.agency, option);
                    }

                }
            },
            submit: {
                value: function () {
                    return this.ok.click().then(function() {
                        return CreateRequisition;
                    });
                }
            },
            arrivedViaSubmit: {
                get: function () {
                    return browser.getCurrentUrl().then(function (url) {
                        return url.indexOf('reqSuccess') > 0;
                    });
                }
            },
            return: {
                value: function () {
                    this.back.click();
                    return new DesktopPage();
                }
            }
        }
    );

    CreateRequisition.pageUrl = 'poste/dossier?tab=form&new=true&readonly=0';
    return CreateRequisition;
}
;
