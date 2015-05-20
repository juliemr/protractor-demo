// Tests for the calculator.
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
};
