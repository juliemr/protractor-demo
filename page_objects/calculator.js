/**
 *  A calculator PageObject
 */

var calculator = (function () {

  // Constants: model names
  var FIRST_MODEL_NAME = "first";
  var SECOND_MODEL_NAME = "second";

  /**
   *  Load the calculator
   *  @param {string} the url of the calculator page
   */
  this.load = function (demoPageURL) {
    browser.get(demoPageURL);
  };

  /**
   *  Compute the sum of two numbers
   *  @param {int} the first number
   *  @param {int} the second number
   */  
  this.sum = function (firstNum, secondNum) {
  	this.setFirstNum(firstNum);
  	this.setSecondNum(secondNum);
  	this.calculate();
  };

  /**
   *  Trigger a computation
   */
  this.calculate = function () {
    element(by.id('gobutton')).click();
  };

  /**
   *  Get the result of a computation
   *  @return {string} the result value
   */
  this.getResult = function () {
    return element(by.binding('latest')).getText();
  };

  /**
   *  Set the first number in the computation
   *  @param {int} the number
   */
  this.setFirstNum = function (number) {
  	this._setNum(FIRST_MODEL_NAME, number);
  };

  /**
   *  Set the second number in the computation
   *  @param {int} the number
   */
  this.setSecondNum = function (number) {
  	this._setNum(SECOND_MODEL_NAME, number);
  };

  /**
   *  Get the calculator memory
   *  @return {object} a new memory instance
   */
  this.getMemory = function () {
  	return new Memory();
  }

  /**
   *  Helper method to set the calculator values
   *  @param {string} the model name
   *  @param {int} the number
   */ 
  this._setNum = function (modelName, number) {
    element(by.model(modelName)).sendKeys(number);
  };

  return this;
}());


/**
 *  Like PageObjects, but within a page
 *  Memory encapsulates the calculator memory
 */
var Memory = function () {
  this.resultRepeater = by.repeater('result in memory');

  /**
   *  Get the size of the memory
   *  @returns {int} the count
   */
  this.count = function () {
    return element.all(this.resultRepeater).count();
  };

  /**
   *  Get the results in the memory
   *  @returns {object} a promise
   */
  this.getResultValues = function () {
    return element.all(this.resultRepeater.column('result.value'));
  };

  return this;
};


module.exports = calculator;
