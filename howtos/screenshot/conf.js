// Tests for the calculator.
var ScreenshotReporter = require('./screenshotReporter.js');

exports.config = {
  directConnect: true,

  specs: [
    'spec.js'
  ],

  framework: 'jasmine2',

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8888',

  onPrepare: function() {
    jasmine.getEnv().addReporter(new ScreenshotReporter("/tmp/protractorss"));
  }
};
