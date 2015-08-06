'use strict';

module.exports = function (row) {
    var Quickview = require('./Quickview.js');
    var Note = require('./Note.js');
    var CreateRequisitionPage = require('./CreateRequisitionPage.js');

    var id = row.all(by.xpath('*')).get(2);
    var shortcuts = row.all(by.xpath('*')).get(4).element(by.tagName('div'));

    shortcuts.quickviewButton = shortcuts.all(by.tagName('a')).get(0);
    shortcuts.quickviewWindow = element(by.id('vwQZ12'));
    shortcuts.quickviewButton.open = function () {
        shortcuts.quickviewButton.click();
        return new Quickview(shortcuts.quickviewWindow);
    };
    shortcuts.noteButton = shortcuts.all(by.tagName('a')).get(1);
    shortcuts.noteWindow = element(by.id('wdwPostit'));
    shortcuts.noteButton.open = function () {
        shortcuts.noteButton.click();
        return new Note(shortcuts.noteWindow);
    };

    shortcuts.sumUp = shortcuts.all(by.tagName('a')).get(1);
    shortcuts.sumUp.go = function () {
        return null;//TODO return actual page.
    };
    return Object.create({}, {
        id: {
            value: id
        },
        date: {
            value: row.all(by.xpath('*')).get(1)
        },
        title: {
            value: row.all(by.xpath('*')).get(3)
        },
        clickTitle: {
            value: function() {
                return this.title.element(by.tagName('a')).click().then(function() {
                    return new CreateRequisitionPage();
                });
            }
        },
        shortcuts: {
            value: shortcuts
        },
        area: {
            value: row.all(by.xpath('*')).get(5)
        },
        geographicDepartment: {
            value: row.all(by.xpath('*')).get(6)
        },
        recruiter: {
            value: row.all(by.xpath('*')).get(7)
        },
        numberOfCandidates: {
            value: row.all(by.xpath('*')).get(8)
        },
        status: {
            value: row.all(by.xpath('*')).get(9)
        },
        actions: {
            value: row.all(by.xpath('*')).get(10)
        },
        emailHistoryHoverButton: {
            value: row.element(by.css('.ga-hover-bullet'))
        },
        emailHistoryWindow: {
            value: element(by.css('.content_ifb'))
        },
        emailHistoryWindowTitle: {
            value: element(by.css('.content_ifb')).element(by.css('.tit'))
        }
    });
};

