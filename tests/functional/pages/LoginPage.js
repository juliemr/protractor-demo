'use strict';

module.exports = function () {
    var Page = require('./Page.js');
    var DesktopPage = require('./DesktopPage.js');

    var LoginPage = Object.create(new Page(), {
        usernameInput: {value: element(by.id('txtLogin'))},
        passwordInput: {value: element(by.id('txtPwd'))},
        loginButton: {value: element(by.id('btnOK'))},
        loginErrorText: {
            get: function () {
                return element(by.css('.alert-error')).getText();
            }
        },
        typeUsername: {
            value: function (keys) {
                return this.usernameInput.sendKeys(keys);
            }
        },
        typePassword: {
            value: function (keys) {
                return this.passwordInput.sendKeys(keys);
            }
        },
        submitLogin: {
            value: function () {
                return this.loginButton.click();
            }
        },
        loginAs: {
            value: function (username, pwd) {
                var page = this;
                return this.typeUsername(username).then(function() {
                    return page.typePassword(pwd);
                }).then(function() {
                    return page.submitLogin();
                });
            }
        },
        submitLoginExpectingFailure: {
            value: function () {
                return this.loginAs('sa', 'invalidPassword').then(function(){
                    return LoginPage;
                });
            }
        },
        submitLoginExpectingSuccess: {
            value: function () {
                return this.loginAs('sa', 'func-test').then(function() {
                    return new DesktopPage();
                });
            }
        }
    });

    LoginPage.pageUrl = 'login';

    return LoginPage;
};
