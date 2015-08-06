'use strict';
var LoginPage = require('../pages/LoginPage.js');
var page = new require('../pages/DefaultLayoutPage')();

describe('candidate search page', function () {
    beforeEach(function (done) {
        var loginPage = new LoginPage();
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess();
        }).then(function(mainPage) {
            page.waitElementToBeShown(page.logo);
            page = mainPage.header.candidatesMenu.search();
        });
        done();
    });

    it('should have the correct fields present', function () {
        page.waitElementToBeShown(page.keywordInput).then(function() {
            expect(page.keywordInput.isPresent()).toBeTruthy();
            expect(page.BasicSearchButton.isPresent()).toBeTruthy();
        });
    });

    it('should show correct results on a search returning two results', function () {
        page.waitElementToBeShown(page.keywordInput).then(function() {
            return page.addConfigurations(['enableCandidateSearch']);
        }).then(function() {
            return page.typeKeyword('test');
        }).then(function() {
            return page.clickBasicSearch();
        }).then(function(newPage) {
            page = newPage;
            return page.waitElementToBeShown(page.candidatesTable);
        }).then(function() {
            return page.getCandidates();
        }).then(function(candidates) {
            expect(candidates.length).toBe(2);
            expect(candidates[0]).toBeDefined();
            expect(candidates[0].date.getText()).toBe("05/13/2014");
            expect(candidates[0].nameText.getText()).toBe("Vincent David");
            expect(candidates[1]).toBeDefined();
            expect(candidates[1].nameText.getText()).toBe("Smith Elisabeth");
            expect(candidates[1].date.getText()).toBe("12/18/2013");
        });
    });
});

