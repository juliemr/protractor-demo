var q = require('q');
var FirefoxProfile = require('firefox-profile');

exports.getFirefoxProfile = function() {
  var deferred = q.defer();

  var firefoxProfile = new FirefoxProfile();
  firefoxProfile.setPreference('browser.newtab.url', 'https://www.angularjs.org');
  firefoxProfile.encoded(function(encodedProfile) {
    var multiCapabilities = [{
      browserName: 'firefox',
      firefox_profile : encodedProfile
    }];
    deferred.resolve(multiCapabilities);
  });

  return deferred.promise;
};
