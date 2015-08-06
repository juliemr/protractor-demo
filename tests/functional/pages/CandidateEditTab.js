'use strict';

module.exports = function () {
    var CandidateEditTab = Object.create({}, {
        lastNameForm: {
            value: element(by.id('vw1txtNom'))
        },
        firstNameForm: {
            value: element(by.id('vw1txtPrenom'))
        },
        jobNameForm: {
            value: element(by.id('vw1txtNomPatronymique'))
        },
        address1Form: {
            value: element(by.id('vw1txtAdresse1'))
        },
        address2Form: {
            value: element(by.id('vw1txtAdresse2'))
        },
        cityForm: {
            value: element(by.id('vw1txtVille'))
        },
        areaForm: {
            value: element(by.id('vw1lstRegionGeoActu'))
        },
        zipCodeForm: {
            value: element(by.id('vw1txtCodePostal'))
        },
        regionForm: {
            value: element(by.id('vw1lstPays'))
        },
        emailForm: {
            value: element(by.id('vw1txtMail'))
        },
        telephoneForm: {
            value: element(by.id('vw1txtTelFixe'))
        },
        mobilePhoneForm: {
            value: element(by.id('vw1txtTelPortable'))
        },
        save: {
            value: element(by.id('vw1btnEnregistrer'))
        },
        back: {
            value: element(by.id('vw1btnAnnuler'))
        },
        error: {
            value: element(by.css('.alert-error'))
        },
        success: {
            value: element(by.css('.alert-success'))
        },
        trainingsAddBtn: {
            value: element(by.id('ajaxvw1lstFormationComplementaire')).element(by.css('.action-add'))
        },
        trainingsDropdown: {
            value: element(by.id('ajaxvw1lstFormationComplementaire')).element(by.css('.wsel_sel'))
        },
        licenseYes: {
            value: element(by.id('vw1radPermisConduire:1'))
        },
        licenseNo: {
            value: element(by.id('vw1radPermisConduire:0'))
        },
        communicationYes: {
            value: element(by.id('vw1optEnvoyerDossier:1'))
        },
        communicationNo: {
            value: element(by.id('vw1optEnvoyerDossier:0'))
        },
        submitForm: {
            value: function () {
                return this.save.click().then(function() {
                    return CandidateEditTab;
                });
            }
        },
        clearForm: {
            value: function () {
                this.lastNameForm.clear();
                this.firstNameForm.clear();
                this.jobNameForm.clear();
                this.address1Form.clear();
                this.address2Form.clear();
                this.cityForm.clear();
                this.zipCodeForm.clear();
                this.emailForm.clear();
                this.telephoneForm.clear();
                return this.mobilePhoneForm.clear();
            }
        },
        fillForm: {
            value: function () {
                var page = this;
                var dropdown = this.trainingsDropdown.element(by.tagName('select'));
                return this.trainingsAddBtn.click().then(function () {
                    var until = protractor.ExpectedConditions;
                    //call .element on dropdown even though multiple elements exist
                    //to avoid indexoutofbounds error
                    browser.wait(until.presenceOf(dropdown.element(
                            by.tagName('option'))), 5000,
                        'Element taking too long to appear in the DOM').then(function () {
                            dropdown.click();
                        }
                    );
                }).then(function() {
                    page.lastNameForm.sendKeys('Joe');
                    page.firstNameForm.sendKeys('Moe');
                    page.jobNameForm.sendKeys('Intern');
                    page.address1Form.sendKeys('Home');
                    page.address2Form.sendKeys('Home2');
                    page.cityForm.sendKeys('Norcross');
                    page.selectDropdown(page.areaForm);
                    page.zipCodeForm.sendKeys('30092');
                    page.selectDropdown(page.regionForm);
                    page.emailForm.sendKeys('bob@careerbuilder.com');
                    page.telephoneForm.sendKeys('123456789');
                    page.mobilePhoneForm.sendKeys('987654321');
                    page.licenseNo.click();
                    page.communicationNo.click();
                });
            }
        },
        selectDropdown: {
            value: function (element) {
                element.click();
                element.all(by.tagName('option')).get(1).click();
            }
        }
    });
    return CandidateEditTab;
};
