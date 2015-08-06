'use strict';
var MyAccount = require('../pages/MyAccountPage.js');
var LoginPage = require('../pages/LoginPage.js');
var page;

describe('user details page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get();
        var desktopPage;
        loginPage.submitLoginExpectingSuccess().then(function(nextPage){
            desktopPage = nextPage;
            desktopPage.waitElementToBeShown(desktopPage.logo);
        }).then(function() {
            return desktopPage.header.accountLink.go();
        }).then(function(nextPage) {
            page = nextPage;
            page.waitElementToBeShown(page.logo);
        });
    });

    it('should show correct account info', function () {
        expect(page.firstName.getAttribute('value')).toEqual('Administrator');
        expect(page.lastName.getAttribute('value')).toEqual('LUCEO');
        expect(page.email.getAttribute('value')).toEqual('noreply@luceosolutions.com');
    });

    it('should have the correct fields present', function () {
        expect(page.emailSignature.isPresent()).toBeTruthy();
        expect(page.trigram.isPresent()).toBeTruthy();
        expect(page.firstName.isPresent()).toBeTruthy();
        expect(page.lastName.isPresent()).toBeTruthy();
        expect(page.telephone.isPresent()).toBeTruthy();
        expect(page.email.isPresent()).toBeTruthy();
        expect(page.login.isPresent()).toBeTruthy();
        expect(page.area.isPresent()).toBeTruthy();
    });
});
