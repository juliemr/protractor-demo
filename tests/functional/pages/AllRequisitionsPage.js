'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var Requisition = require('./Requisition.js');
    var RequisitionsTable = require('./RequisitionsTable')

    var AllRequisitions = Object.create(new DefaultLayoutPage(), {
        requisitionsTable: {
            value: new RequisitionsTable()
        },
        getRequisitions: {
            value: function() {
                return this.requisitionsTable.getRequisitions();
            }
        },
        ofTypeAll: {
            value: function () {
                element(by.id("ajaxradEtat")).all(by.css('div>input')).get(0).click();
            }
        },
        allButton: {
            value: element(by.id('radEtat:0'))
        },
        awaitingApprovalButton: {
            value: element(by.id('radEtat:1'))
        },
        goToAll: {
            value: function() {
                return this.allButton.click().then(function() {
                    return AllRequisitions;
                });
            }
        },
        goToAwaitingApproval: {
            value: function() {
                return this.awaitingApprovalButton.click().then(function() {
                    return AllRequisitions;
                });
            }
        },
        ofTypeAwaitingApproval: {
            value: function () {
                element(by.id("ajaxradEtat")).all(by.css('div>input')).get(1).click();
            }
        },
        openButton: {
            value: element(by.id('radEtat:2'))
        },
        ofTypeOpen: {
            value: function () {
                element(by.id("ajaxradEtat")).all(by.css('div>input')).get(2).click();
            }
        },
        ofTypeFilled: {
            value: function () {
                element(by.id("ajaxradEtat")).all(by.css('div>input')).get(3).click();
            }
        },
        ofTypeOnHold: {
            value: function () {
                element(by.id("ajaxradEtat")).all(by.css('div>input')).get(4).click();
            }
        },
        ofTypeCancelled: {
            value: function () {
                element(by.id("ajaxradEtat")).all(by.css('div>input')).get(5).click();
            }
        },
        ofTypeAbandoned: {
            value: function () {
                element(by.id("ajaxradEtat")).all(by.css('div>input')).get(6).click();
            }
        }
    });

    AllRequisitions.pageUrl = 'poste/liste';
    return AllRequisitions;
};
