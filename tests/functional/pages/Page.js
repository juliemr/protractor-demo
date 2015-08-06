'use strict';
var url = require('url');
var fs = require('fs');

module.exports = function () {
    //should be overridden
    var Page = Object.create({}, {
        get: {
            value: function () {
                return browser.get(this.pageUrl);
            }
        },
        getDataLayer: {
            value: function () {
                return browser.executeScript('return window.dataLayer;').then(function (dataLayer) {
                    return dataLayer;
                });
            }
        },
        isLoaded: {
            get: function () {
                var pageUrl = this.pageUrl;
                return browser.getCurrentUrl().then(function (currentUrl) {
                    // It might be nice to remove this regex magic...
                    return url.parse(currentUrl).pathname.replace(/^\/.*?\//, '') === url.parse(pageUrl).pathname.replace(/^\//, '');
                });
            }
        },
        addConfigurations: {
            value: function (configs) {
                var stringConfigs = configs.join(',');
                return executeServerScript('addFixtures', stringConfigs);
            }
        },
        clearConfigurations: {
            value: function () {
                return executeServerScript('clearFixtures');
            }
        },
        waitElementToBeShown: {
            value: function (elm) {
                return browser.wait(function () {
                    return elm.isPresent();
                }, 15000).then(function() {
                    browser.wait(function () {
                        return elm.isDisplayed();
                    }, 15000);
                });

            }
        },

        writeScreenShot: {
            value: function (data, filename) {
                var stream = fs.createWriteStream('tests/functional/artifact/'+ filename);
                stream.write(new Buffer(data, 'base64'));
                stream.end();
            }
        }
    });

    function executeServerScript(method, param) {
        var theUrl = 'http://' + url.parse(browser.baseUrl).host + '/_test/' + method + (param ? ('/' + param) : '');
        var httpGetScript = function (url) {
            var xmlHttp = new XMLHttpRequest();
            // intentionally blocking by setting asynchronous to false since tests depend on overrides having completed
            xmlHttp.open('GET', url, false);
            xmlHttp.send();
            return xmlHttp;
        };
        return browser.executeScript(httpGetScript, theUrl).then(function (xmlHttp) {
            if (xmlHttp.status !== 200) {
                console.error('Execute script returned non-200 response: ' + xmlHttp.status + theUrl + '\n' + xmlHttp.responseText);
            }
        });
    }

    Page.pageUrl = '';
    return Page;
};
