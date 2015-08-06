'use strict';
var LoginPage = require('../pages/LoginPage.js');
var page;

describe('header', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get();
        loginPage.submitLoginExpectingSuccess().then(function(newPage){
            page = newPage;
        }).then(function() {
            page.waitElementToBeShown(page.logo);
        });
    });

    it('should show correct tabs and links', function () {
        expect(page.header.requisitionsTab.isPresent()).toBeTruthy();
        expect(page.header.candidatesTab.isPresent()).toBeTruthy();
        expect(page.header.importCandidatesTab.isPresent()).toBeTruthy();
        expect(page.header.communicationsTab.isPresent()).toBeTruthy();
        expect(page.header.reportsTab.isPresent()).toBeTruthy();
        expect(page.header.toolbox.get(0).isPresent()).toBeTruthy();
        expect(page.header.administration.get(0).isPresent()).toBeTruthy();
    });

    it('should redirect to login page on logout', function () {
        var newPage = page.header.logout();
        expect(newPage).toBeDefined();
    });

    it('should redirect to My Account Page on clicking MyAccount', function () {
        expect(page.header.myAccount()).toBeDefined();
    });

    it('should have correct requisitions dropdown', function () {
        var createReqPage;
        page.header.requisitionsMenu.createRequisition().then(function(newPage) {
            createReqPage = newPage;
            page.waitElementToBeShown(page.logo);
        }).then(function() {
            expect(createReqPage).toBeDefined();
            expect(createReqPage.isLoaded).toBeTruthy();
        });
    });
});
