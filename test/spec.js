var calculator = require('../page_objects/calculator');

describe('slow calculator', function() {
  beforeEach(function() {
    calculator.load('http://localhost:3456');
  });

  it('should add numbers', function() {
    calculator.sum(4, 5);
    expect(calculator.getResult()).toEqual('9');
  });

  describe('memory', function() {
    it('should start out with an empty memory', function () {
      var memory = calculator.getMemory();
      expect(memory.count()).toEqual(0);
    });

    it('should fill the memory with past results', function() {
      calculator.sum(1, 1);
      calculator.sum(10, 20);

      var memory = calculator.getMemory();
      var resultValues = memory.getResultValues();
      resultValues.then(function (values) {
        expect(values.length).toEqual(2);
        expect(values[0].getText()).toEqual('30'); // 10 + 20 = 30
        expect(values[1].getText()).toEqual('2'); // 1 + 1 = 2
      });
    });
  });
});
