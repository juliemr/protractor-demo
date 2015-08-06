'use strict';

module.exports = function () {
    var DefaultLayoutPage = require('./DefaultLayoutPage.js');

    var MyAccount = Object.create(new DefaultLayoutPage(), {
        lastName: {
            value: element(by.id('txtNom'))
        },
        firstName: {
            value: element(by.id('txtPrenom'))
        },
        trigram: {
            value: element(by.id('txtTrigramme'))
        },
        telephone: {
            value: element(by.id('txtTelephone'))
        },
        email: {
            value: element(by.id('txtMail'))
        },
        login: {
            value: element(by.id('txtLogin'))
        },
        emailSignature: {
            value: element(by.id('txtSignature'))
        },
        area: {
            value: element(by.id('lstTimezone'))
        }
    });

    MyAccount.pageUrl = 'utilisateur/edition?id=1';
    return MyAccount;
};
