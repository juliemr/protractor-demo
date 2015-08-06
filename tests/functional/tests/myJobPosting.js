'use strict';
var LoginPage = require('../pages/LoginPage.js');
var page;
var mainPage;

describe('my job posting page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        var desktopPage;
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess()
        }).then(function(nextPage) {
            desktopPage = nextPage;
            return desktopPage.waitElementToBeShown(desktopPage.logo);
        }).then(function() {
            return desktopPage.header.requisitionsMenu.jobPostings();
        }).then(function(nextPage) {
            page = nextPage;
            page.waitElementToBeShown(page.logo);
        });
    });

    it('should have different fields from job posting page', function() {
        page.addConfigurations(['createJobPostingsNotOwnedBySA']).then(function() {
            return browser.refresh();
        }).then(function() {
            var jobPostingTable = page.jobPostingTable;
            page.waitElementToBeShown(jobPostingTable.table);
            return jobPostingTable.getJobPostings();
        }).then(function (jobPostings) {
            expect(jobPostings[0]).toBeDefined();
            jobPostings[0].postingReferenceText().then(function(text) {
                expect(text).toBe('000012/4 - Test Requisition');
            });
            expect(jobPostings[1]).toBeDefined();
            jobPostings[1].postingReferenceText().then(function(text) {
                expect(text.indexOf('for job posting') > -1).toBeTruthy();
            });
            return jobPostings[1].clickPostingReference();
        }).then(function (newPage) {
            page = newPage;
            return page.waitElementToBeShown(page.updateCareerSiteBtn);
        }).then(function () {
            return expect(page.updateCareerSiteBtn.isDisplayed()).toBeTruthy();
        }).then(function() {
            var menu = page.header.requisitionsMenu;
            return page.waitElementToBeShown(menu).then(function() {
                return menu.myJobPostings();
            });
        }).then(function(myJobPage) {
            page = myJobPage;
            var jobPostingTable = page.jobPostingTable;
            return page.waitElementToBeShown(jobPostingTable.table).then(function() {
                return jobPostingTable.getJobPostings();
            })
        }).then(function (jobPostings) {
            expect(jobPostings.length).toBe(1);
            return jobPostings[0].clickPostingReference();
        }).then(function (newPage) {
            page = newPage;
            return page.waitElementToBeShown(page.updateCareerSiteBtn);
        }).then(function () {
            return expect(page.updateCareerSiteBtn.isDisplayed()).toBeTruthy();
        });
    });
});
