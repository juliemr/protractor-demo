var helper = require('./helper.js');

exports.config = {
  directConnect: true,

  specs: [
    'spec.js'
  ],

  framework: 'jasmine2',

  getMultiCapabilities: helper.getFirefoxProfile
};
