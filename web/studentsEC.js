function yearNumberToWord(year) {
    if (year === 1) return "Freshman";
    if (year === 2) return "Sophomore";
    if (year === 3) return "Junior";
    if (year === 4) return "Senior";
    if (year > 4) return "You have attended College for longer than 4 years. Congrats, you must be a CS student :)  Good Luck";
    return "Error";
}
angular.module('app', [])
    .controller('test', ['$scope', function($scope) {
        // let self = this;
        $scope.testdata = "hello world";
}]);
 