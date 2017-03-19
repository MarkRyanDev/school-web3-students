
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
        $scope.orderedBy = 'fname';
        $scope.tableView = true;

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
                preserveScope: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function() {
                $http.post('/api/v1/students', $scope.studentToEdit).then( function(res){
                    $scope.studentToEdit.id = res.data;
                    $scope.students.push($scope.studentToEdit);
                });

            });
        };

        $scope.edit = function(studentToBeEdited) {
            $scope.editing = true;
            $scope.studentToEdit = studentToBeEdited;
            $scope.studentToEditOld = _.cloneDeep(studentToBeEdited);
            $mdDialog.show({
                controller: dialogController,
                templateUrl: 'addOrEditDialog.tmpl.html',
                parent: angular.element(document.body),
                //targetEvent: ev,
                clickOutsideToClose: false,
                escapeToClose: false,
                scope: $scope,
                preserveScope: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function() {
                    $http.put(`/api/v1/students/${studentToBeEdited.id}.json`, $scope.studentToEdit);
                }, function(){
                    ;
                    _.assign(_.find($scope.students, {id:$scope.studentToEdit.id}), $scope.studentToEditOld);
               });
        };

        $scope.reorder = function(newOrder){
            if($scope.orderedBy === newOrder){
                $scope.orderedBy = '-' + newOrder;
            }
            else{
                $scope.orderedBy = newOrder;
            }
        }

        $scope.yearNumberToWord  = function(year) {
            if (year === 1) return "Freshman";
            if (year === 2) return "Sophomore";
            if (year === 3) return "Junior";
            if (year === 4) return "Senior";
            if (year > 4) return "Super Senior";
            return "Error";
        }

        //configuration/setup
        studentService.getStudents().then(function(res) {
            _.each(res.data, function(id){
                $http.get(`/api/v1/students/${id}.json`).then(function(res){
                    let student = res.data;
                    student.id = id;
                    student.startDate = new Date(student.startDate);

                    $scope.students.push(student);
                });
            });
        });
}])
.directive('dateFixer', function(){
    return {
        template: '{{date.toDateString()}}',
        // replace: true,
        scope: {
            date: '='
        }
    }
});

function dialogController($scope, $mdDialog){
    $scope.cancel = $mdDialog.cancel;
    $scope.accept = $mdDialog.hide;
}
 