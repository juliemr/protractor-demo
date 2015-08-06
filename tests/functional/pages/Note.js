'use strict';

module.exports = function (note) {
    return Object.create({}, {
        input: {
            value: note.element(by.id('wdwPostittxtPostIt'))
        },
        submit: {
            value: note.element(by.id('wdwPostitbtnOK'))
        },
        cancel: {
            value: note.element(by.id('wdwPostitbtnAnnuler'))
        }
    });
};
