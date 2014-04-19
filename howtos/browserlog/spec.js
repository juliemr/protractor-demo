var calculator = require('../../page_objects/calculator');

describe('slow calculator', function() {

  beforeEach(function() {
    calculator.load('http://juliemr.github.io/protractor-demo/');
  });

  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
      // Uncomment to actually see the log.
      // console.log('log: ' + require('util').inspect(browserLog));
    });
  });

  it('should pass a normal test', function() {
    calculator.sum(1, 2)
    expect(calculator.getResult()).toEqual('3');
  });

  it('should fail when the console has errors - FAILURE EXPECTED', function() {
    browser.executeScript(function() {console.error('error from test')});
  });

  it('should pass when the console has non-error logs', function() {
    browser.executeScript(function() {console.log('hi!')});
  })
});
