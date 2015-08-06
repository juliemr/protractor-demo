'use strict';
var LoginPage = require('../pages/LoginPage.js');
var page;

describe('edit candidates tab', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess();
        }).then(function(mainPage) {
            mainPage.waitElementToBeShown(mainPage.logo);
            return mainPage.header.candidatesMenu.newCandidate().getCandidates();
        }).then(function(candidates) {
            page = candidates[0].clickName();
        }).then(function() {
            page.waitElementToBeShown(page.logo);
        });
    });

    it('should have the correct fields present', function () {
        var edit = page.candidateEditTab;
        expect(edit.lastNameForm.isPresent()).toBeTruthy();
        expect(edit.firstNameForm.isPresent()).toBeTruthy();
        expect(edit.jobNameForm.isPresent()).toBeTruthy();
        expect(edit.address1Form.isPresent()).toBeTruthy();
        expect(edit.address2Form.isPresent()).toBeTruthy();
        expect(edit.cityForm.isPresent()).toBeTruthy();
        expect(edit.areaForm.isPresent()).toBeTruthy();
        expect(edit.zipCodeForm.isPresent()).toBeTruthy();
        expect(edit.regionForm.isPresent()).toBeTruthy();
        expect(edit.emailForm.isPresent()).toBeTruthy();
        expect(edit.telephoneForm.isPresent()).toBeTruthy();
        expect(edit.mobilePhoneForm.isPresent()).toBeTruthy();
        expect(edit.save.isPresent()).toBeTruthy();
        expect(edit.back.isPresent()).toBeTruthy();
        expect(edit.trainingsAddBtn.isPresent()).toBeTruthy();
        expect(edit.trainingsDropdown.isPresent()).toBeTruthy();
        expect(edit.licenseYes.isPresent()).toBeTruthy();
        expect(edit.licenseNo.isPresent()).toBeTruthy();
        expect(edit.communicationYes.isPresent()).toBeTruthy();
        expect(edit.communicationNo.isPresent()).toBeTruthy();
    });

    it('should empty a required field and expect an error', function () {
        var edit = page.candidateEditTab;
        edit.clearForm().then(function () {
            edit.submitForm();
        }).then(function(){
            return page.waitElementToBeShown(page.logo)
        }).then(function (){
            expect(edit.error.isPresent()).toBeTruthy();
        });
    });

    it('should submit a edit returning success', function () {
        var edit = page.candidateEditTab;
        var view;
        edit.clearForm().then(function () {
            return edit.fillForm();
        }).then(function () {
            return edit.submitForm();
        }).then(function() {
            return page.waitElementToBeShown(page.logo);
        }).then(function () {
            expect(edit.success.isPresent()).toBeTruthy();
            edit.success.element(by.tagName('strong')).getText().then(function (text) {
                expect(text).toBe("Actions carried out:");
            });
            edit.success.element(by.tagName('li')).getText().then(function (text) {
                expect(text).toBe("Saved");
            });
        }).then(function () {
            return page.clickViewTabElement();
        }).then(function (viewWindow) {
            view = viewWindow;
            return page.waitElementToBeShown(page.logo)
        }).then(function() {
            view.lastNameView.getAttribute('value').then(function (text) {
                expect(text).toBe("Joe");
            });
            view.firstNameView.getAttribute('value').then(function (text) {
                expect(text).toBe("Moe");
            });
            view.jobNameView.getAttribute('value').then(function (text) {
                expect(text).toBe("Intern");
            });
            view.address1View.getAttribute('value').then(function (text) {
                expect(text).toBe("Home");
            });
            view.address2View.getAttribute('value').then(function (text) {
                expect(text).toBe("Home2");
            });
            view.cityView.getAttribute('value').then(function (text) {
                expect(text).toBe("Norcross");
            });
            view.zipCodeView.getAttribute('value').then(function (text) {
                expect(text).toBe("30092");
            });
            view.emailView.getAttribute('value').then(function (text) {
                expect(text).toBe("bob@careerbuilder.com");
            });
            view.telephoneView.getAttribute('value').then(function (text) {
                expect(text).toBe("123456789");
            });
            view.mobilePhoneView.getAttribute('value').then(function (text) {
                expect(text).toBe("987654321");
            });
            view.licenceView.getText().then(function (text) {
                expect(text).toBe("no");
            });
            view.communicationViewNo.getAttribute('checked').then(function (text) {
                expect(text).toBeTruthy();
            });
            view.communicationViewYes.getAttribute('checked').then(function (text) {
                expect(text).toBeFalsy();
            });
            view.trainingsView.getText().then(function (text) {
                expect(text).toBe("You can add in the toolbox!");
            });
        });
    });
});
