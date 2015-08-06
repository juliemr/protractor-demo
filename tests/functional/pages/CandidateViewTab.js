'use strict';

module.exports = function () {
    var CandidateViewTab = Object.create({}, {
        lastNameView: {
            value: element(by.id('vw1txtNom'))
        },
        firstNameView: {
            value: element(by.id('vw1txtPrenom'))
        },
        jobNameView: {
            value: element(by.id('vw1txtNomPatronymique'))
        },
        address1View: {
            value: element(by.id('vw1txtAdresse1'))
        },
        address2View: {
            value: element(by.id('vw1txtAdresse2'))
        },
        cityView: {
            value: element(by.id('vw1txtVille'))
        },
        areaView: {
            value: element(by.id('vw1lstRegionGeoActu'))
        },
        zipCodeView: {
            value: element(by.id('vw1txtCodePostal'))
        },
        regionView: {
            value: element(by.id('vw1lstPays'))
        },
        emailView: {
            value: element(by.id('vw1txtMail'))
        },
        telephoneView: {
            value: element(by.id('vw1txtTelFixe'))
        },
        mobilePhoneView: {
            value: element(by.id('vw1txtTelPortable'))
        },
        trainingsView: {
            value: element(by.id('vw1'))
                .all(by.css('.input-select-multiple')).get(0).element(by.css('.input-text-only'))
        },
        licenceView: {
            value: element(by.id('vw1'))
                .all(by.css('.input-radio')).get(0).element(by.css('.input-text-only'))
        },
        communicationViewYes: {
            value: element(by.id('vw1optEnvoyerDossier:1'))
        },
        communicationViewNo: {
            value: element(by.id('vw1optEnvoyerDossier:0'))
        }
    });
    return CandidateViewTab;
};
