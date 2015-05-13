// Tests for the calculator.
exports.config = {
  directConnect: true,

  specs: [
    'spec.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      // 'args': ['--js-flags=--expose-gc'],
      'perfLoggingPrefs': {
        // 'traceCategories': 'v8,blink.console,disabled-by-default-devtools.timeline',
        'enableNetwork': true
      }
    },
    loggingPrefs: {
      performance: 'ALL',
      browser: 'ALL'
    }
  },

  baseUrl: 'http://localhost:8888',
};
