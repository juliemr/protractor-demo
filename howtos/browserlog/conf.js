// Tests for the calculator.
exports.config = {
  directConnect: true,

  specs: [
    'spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8888',
};
