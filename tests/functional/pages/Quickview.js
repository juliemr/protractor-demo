'use strict';

module.exports = function (quickview) {
    return Object.create({}, {
        window: {
            value: quickview
        },
        details: {
            value: quickview.element(by.css('.i_gal_qz'))
        },
        actions: {
            value: quickview.element(by.css('.go_qz')).all(by.xpath('*')).get(0)
        },
        sumUp: {
            value: quickview.element(by.css('.go_qz')).all(by.xpath('*')).get(1)
        },
        assignedCandidates: {
            value: quickview.element(by.css('.go_qz')).all(by.xpath('*')).get(2)
        },
        edit: {
            value: quickview.element(by.css('.go_qz_bottom')).all(by.xpath('*')).get(0)
        },
        attachment: {
            value: quickview.element(by.css('.go_qz_bottom')).all(by.xpath('*')).get(1)
        },
        history: {
            value: quickview.element(by.css('.go_qz_bottom')).all(by.xpath('*')).get(2)
        },
        screeningQuestionTemplates: {
            value: quickview.element(by.css('.go_qz_bottom')).all(by.xpath('*')).get(3)
        }
    });
};
