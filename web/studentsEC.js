function yearNumberToWord(year) {
    if (year === 1) return "Freshman";
    if (year === 2) return "Sophomore";
    if (year === 3) return "Junior";
    if (year === 4) return "Senior";
    if (year > 4) return "You have attended College for longer than 4 years. Congrats, you must be a CS student :)  Good Luck";
    return "Error";
}
angular.module('app', ['ngMaterial', 'ngMessages'])
    .factory('studentService', function($http) {
        //HTTP requests go here
        let studentService = {
            getStudents: function() {
                return $http.get('/api/v1/students.json');
            }
        };
        return studentService;
    })
    .controller('studentsController', ['$scope', 'studentService', '$http', '$mdDialog',
        function ($scope, studentService, $http, $mdDialog) {
        //$scope variables
        $scope.students = [];//array of students in table
        $scope.deletedStudents = [];//deleted students (for restore capabilities)
        $scope.addOrEditMessage = $scope.editing ? "Editing a Student" : "Adding a New Student";
        $scope.editing = false;//toggle for whether we are editing or adding a student
        $scope.studentToEdit;//reference to student being edited
        $scope.studentToEditOld;//student being edited's old state (if changes are rejected)

        //$scope functions
        $scope.removeStudent = function(student){
            $http.delete(`/api/v1/students/${student.id}.json`);
            let deletedStudent = _.remove($scope.students, student)[0];
            delete deletedStudent.id;
            $scope.deletedStudents.push(deletedStudent);
        }
        $scope.restoreStudent = function(){
            let studentToRestore = $scope.deletedStudents.pop();
            $http.post('/api/v1/students', studentToRestore).then(function(res){
                studentToRestore.id = res.data;
                $scope.students.push(studentToRestore);
            })
        }
        $scope.addNew = function(ev) {
            $scope.editing = false;
            $scope.studentToEdit = {};
            $mdDialog.show({
                controller: dialogController,
                templateUrl: 'addOrEditDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                escapeToClose: false,
                scope: $scope,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        //configuration/setup
        studentService.getStudents().then(function(res) {
            _.each(res.data, function(id){
                $http.get(`/api/v1/students/${id}.json`).then(function(res){
                    let student = res.data;
                    student.id = id;

                    $scope.students.push(student);
                });
            });
        });
}]);

function dialogController($scope, $mdDialog){
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
}
 