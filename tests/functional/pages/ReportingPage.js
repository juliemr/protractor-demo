'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var DesktopPage = require('./DesktopPage.js');

    var Reporting = Object.create(new DefaultLayoutPage(), {
            reportDropdown: {
                value: element(by.id('lstStat'))
            }
        }
    );

    Reporting.pageUrl = 'statistique';
    return Reporting;
}
;
