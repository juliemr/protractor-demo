'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var DesktopPage = require('./DesktopPage.js');
    var JobPosting = require('./JobPosting.js');

    var JobPostingTable = Object.create(new DefaultLayoutPage(), {
        table: {
            value: element(by.id('rptPublication_tbl'))
        },
        getJobPostings: {
            value: getJobPostings
        }
    });

    function getJobPostings() {
        var elements = this.table.element(
            by.tagName('tbody')).all(by.tagName('tr'));
        return elements.count().then(function (count) {
            var jobPostings = [];
            for (var i = 0, j = 0; i < count; i++, j++) {
                jobPostings[j] = new JobPosting(elements.get(i));
            }
            return jobPostings;
        });
    }

    return JobPostingTable;
};


