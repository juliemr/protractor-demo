'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var DesktopPage = require('./DesktopPage.js');
    var CandidatePage = require('./CandidatePage.js');
    var Candidate = require('./Candidate.js');

    var CandidateResultsPage = Object.create(new DefaultLayoutPage(), {
        candidatesTable: {
            value: element(by.id('rptCandidats_tbl'))
        },
        getCandidates: {
            value: getCandidates
        },
        error: {
            value: element(by.css('.alert-error'))
        },
        getErrorText: {
            value: function() {
                return this.error.element(by.tagName('li')).getText();
            }
        }
    });

    function getCandidates() {
        var elements = this.candidatesTable.element(
            by.tagName('tbody')).all(by.tagName('tr'));
        return elements.count().then(function (count) {
            var candidates = [];
            for (var i = 0, j = 0; i < count; i++) {
                (function(i) {
                    elements.get(i).getAttribute('class').then(function (elementClass) {
                        if (elementClass !== 'row-details') {
                            candidates[j] = new Candidate(elements.get(i));
                            j++;
                        }
                    });
                })  (i);
            }
            return candidates;
        });
    }

    CandidateResultsPage.pageUrl = 'candidat/liste/recherche';
    return CandidateResultsPage;
}
