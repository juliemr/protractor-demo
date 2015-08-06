'use strict';
var LoginPage = require('../pages/LoginPage.js');
var currentPage;

describe('requisition search page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get().then(function () {
            var mainPage = loginPage.submitLoginExpectingSuccess();
            currentPage = mainPage.header.requisitionsMenu.search();
        });
    });

    it('should return correct search results', function () {
        currentPage.waitElementToBeShown(currentPage.titleInput).then(function() {
            return currentPage.titleInput.sendKeys('Test Requisition');
        }).then(function() {
            return currentPage.submitForm();
        }).then(function(resultsPage) {
            currentPage = resultsPage;
        }).then(function() {
            currentPage.waitElementToBeShown(currentPage.requisitionsTable.table);
            return currentPage.getRequisitions();
        }).then(function(requisitions) {
            expect(requisitions[0].id.getText()).toBe('000012');
            expect(requisitions[0].title.getText()).toBe('Test Requisition ');
            expect(requisitions[0].date.getText()).toBe('01/20/2014');
            expect(requisitions[0].geographicDepartment.getText()).toBe('Bettles');
            expect(requisitions[0].numberOfCandidates.getText()).toBe('');
            expect(requisitions[0].status.getText()).toBe('Open');
            expect(requisitions[0].shortcuts.quickviewButton.isPresent()).toBeTruthy();
            expect(requisitions[0].shortcuts.noteButton.isPresent()).toBeTruthy();
            expect(requisitions[0].shortcuts.sumUp.isPresent()).toBeTruthy();
        }).then(function() {
            return currentPage.clickSearchBreadcrumb();
        }).then(function(searchPage) {
            currentPage = searchPage;
        }).then(function() {
            currentPage.waitElementToBeShown(currentPage.titleInput);
            return currentPage.fillFormForTitleCountryManagerSearch();
        }).then(function() {
            return currentPage.submitForm();
        }).then(function(resultsPage) {
            resultsPage.waitElementToBeShown(resultsPage.requisitionsTable.table);
            return resultsPage.getRequisitions();
        }).then(function(requisitions) {
            expect(requisitions[0].id.getText()).toBe('000237');
            expect(requisitions[0].title.getText()).toBe('TESTTESTDONOTAPPLYTEST ');
            expect(requisitions[0].date.getText()).toBeDefined();
            expect(requisitions[0].geographicDepartment.getText()).toBe('Birmingham');
            expect(requisitions[0].numberOfCandidates.getText()).toBe('');
            expect(requisitions[0].status.getText()).toBe('Validated');
            expect(requisitions[0].shortcuts.quickviewButton.isPresent()).toBeTruthy();
            expect(requisitions[0].shortcuts.noteButton.isPresent()).toBeTruthy();
            expect(requisitions[0].shortcuts.sumUp.isPresent()).toBeTruthy();
        });
    });
});
