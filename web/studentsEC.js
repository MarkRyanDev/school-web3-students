function yearNumberToWord(year) {
    if (year === 1) return "Freshman";
    if (year === 2) return "Sophomore";
    if (year === 3) return "Junior";
    if (year === 4) return "Senior";
    if (year > 4) return "You have attended College for longer than 4 years. Congrats, you must be a CS student :)  Good Luck";
    return "Error";
}
angular.module('app', [])
    .factory('studentService', function($http) {
        //HTTP requests go here
        let studentService = {
            getStudents: function() {
                return $http.get('/api/v1/students.json');
            }
        };
        return studentService;
    })
    .controller('test', ['$scope', 'studentService', '$http', function($scope, studentService, $http) {
        $scope.students = [];
        studentService.getStudents().then(function(res) {
            _.each(res.data, function(id){
                $http.get(`/api/v1/students/${id}.json`).then(function(res){
                    let student = res.data;
                    student.id = id;

                    $scope.students.push(student);
                });
            });
        });
        $scope.removeStudent=function(student){
            // _.remove($scope.students, function(s){
            //     return s.id === student.id;
            // });
            _.remove($scope.students, student);
        }
}]);
 