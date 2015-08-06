'use strict';
var LoginPage = require('../pages/LoginPage.js');
var requisitionPage;

describe('all requisitions page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess();
        }).then(function(mainPage) {
            mainPage.waitElementToBeShown(mainPage.logo);
            requisitionPage = mainPage.header.requisitionsMenu.allRequisitions();
        }).then(function() {
            requisitionPage.waitElementToBeShown(requisitionPage.logo);
        });
    });

    it('should have the correct fields present', function () {
        expect(requisitionPage.getRequisitions()).toBeDefined();
    });

    it('checks all requisitions page and expects specific values for first req' +
       ', then goes to my requisitions page and checks that first req is different', function () {
        requisitionPage.addConfigurations(['createAwaitingApprovalReq']).then(function() {
            return requisitionPage.waitElementToBeShown(requisitionPage.allButton);
        }).then(function() {
            return requisitionPage.goToAll();
        }).then(function(requisitionsPageWithAllFilter) {
            requisitionPage.waitElementToBeShown(requisitionPage.allButton);
            return requisitionsPageWithAllFilter.getRequisitions();
        }).then(function (requisitions) {
            expect(requisitions[0].id.getText()).toBe('000076');
            expect(requisitions[0].title.getText()).toBe('test title ');
            expect(requisitions[0].date.getText()).toBeDefined();
            expect(requisitions[0].status.getText()).toBe('Awaiting approval');
            expect(requisitions[0].shortcuts.quickviewButton.isPresent()).toBeTruthy();
            expect(requisitions[0].shortcuts.noteButton.isPresent()).toBeTruthy();
            expect(requisitions[0].shortcuts.sumUp.isPresent()).toBeTruthy();
        }).then(function() {
            return requisitionPage.header.requisitionsMenu;
        }).then(function(menu) {
            return menu.myRequisitions();
        }).then(function(myRequisitionPage) {
            myRequisitionPage.waitElementToBeShown(requisitionPage.allButton);
            return myRequisitionPage.goToAll();
        }).then(function(MyRequisitionsPageWithAllFilter) {
            return MyRequisitionsPageWithAllFilter.getRequisitions();
        }).then(function(requisitions) {
            expect(requisitions[0].id.getText()).toBe('000237');
            expect(requisitions[0].title.getText()).toBe('TESTTESTDONOTAPPLYTEST ');
            expect(requisitions[0].date.getText()).toBeDefined();
            expect(requisitions[0].area.getText()).toBe('Alabama');
            expect(requisitions[0].recruiter.getText()).toBe('Administrator Luceo');
            expect(requisitions[0].geographicDepartment.getText()).toBe('Birmingham');
            expect(requisitions[0].status.getText()).toBe('Validated');
            expect(requisitions[0].shortcuts.quickviewButton.isPresent()).toBeTruthy();
            expect(requisitions[0].shortcuts.noteButton.isPresent()).toBeTruthy();
            expect(requisitions[0].shortcuts.sumUp.isPresent()).toBeTruthy();
        });
    });

    it('should create quickviews correctly', function () {
        requisitionPage.getRequisitions().then(function (requisitions) {
            var quickviewObj = requisitions[0].shortcuts.quickviewButton.open();
            var until = protractor.ExpectedConditions;
            browser.wait(until.presenceOf(requisitions[0].shortcuts.quickviewWindow), 5000, 'Page took too long to load after submit')
                .then(function () {
                    expect(quickviewObj).toBeDefined();
                    expect(quickviewObj.window.isPresent()).toBeTruthy();
                    expect(quickviewObj.details.isPresent()).toBeTruthy();
                    expect(quickviewObj.actions.isPresent()).toBeTruthy();
                    expect(quickviewObj.sumUp.isPresent()).toBeTruthy();
                    expect(quickviewObj.assignedCandidates.isPresent()).toBeTruthy();
                    expect(quickviewObj.edit.isPresent()).toBeTruthy();
                    expect(quickviewObj.attachment.isPresent()).toBeTruthy();
                    expect(quickviewObj.history.isPresent()).toBeTruthy();
                    expect(quickviewObj.screeningQuestionTemplates.isPresent()).toBeTruthy();
                });
        });
    });

    it('should create notes correctly', function () {
        requisitionPage.getRequisitions().then(function (requisitions) {
            var noteObj = requisitions[0].shortcuts.noteButton.open();
            var until = protractor.ExpectedConditions;
            browser.wait(until.presenceOf(requisitions[0].shortcuts.noteWindow),
                5000, 'Page took too long to load after submit')
                .then(function () {
                    expect(noteObj.input.isPresent()).toBeTruthy();
                    expect(noteObj.submit.isPresent()).toBeTruthy();
                    expect(noteObj.cancel.isPresent()).toBeTruthy();
                });
        });
    });
});
