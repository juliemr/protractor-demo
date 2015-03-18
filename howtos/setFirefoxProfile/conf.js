var helper = require('./helper.js');

exports.config = {
  directConnect: true,

  specs: [
    'spec.js'
  ],

  getMultiCapabilities: helper.getFirefoxProfile
};
