'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var JobPostingPage = require('./JobPostingPage.js');

    var CreateJobPostingPage = Object.create(new DefaultLayoutPage(), {
        postBtn: {
            value: element(by.id('btnOK'))
        },
        viewPostingListBtn: {
            value: element(by.id('btnPostingList'))
        },
        goToPostingList: {
            value: function() {
                return this.viewPostingListBtn.click().then(function() {
                    return new JobPostingPage();
                });
            }
        },
        success: {
            value: element(by.css('.alert-success'))
        },
        error: {
            value: element(by.css('.alert-error'))
        }
    });

    CreateJobPostingPage.pageUrl = 'publication/edition?new=true';
    return CreateJobPostingPage;
};
