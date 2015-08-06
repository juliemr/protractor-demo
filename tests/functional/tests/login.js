'use strict';

var http = require('http');

var LoginPage = require('../pages/LoginPage.js');
var DesktopPage = require('../pages/DesktopPage.js');

describe('Luceo login page', function () {
    var loginPage;

    beforeEach(function (done) {
        loginPage = new LoginPage();
        loginPage.get().then(done);
    });

    it('should correctly populate the dataLayer object', function () {
        loginPage.getDataLayer().then(function (dataLayer) {
            expect(dataLayer).toBeDefined();
            var obj = dataLayer[0];
            expect(obj["EEOUS"]).toBeTruthy();
            expect(obj["Luceo Server Address"]).toBeDefined();
            expect(obj["OFCCP"]).toBeFalsy();
            //using contains instead of comparison
            //to handle issue that port number shows up in circleci
            expect(obj["SiteId"].indexOf("luceo-ocb-test.dev") > -1).toBeTruthy();
            expect(obj["TalentNetworkFO"]).toBeTruthy();
            expect(obj["VersionOneFO"]).toBeFalsy();
            expect(obj["WordPressFO"]).toBeTruthy();
        });
    });

    it('should show error for user that enters invalid credentials', function () {
        var nextPage;
        loginPage.submitLoginExpectingFailure().then(function(page){
            nextPage = page;
            loginPage.waitElementToBeShown(nextPage.loginButton);
        }).then(function() {
            expect(nextPage.loginErrorText).toBeDefined();
        });
    });

    it('should login user that enters valid credentials', function () {
        var nextPage;
        var desktopPage = new DesktopPage();
        loginPage.submitLoginExpectingSuccess().then(function(page) {
            nextPage = page;
            nextPage.waitElementToBeShown(nextPage.logo);
        }).then(function() {
            expect(desktopPage.isLoaded).toBeTruthy();
            expect(nextPage.arrivedViaLogin).toBeTruthy();
        });
    });

    it('should be correctly populated after logging with sa user', function () {
        var nextPage = loginPage.submitLoginExpectingSuccess().then(function(desktopPage) {
            nextPage = desktopPage;
            nextPage.waitElementToBeShown(nextPage.logo)
        }).then(function(){
            return  nextPage.getDataLayer();
        }).then(function (dataLayer) {
            var obj = dataLayer[0];
            expect(obj).toBeDefined();
            //using contains instead of comparison
            //to handle issue that port number shows up in circleci
            expect(obj["UserId"].indexOf("sa|luceo-ocb-test.dev") > -1).toBeTruthy();
            expect(obj["UserType"]).toBe("Super Administrator");
        });
    });
});
