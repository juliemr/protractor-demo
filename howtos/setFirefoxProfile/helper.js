const q = require('q');
const FirefoxProfile = require('firefox-profile');

exports.getFirefoxProfile = function () {
    const deferred = q.defer();

    const firefoxProfile = new FirefoxProfile();
    firefoxProfile.setPreference('browser.startup.homepage', 'https://www.protractortest.org/#/');
    firefoxProfile.encoded(function (encodedProfile) {
        const multiCapabilities = [{
            'browserName': 'firefox',
            'moz:firefoxOptions': {
                'profile': encodedProfile
            }
        }];
        deferred.resolve(multiCapabilities);
    });

    return deferred.promise;
};
