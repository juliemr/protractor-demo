'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var RequisitionSearchResultsPage = require('./RequisitionSearchResultsPage.js');

    var RequisitionSearch = Object.create(new DefaultLayoutPage(), {
        titleInput: {
            value: element(by.id('txtIntitule'))
        },
        regionAdd: {
            value: element(by.id('lstPays_tbl')).all(by.tagName('span')).get(0)
        },
        regionRemove: {
            value: element(by.id('lstPays_tbl')).all(by.tagName('span')).get(0)
        },
        manager: {
            value: element(by.css('.tbl_l-bit-editable-input'))
        },
        searchButton: {
            value: element(by.id('btnOK'))
        },
        firstLanguage: {
            value: element(by.id('lstLangueEditable0'))
        },
        secondLanguage: {
            value: element(by.id('lstLangueEditable1'))
        },
        submitForm: {
            value: function () {
                return this.searchButton.click().then(function() {
                    return new RequisitionSearchResultsPage();
                });
            }
        },
        fillFormForTitleCountryManagerSearch: {
            value: function() {
                var page = this;
                return this.titleInput.clear().then(function() {
                    page.titleInput.sendKeys('TESTTESTDONOTAPPLYTEST')
                }).then(function() {
                    return browser.actions().mouseMove(page.regionAdd).perform();
                }).then(function() {
                    return page.regionAdd.click();
                }).then(function() {
                    var regionOptionUS = element(by.id('ajaxlstPays')).element(by.css('option[title="United States"]'));
                    page.waitElementToBeShown(regionOptionUS);
                    browser.actions().mouseDown(regionOptionUS).mouseUp(regionOptionUS).perform();
                }).then(function() {
                    return page.setManager('lu', 0);
                });
            }
        },
        setManager: {
            value: function (name, option) {
                var page = this;
                return this.manager.sendKeys(name).then(function() {
                    page.waitElementToBeShown(element(by.css('.tbl_l-autocomplete-result')));
                    return element(by.css('.tbl_l-autocomplete-results')).
                        getWebElement().findElements(by.tagName('li'));
                }).then (function(options) {
                    return options[option].click();
                });
            }
        }

    });

    RequisitionSearch.pageUrl = 'poste/recherche';
    return RequisitionSearch;
}
