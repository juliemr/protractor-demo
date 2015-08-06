'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var JobPostingTable = require('./JobPostingTable.js');
    var CreateJobPostingPage = require('./CreateJobPostingPage');

    var JobPostingPage = Object.create(new DefaultLayoutPage(), {
        jobPostingTable: {
            value: new JobPostingTable()
        },
        newLink: {
            value: element(by.css('.entete_actions_communes a:first-child'))
        },
        goToNewJobPosting: {
            value: function() {
                return this.newLink.click().then(function() {
                    return new CreateJobPostingPage();
                });
            }
        }
    });

    JobPostingPage.pageUrl = 'publication/liste';
    return JobPostingPage;
};
