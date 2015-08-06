'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');

    var DesktopPage = Object.create(new DefaultLayoutPage(), {
        arrivedViaLogin: {
            get: function () {
                return browser.getCurrentUrl().then(function (url) {
                    return url.indexOf('loginSuccess') > 0;
                });
            }
        },
        emailsWidget: {
            value: element(by.css("[data-ga-widget='liste_courrier_attente']"))
        },
        myCandidateWidget: {
            value: element(by.css("[data-ga-widget='liste_mes_viviers']"))
        },
        applicationWidget: {
            value: element(by.css("[data-ga-widget='liste_mes_publication_new']"))
        },
        assignmentWidget: {
            value: element(by.css("[data-ga-widget='liste_mes_poste']"))
        },
        diaryWidget: {
            value: element(by.css("[data-ga-widget='view-vwCal']"))
        },
        toDoWidget: {
            value: element(by.css("[data-ga-widget='liste_mes_contacts_candidat_jour']"))
        },
        myPostingsWidget: {
            value: element(by.css("[data-ga-widget='liste_mes_publication_echeance']"))
        },
        candidateWidget: {
            value: element(by.css("[data-ga-widget='group-candidatures']"))
        },
        clickAllWidgets: {
            value: function () {
                this.emailsWidget.element(by.css('.title')).click();
                this.myCandidateWidget.element(by.css('.title')).click();
                this.applicationWidget.element(by.css('.title')).click();
                this.assignmentWidget.element(by.css('.title')).click();
                this.diaryWidget.element(by.css('.title')).click();
                this.toDoWidget.element(by.css('.title')).click();
                this.myPostingsWidget.element(by.css('.title')).click();
                this.candidateWidget.element(by.css('.title')).click();
            }
        }
    });

    DesktopPage.pageUrl = 'desktop';
    return DesktopPage;
};
