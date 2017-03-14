var mysql = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'students'
});

connection.connect();

var students = JSON.parse(fs.readFileSync('students.json'));

students = students.map(student => {
    student.startDate = new Date(student.startDate); 
    student.startDate = `${student.startDate.getFullYear()}-${student.startDate.getMonth() + 1}-${student.startDate.getDate()}`;
    return student;
});

console.log(students);

for (var student of students){
    connection.query(`INSERT INTO students (fname, lname, startDate, street, city, state, zip, phone, year) VALUES ("${student.fname}","${student.lname}",DATE("${student.startDate}"),"${student.street}",
    "${student.city}","${student.state}",${parseInt(student.zip)},"${student.phone}",${parseInt(student.year)})`, (err, rows, fields) => {
        if (err) throw err;
    });
}

connection.end();