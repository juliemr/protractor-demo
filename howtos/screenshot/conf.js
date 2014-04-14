// Tests for the calculator.
var ScreenshotReporter = require('./ScreenshotReporter.js');

exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  specs: [
    'spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8888',

  onPrepare: function() {
    jasmine.getEnv().addReporter(new ScreenshotReporter("/tmp/protractorss"));
  }
};
