var helper = require('./helper.js');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'spec.js'
  ],

  capabilities: helper.getFirefoxProfile(),
  chromeOnly: false,
};
