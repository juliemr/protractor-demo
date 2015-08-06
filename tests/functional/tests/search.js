'use strict';
var LoginPage = require('../pages/LoginPage.js');
var page;

describe('search', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        var desktopPage;
        loginPage.get();
        loginPage.submitLoginExpectingSuccess().then(function(nextPage) {
            desktopPage = nextPage;
            desktopPage.waitElementToBeShown(desktopPage.logo);
        }).then(function() {
            return desktopPage.header.accountLink.go();
        }).then(function(nextPage) {
            page = nextPage;
            page.waitElementToBeShown(page.logo);
        });
    });

    it('should have a search box and correct fields', function () {
        expect(page.search).toBeDefined();
        expect(page.search.keywords.isPresent()).toBeTruthy();
        expect(page.search.location.isPresent()).toBeTruthy();
        expect(page.search.distance.isPresent()).toBeTruthy();
        expect(page.search.searchButton.isPresent()).toBeTruthy();
    });

    it('should search for a value and go to a new page', function () {
        var newPage = page.search.search('testSearch');
        expect(newPage).toBeNull();
    });
});
