describe('slow calculator', function() {
  var ptor;
  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('http://localhost:3456');
  });

  it('should add numbers', function() {
    ptor.findElement(protractor.By.input('first')).sendKeys(4);
    ptor.findElement(protractor.By.input('second')).sendKeys(5);

    ptor.findElement(protractor.By.id('gobutton')).click();

     expect(ptor.findElement(protractor.By.binding('latest')).getText()).
        toEqual('9');
  });

  describe('memory', function() {
    var first, second, goButton;
    beforeEach(function() {
      first = ptor.findElement(protractor.By.input('first'));
      second = ptor.findElement(protractor.By.input('second'));
      goButton = ptor.findElement(protractor.By.id('gobutton'));
    });

    it('should start out with an empty memory', function () {
      var memory = ptor.findElements(protractor.By.repeater('result in memory').
          column('result.value'));

      memory.then(function (arr) {
        expect(arr.length).toEqual(0);
      });
    });

    it('should fill the memory with past results', function() {
      first.sendKeys(1);
      second.sendKeys(1);
      goButton.click();

      first.sendKeys(10);
      second.sendKeys(20);
      goButton.click();

      var memory = ptor.findElements(protractor.By.repeater('result in memory').
          column('result.value'));
      memory.then(function (arr) {
        expect(arr.length).toEqual(2);
        expect(arr[0].getText()).toEqual('30'); // 10 + 20 = 30
        expect(arr[1].getText()).toEqual('2'); // 1 + 1 = 2
      });
    });
  });
});
