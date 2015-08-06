'use strict';
var CandidatePage = require('./CandidatePage.js');
module.exports = function (row) {
    return Object.create({}, {
        date: {
            value: row.all(by.css('.b_g')).get(0)
        },
        lastUpdate: {
            value: row.all(by.css('.b_g')).get(1)
        },
        name: {
            value: row.all(by.css('.b_g')).get(2)
        },
        nameText: {
            value: row.element(by.css('.drag_cand'))
        },
        telephone: {
            value: row.all(by.css('.b_g')).get(3)
        },
        source: {
            value: row.all(by.css('.b_g')).get(4)
        },
        score: {
            value: row.all(by.css('.b_g')).get(5)
        },
        clickName: {
            value: function () {
                this.name.element(by.tagName('a')).click();
                return new CandidatePage();
            }
        }
    });
};

