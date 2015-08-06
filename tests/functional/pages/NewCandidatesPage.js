'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var DesktopPage = require('./DesktopPage.js');
    var CandidatePage = require('./CandidatePage.js');
    var Candidate = require('./Candidate.js');

    var NewCandidatePage = Object.create(new DefaultLayoutPage(), {
        candidatesTable: {
            value: element(by.id('rptCandidats_tbl'))
        },
        getCandidates: {
            value: getCandidates
        }
    });

    function getCandidates() {
        this.waitElementToBeShown(this.logo);
        var elements = this.candidatesTable.element(
            by.tagName('tbody')).all(by.tagName('tr'));
        return elements.count().then(function (count) {
            var candidates = [];
            for (var i = 0, j = 0; i < count; i++, j++) {
                candidates[j] = new Candidate(elements.get(i));
            }
            return candidates;
        });
    }

    NewCandidatePage.pageUrl = 'applicant/folder?chkVivier=1';
    return NewCandidatePage;
}
