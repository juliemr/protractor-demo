'use strict';
var EditPostingPage = require('./EditPostingPage.js');
module.exports = function (row) {
    return Object.create({}, {
        postingReference: {
            value: row.all(by.css('.b_g')).get(0)
        },
        goLiveDate: {
            value: row.all(by.css('.b_g')).get(1)
        },
        expirationDate: {
            value: row.all(by.css('.b_g')).get(2)
        },
        status: {
            value: row.all(by.css('.b_g')).get(3)
        },
        clickPostingReference: {
            value: function () {
                return this.postingReference.element(by.tagName('a')).click().then(function() {
                    return new EditPostingPage();
                });
            }
        },
        postingReferenceText: {
            value: function() {
                return this.postingReference.element(by.tagName('a')).getText()
            }
        },
        liveDateText: {
            value: function() {
                return this.goLiveDate.getText()
            }
        },
        expirationDateText: {
            value: function() {
                return this.expirationDate.getText()
            }
        },
        statusText: {
            value: function() {
                return this.status.getText()
            }
        }
    });
};

