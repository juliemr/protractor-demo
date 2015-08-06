'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var CandidateSearchResultsPage = require('./CandidateSearchResultsPage.js');

    var CandidateSearch = Object.create(new DefaultLayoutPage(), {

        // Basic search elements, Search in attachments and candidate form
        keywordInput: {value: element(by.id('txtMotsCles'))},
        BasicSearchButton: {value: element(by.id('btnOKMLS'))},


        // Functions
        typeKeyword: {
            value: function (keyword) {
                return this.keywordInput.sendKeys(keyword);
            }
        },
        clickBasicSearch: {
            value: function () {
                return this.BasicSearchButton.click().then(function() {
                    return new CandidateSearchResultsPage();
                });
            }
        }
    });

    CandidateSearch.pageUrl = 'candidat/recherche';
    return CandidateSearch;
}
