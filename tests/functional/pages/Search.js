'use strict';

module.exports = function () {
    var search = element(by.id('blsearch'));

    return Object.create({}, {
        keywords: {
            value: search.element(by.id('blsearchtxtSearch'))
        },
        location: {
            value: search.element(by.id('blsearchtxtGeoSearch'))
        },
        distance: {
            value: search.element(by.id('blsearchtxtMaxRadius'))
        },
        searchButton: {
            value: search.element(by.id('blsearchbtnSearch'))
        },
        search: {
            value: function (value) {
                var foo = this;
                return this.keywords.sendKeys(value).then(function() {
                    return foo.searchButton.click()
                }).then(function() {
                    return null;//TODO return correct page
                });
            }
        }
    });
};
