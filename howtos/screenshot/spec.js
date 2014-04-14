// The following example demonstrates adding a reporter to take a screenshot at the following times:
//   a) every time an expect fails (screenshot has a suffix corresponding to expect# within spec)
//   b) end of a spec when any expect fails (screenshot has the suffix 'end')
//   c) end of a spec during timeouts (screenshot has the suffix 'end')

describe('slow calculator', function() {
  var firstNum = element(by.model('first'));
  var secondNum = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var result = element(by.binding('latest'));

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });
  
  // basic case that passes -- no screenshot should be generated. 
  it('should pass a normal test', function() {
    firstNum.sendKeys('1');
    secondNum.sendKeys('2');
    goButton.click();
    expect(result.getText()).toEqual('3');
  });

  // basic failure case that demonstrates screenshot -- screenshot will be generated for the following:
  //  *for failed expectation @ fail_expectation_-_FAILURE_EXPECTED_1.png
  //  *for failed spec        @ fail_expectation_-_FAILURE_EXPECTED_end.png
  it('fail expectation - FAILURE EXPECTED', function() {
    firstNum.sendKeys('1');
    secondNum.sendKeys('2');
    goButton.click();
    expect(result.getText()).toEqual('4');
  });
 
  // case where spec times out -- screenshot will be generated for the following:
  //  *for timedout spec      @ timeout_-_FAILURE_EXPECTED_end.png
  it('timeout - FAILURE EXPECTED', function() {
    firstNum.sendKeys('1');
    secondNum.sendKeys('2');
    goButton.click();
    expect(result.getText()).toEqual('3');
  }, 100);

  // case to show there is a screenshot for each failed expect -- screenshot will be generated for the following:
  //  *for failed expectation#2 (i.e. toEqual('4'))  @ mixture_of_successful_and_failed_expects_-_FAILURE_EXPECTED_2.png
  //  *for failed expectation#3 (i.e. toEqual('5'))  @ mixture_of_successful_and_failed_expects_-_FAILURE_EXPECTED_3.png
  //  *for failed spec                               @ mixture_of_successful_and_failed_expects_-_FAILURE_EXPECTED_end.png
  // **note: successful expectations will not generate screenshots
  // **      (although you can change this behavior from the reporter)
  it('mixture of successful and failed expects - FAILURE EXPECTED', function() {
    firstNum.sendKeys('1');
    secondNum.sendKeys('2');
    goButton.click();
    expect(result.getText()).toEqual('3');
    expect(result.getText()).toEqual('4');
    expect(result.getText()).toEqual('5');
    expect(result.getText()).toEqual('3');
  });
});

