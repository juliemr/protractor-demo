describe('slow calculator', function() {
  var firstNum = element(by.model('first'));
  var secondNum = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var result = element(by.binding('latest'));

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
      // Uncomment to actually see the log.
      // console.log('log: ' + require('util').inspect(browserLog));
    });
  });

  it('should pass a normal test', function() {
    firstNum.sendKeys('1');
    secondNum.sendKeys('2');
    goButton.click();
    expect(result.getText()).toEqual('3');
  });

  it('should fail when the console has errors - FAILURE EXPECTED', function() {
    browser.executeScript(function() {console.error('error from test')});
  });

  it('should pass when the console has non-error logs', function() {
    browser.executeScript(function() {console.log('hi!')});
  })
});
