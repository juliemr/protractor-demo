'use strict';
var LoginPage = require('../pages/LoginPage.js');
var currentPage;

describe('job posting page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess();
        }).then(function(mainPage) {
            currentPage = mainPage.header.requisitionsMenu.allRequisitions();
        });
    });

    it('should show appropriate response from valid job posting mock', function () {
        currentPage.waitElementToBeShown(currentPage.openButton).then(function() {
            return currentPage.addConfigurations(['enableJobPosting']);
        }).then(function() {
            return currentPage.getRequisitions();
        }).then(function(reqs) {
            return reqs[0].clickTitle();
        }).then(function(createRequisitionPage) {
            currentPage = createRequisitionPage;
            return currentPage.waitElementToBeShown(currentPage.viewPostingListBtn);
        }).then(function() {
            return currentPage.clickViewPostingListBtn();
        }).then(function(jobPostingPage) {
            currentPage = jobPostingPage;
        }).then(function() {
            return currentPage.waitElementToBeShown(currentPage.newLink);
        }).then(function() {
            return currentPage.goToNewJobPosting();
        }).then(function(createJobPostingPage) {
            currentPage = createJobPostingPage;
            return currentPage.waitElementToBeShown(currentPage.postBtn);
        }).then(function() {
            return currentPage.postBtn.click();
        }).then(function() {
            return currentPage.waitElementToBeShown(currentPage.postBtn);
        }).then(function() {
            currentPage.waitElementToBeShown(currentPage.success);
            expect(currentPage.success.isDisplayed()).toBeTruthy();
        }).then(function() {
            return currentPage.goToPostingList();
        }).then(function(jobPostingPage) {
            currentPage = jobPostingPage;
        }).then(function() {
            return currentPage.jobPostingTable;
        }).then(function(jobPostingTable) {
            currentPage.waitElementToBeShown(jobPostingTable.table);
            return jobPostingTable.getJobPostings();
        }).then(function(jobPostings) {
            jobPostings[0].postingReferenceText().then(function(text) {
                expect(text.indexOf('Test Requisition - Bettles') > -1).toBeTruthy();
            });
            jobPostings[0].statusText().then(function(text) {
                expect(text).toBe('Posted');
            });
        });
    });
});

