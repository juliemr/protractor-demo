'use strict';

module.exports = function () {
    var MyAccount = require('./MyAccountPage.js');
    var LoginPage = require('./LoginPage.js');
    var CreateRequisitionPage = require('./CreateRequisitionPage.js');
    var AllRequisitionsPage = require('./AllRequisitionsPage.js');
    var ReportingPage = require('./ReportingPage.js');
    var RequisitionSearchPage = require('./RequisitionSearchPage.js');
    var CandidateSearchPage = require('./CandidateSearchPage.js');
    var NewCandidatesPage = require('./NewCandidatesPage.js');
    var JobPostingPage = require('./JobPostingPage.js');

    var header = element(by.id('header'));

    return Object.create({}, {
        myCart: {
            value: function () {
                header.element(by.css('.actions')).all(by.tagName('a')).get(0).click();
                return null; //TODO return correct page
            }
        },
        logout: {
            value: function () {
                header.element(by.css('.actions')).all(by.tagName('a')).get(1).click();
                return new LoginPage();
            }
        },
        myAccount: {
            value: function () {
                header.element(by.css('.actions')).all(by.tagName('a')).get(2).click();
                return new MyAccount();
            }
        },
        accountLink: {
            get: function () {
                var accountLink = header.element(by.css('.actions')).all(by.tagName('a')).get(2);
                accountLink.go = function () {
                    return accountLink.click().then(function() {
                        return new MyAccount();
                    });
                };
                return accountLink;
            }
        },
        header: {
            value: header
        },
        requisitionsTab: {
            value: header.element(by.css('.poste'))
        },
        requisitionsMenu: {
            get: function () {
                var menu = this.requisitionsTab.element(by.tagName('ul'));
                browser.actions().mouseMove(this.requisitionsTab).perform();
                menu.createRequisition = function () {
                    return menu.all(by.tagName('li')).get(0).element(by.tagName('a')).click().then(function() {
                        return new CreateRequisitionPage();
                    });
                };
                menu.allRequisitions = function () {
                    menu.all(by.tagName('li')).get(1).element(by.tagName('a')).click();
                    return new AllRequisitionsPage();
                };
                menu.myRequisitions = function () {
                    menu.all(by.tagName('li')).get(2).element(by.tagName('a')).click()
                    return new AllRequisitionsPage();
                };
                menu.jobPostings = function () {
                    return menu.all(by.tagName('li')).get(3).element(by.tagName('a')).click().then(function() {
                        return new JobPostingPage();
                    });
                };
                menu.myJobPostings = function () {
                    menu.all(by.tagName('li')).get(4).element(by.tagName('a')).click();
                    return new JobPostingPage();
                };
                menu.search = function () {
                    menu.all(by.tagName('li')).get(5).element(by.tagName('a')).click();
                    return new RequisitionSearchPage();//TODO return an actual page here.
                };
                return menu;
            }
        },
        candidatesTab: {
            value: header.element(by.css('.candidat'))
        },
        candidatesMenu: {
            get: function () {
                var menu = this.candidatesTab.element(by.tagName('ul'));
                browser.actions().mouseMove(this.candidatesTab).perform();
                menu.newCandidate = function () {
                    menu.all(by.tagName('li')).get(0).element(by.tagName('a')).click();
                    return new NewCandidatesPage();
                };
                menu.inProgress = function () {
                    menu.all(by.tagName('li')).get(1).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                menu.hired = function () {
                    menu.all(by.tagName('li')).get(2).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                menu.applicantPool = function () {
                    menu.all(by.tagName('li')).get(3).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                menu.applicantArchive = function () {
                    menu.all(by.tagName('li')).get(4).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                menu.folders = function () {
                    menu.all(by.tagName('li')).get(5).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                menu.search = function () {
                    menu.all(by.tagName('li')).get(6).element(by.tagName('a')).click();
                    return new CandidateSearchPage();
                };
                return menu;
            }
        },
        importCandidatesTab: {
            value: header.element(by.css('.import'))
        },
        importCandidatesMenu: {
            get: function () {
                var menu = this.importCandidatesTab.element(by.tagName('ul'));
                browser.actions().mouseMove(this.importCandidatesTab).perform();
                menu.emails = function () {
                    menu.all(by.tagName('li')).get(0).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                menu.manual = function () {
                    menu.all(by.tagName('li')).get(1).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
            }
        },
        communicationsTab: {
            value: header.element(by.css('.correspondance'))
        },
        communicationsMenu: {
            get: function () {
                var menu = this.communicationsTab.element(by.tagName('ul'));
                browser.actions().mouseMove(this.communicationsTab).perform();
                menu.candidates = function () {
                    menu.all(by.tagName('li')).get(0).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                menu.others = function () {
                    menu.all(by.tagName('li')).get(1).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                menu.followUp = function () {
                    menu.all(by.tagName('li')).get(2).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
            }
        },
        reportsTab: {
            value: header.element(by.css('.statistique'))
        },
        reportsMenu: {
            get: function () {
                var menu = this.reportsTab.all(by.tagName('ul'));
                browser.actions().mouseMove(this.reportsTab).perform();
                //changed name from emails to reporting
                menu.reporting = function () {
                    menu.all(by.tagName('li')).get(0).element(by.tagName('a')).click();
                    return new ReportingPage();
                };
                menu.manual = function () {
                    menu.all(by.tagName('li')).get(1).element(by.tagName('a')).click();
                    return null;//TODO return an actual page here.
                };
                return menu;
            }
        },
        toolbox: {
            value: header.all(by.css('.menu_spe')).get(0).all(by.tagName('a'))
        },
        administration: {
            value: header.all(by.css('.menu_spe')).get(1).all(by.tagName('a'))
        }
    });
};
