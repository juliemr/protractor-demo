'use strict';
var LoginPage = require('../pages/LoginPage.js');
var page;

describe('loads reporting page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess();
        }).then(function(desktopPage) {
            desktopPage.waitElementToBeShown(desktopPage.logo);
            page = desktopPage.header.reportsMenu.reporting();
        }).then(function() {
            page.waitElementToBeShown(page.logo);
        });
    });

    it('should have the correct fields present', function () {
        expect(page.reportDropdown.isPresent()).toBeTruthy();
    });
});
