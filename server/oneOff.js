var fs = require('fs');

fs.readFile('students.json', 'utf8', function(err, data) {
    var students = JSON.parse(data);
    
   var num = 1;
   for (var student of students){
       student.id = ('0000' + (num++).toString()).slice(-4); //-4 effectively says the last 4 characters
   }
   console.log(students);
   
   fs.writeFile('students.json', JSON.stringify(students, null, 2), function() {
       console.log('all done');
   })
})

//a for each that takes off the student.id by setting id key to undefined and uses that id to make a file for that individual student and writes all of the 0001.json's to the students/server/students folder


