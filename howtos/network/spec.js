describe('slow calculator', function() {
  var firstNum = element(by.model('first'));
  var secondNum = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var result = element(by.binding('latest'));

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  afterEach(function() {
    browser.manage().logs().get('performance').then(function(browserLogs) {
      browserLogs.forEach(function(browserLog) {
        var message = JSON.parse(browserLog.message).message;
        if (message.method == 'Network.responseReceived') {
          console.log(message);
        }
      });
    });
  });

  it('should pass a normal test', function() {
    firstNum.sendKeys('1');
    secondNum.sendKeys('2');
    goButton.click();
    expect(result.getText()).toEqual('3');
  });
});
