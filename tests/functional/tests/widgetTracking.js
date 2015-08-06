'use strict';
var LoginPage = require('../pages/LoginPage.js');
var page;

describe('home page', function () {
    beforeEach(function () {
        var loginPage = new LoginPage();
        loginPage.get().then(function () {
            return loginPage.submitLoginExpectingSuccess();
        }).then(function(nextPage) {
            page = nextPage;
            page.waitElementToBeShown(page.logo);
        });
    });

    it('should have the correct widgets', function () {
        expect(page.emailsWidget.isPresent()).toBeTruthy();
        expect(page.myCandidateWidget.isPresent()).toBeTruthy();
        expect(page.applicationWidget.isPresent()).toBeTruthy();
        expect(page.assignmentWidget.isPresent()).toBeTruthy();
        expect(page.diaryWidget.isPresent()).toBeTruthy();
        expect(page.toDoWidget.isPresent()).toBeTruthy();
        expect(page.candidateWidget.isPresent()).toBeTruthy();
        expect(page.myPostingsWidget.isPresent()).toBeTruthy();
    });

    it('should track widget interactions & impressions in the dataLayer', function () {
        page.clickAllWidgets();
        // impressions
        page.getDataLayer().then(function (dataLayer) {
            expect(dataLayer).toContain(
                {
                    event: 'RRWidgetImpression',
                    widgetDisplayedTitle: 'Quick search',
                    widgetName: 'form_mm_bureau'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'RRWidgetImpression',
                    widgetDisplayedTitle: 'Last reviewed items',
                    widgetName: 'block_derniersvus'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetImpression',
                    widgetDisplayedTitle: 'Pending Emails/Mails',
                    widgetName: 'liste_courrier_attente'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetImpression',
                    widgetDisplayedTitle: 'My candidates',
                    widgetName: 'liste_mes_viviers'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetImpression',
                    widgetDisplayedTitle: 'New applications on my job postings',
                    widgetName: 'liste_mes_publication_new'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetImpression',
                    widgetDisplayedTitle: 'Candidates assigned to my requisitions in progress',
                    widgetName: 'liste_mes_poste'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetImpression',
                    widgetDisplayedTitle: 'Diary',
                    widgetName: 'view-vwCal'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetImpression',
                    widgetDisplayedTitle: 'To Do List in less than 3days',
                    widgetName: 'liste_mes_contacts_candidat_jour'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetImpression',
                    widgetDisplayedTitle: 'My postings ending in less than 7 days',
                    widgetName: 'liste_mes_publication_echeance'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetImpression',
                    widgetDisplayedTitle: 'Candidates',
                    widgetName: 'group-candidatures'
                }
            );

            // interactions
            expect(dataLayer).toContain(
                {
                    event: 'widgetClick',
                    widgetDisplayedTitle: 'Pending Emails/Mails',
                    widgetName: 'liste_courrier_attente'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetClick',
                    widgetDisplayedTitle: 'My candidates',
                    widgetName: 'liste_mes_viviers'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetClick',
                    widgetDisplayedTitle: 'New applications on my job postings',
                    widgetName: 'liste_mes_publication_new'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetClick',
                    widgetDisplayedTitle: 'Candidates assigned to my requisitions in progress',
                    widgetName: 'liste_mes_poste'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetClick',
                    widgetDisplayedTitle: 'Diary',
                    widgetName: 'view-vwCal'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetClick',
                    widgetDisplayedTitle: 'To Do List in less than 3days',
                    widgetName: 'liste_mes_contacts_candidat_jour'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetClick',
                    widgetDisplayedTitle: 'My postings ending in less than 7 days',
                    widgetName: 'liste_mes_publication_echeance'
                }
            );
            expect(dataLayer).toContain(
                {
                    event: 'widgetClick',
                    widgetDisplayedTitle: 'Candidates',
                    widgetName: 'group-candidatures'
                }
            );
        });
    });
});
