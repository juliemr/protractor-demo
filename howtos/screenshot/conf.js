// Tests for the calculator.
var ScreenshotReporter = require('./ScreenshotReporter.js');

exports.config = {
  directConnect: true,

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
