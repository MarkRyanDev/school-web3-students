var fs = require('fs');

fs.readFile('students.json', 'utf8', function(err, data) {
    var students = JSON.parse(data);
    
   var num = 1;
   for (var student of students){
       var idNumber = student.id;
       student.id = undefined; //this strips each student of id key
       fs.writeFile(`students/${idNumber}.json`, JSON.stringify(student, null, 2));
   }

})