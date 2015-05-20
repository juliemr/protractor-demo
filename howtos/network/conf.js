// Tests for the calculator.
exports.config = {
  directConnect: true,

  specs: [
    'spec.js'
  ],

  framework: 'jasmine2',

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'perfLoggingPrefs': {
        'enableNetwork': true,
        'enablePage': false,
        'enableTimeline': false
      }
    },
    loggingPrefs: {
      performance: 'ALL',
      browser: 'ALL'
    }
  },

  baseUrl: 'http://localhost:8888',
};
