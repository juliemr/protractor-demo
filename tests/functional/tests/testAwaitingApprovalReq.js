'use strict';
var LoginPage = require('../pages/LoginPage.js');
var page;

describe('awaiting approval requisitions page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        var desktopPage;
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess();
        }).then(function(nextPage) {
            desktopPage = nextPage;
            desktopPage.waitElementToBeShown(desktopPage.logo);
        }).then(function() {
            return desktopPage.header.requisitionsMenu.allRequisitions();
        }).then(function(nextPage) {
            page = nextPage;
            page.waitElementToBeShown(page.logo);
        });
    });
    it('should have a working awaiting approval requisition', function () {
        var until = protractor.ExpectedConditions;
        var requisitions;
        page.addConfigurations(['createAwaitingApprovalReq']).then(function() {
            return page.waitElementToBeShown(page.awaitingApprovalButton);
        }).then(function() {
            return page.goToAwaitingApproval();
        }).then(function(nextPage) {
            page = nextPage;
            page.waitElementToBeShown(page.logo);
        }).then(function() {
            return page.getRequisitions();
        }).then(function(reqs) {
            requisitions = reqs;
            return page.waitElementToBeShown(requisitions[0].emailHistoryHoverButton);
        }).then(function () {
            return browser.actions().mouseMove(requisitions[0].emailHistoryHoverButton).perform();
        }).then(function() {
            return page.waitElementToBeShown(requisitions[0].emailHistoryWindowTitle);
        }).then(function() {
            expect(requisitions[0].emailHistoryWindowTitle.isDisplayed()).toBeTruthy();
        }).then(function() {
            return requisitions[0].clickTitle();
        }).then(function(createReqPage) {
            browser.wait(until.presenceOf(createReqPage.manager), 15000,
                'Create req page took too long to load').then(function() {
                    createReqPage.requisitionId.getAttribute('value').then(function(text) {
                       expect(text).toBe('000076');
                    });
                    createReqPage.title.getAttribute('value').then(function(text) {
                        expect(text).toBe('test title');
                    });
                    createReqPage.numberOfPositions.getAttribute('value').then(function(text) {
                        expect(text).toBe('1');
                    });
                    createReqPage.contextText.getAttribute('value').then(function(text) {
                        expect(text).toBe('test context');
                    });
                    createReqPage.jobDescriptionText.getAttribute('value').then(function(text) {
                        expect(text).toBe('test mission');
                    });
                    expect(createReqPage.getCategoryByCode('JN001').isPresent()).toBeTruthy();
                    expect(createReqPage.getCategoryByCode('JN002').isPresent()).toBeTruthy();
                    expect(createReqPage.getCategoryByCode('JN038').isPresent()).toBeTruthy();
                });
        });
    });
});
