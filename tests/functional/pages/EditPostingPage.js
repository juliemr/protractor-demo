'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var DesktopPage = require('./DesktopPage.js');

    var EditPostingPage = Object.create(new DefaultLayoutPage(), {
        updateCareerSiteBtn: {
            value: element(by.id('btnOK'))
        }
    });
    EditPostingPage.pageUrl = 'publication/edition';
    return EditPostingPage;
};
