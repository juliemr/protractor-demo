'use strict';

module.exports = function () {
    var Header = require('./Header.js');
    var Search = require('./Search.js');
    var Page = require('./Page.js');

    var DefaultLayoutPage = Object.create(new Page(), {
        logo: {
            value: element(by.css(".logo"))
        },
        header: {
            value: new Header()
        },
        search: {
            value: new Search()
        }
    });

    DefaultLayoutPage.pageUrl = 'DefaultLayout';
    return DefaultLayoutPage;
};
