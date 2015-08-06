'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');
    var DesktopPage = require('./DesktopPage.js');
    var Requisition = require('./Requisition.js');

    var RequisitionsTable = Object.create(new DefaultLayoutPage(), {
        table: {
            value: element(by.id('rptPoste_tbl'))
        },
        getRequisitions: {
            value: getRequisitions
        }
    });

    function getRequisitions() {
        var elements = element.all(by.css('.table_liste')).get(0)
            .all(by.tagName('tbody')).get(0).all(by.xpath('*'));
        return elements.count().then(function (count) {
            var reqs = [];
            for (var i = 0, j = 0; i < count; i++, j++) {
                reqs[j] = new Requisition(elements.get(i));
            }
            return reqs;
        });
    }

    function getRequisition(i) {
        var elements = element.all(by.css('.table_liste')).get(0)
            .all(by.tagName('tbody')).get(0).all(by.xpath('*'));
        return new Requisition(elements.get(i));
    }

    return RequisitionsTable;
};


