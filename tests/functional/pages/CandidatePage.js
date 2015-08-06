'use strict';

module.exports = function () {
    var CandidateViewTab = require('./CandidateViewTab.js');
    var CandidateEditTab = require('./CandidateEditTab.js');
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');

    var CandidatePage = Object.create(new DefaultLayoutPage(), {
        candidateViewTab: {
            value: new CandidateViewTab()
        },
        candidateEditTab: {
            value: new CandidateEditTab()
        },
        viewTabElement: {
            value: element(by.css('.menu_dossier')).all(by.tagName('td')).get(0)
        },
        clickViewTabElement: {
            value: function () {
                this.viewTabElement.element(by.tagName('a')).click();
                return this.candidateViewTab;
            }
        },
        getViewTab: {
            value: function (id) {
                return this.getTab('fiche', id);
            }
        },
        getEditTab: {
            value: function (id) {
                return this.getTab('form', id);
            }
        },
        getTab: {
            value: function (tab, id) {
                return browser.get(this.pageUrl
                + '?tab=' + tab + '&id=' + id + '&containerID=vwPCC');
            }
        }
    });
    CandidatePage.pageUrl = 'candidat/dossier';
    return CandidatePage;
}
