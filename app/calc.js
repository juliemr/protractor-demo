var CalcCtrl = function($timeout, $scope) {
  $scope.memory = [];
  $scope.latest = 0;
  $scope.operators = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    MODULO: '%'
  };
  $scope.operator = $scope.operators.ADDITION;

  $scope.doAddition = function() {
    var times = 5;
    $scope.latest = '. ';
    $timeout(function tickslowly() {
      if (times == 0) {
        var latestResult;
        var first = parseInt($scope.first);
        var second = parseInt($scope.second);
        switch ($scope.operator) {
          case '+':
            latestResult = first + second;
            break;
          case '-':
            latestResult = first - second;
            break;
          case '*':
            latestResult = first * second;
            break;
          case '/':
            latestResult = first / second;
            break;
          case '%':
            latestResult = first % second;
            break;
        }
        $scope.memory.unshift({
          timestamp: new Date(),
          first: $scope.first,
          operator: $scope.operator,
          second: $scope.second,
          value: latestResult
        });
        $scope.first = $scope.second = '';
        $scope.latest = latestResult;
      } else {
        $scope.latest += '. ';
        times--;
        $timeout(tickslowly, 300);
      }
    }, 300)
  };
};

var calculator = angular.module('calculator', []).
    controller('CalcCtrl', CalcCtrl);
