var mysql = require('mysql');
// var _ = require('lodash');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students'
});

connection.connect();

var exports;

//Create
exports.create = function(student, callback){
// router.post('/students', function(req, res) {

    // student.startDate = `${student.startDate.getFullYear()}-${student.startDate.getMonth() + 1}-${student.startDate.getDate()}`;

    connection.query(`INSERT INTO students (fname, lname, startDate, street, city, state, zip, phone, year) VALUES ("${student.fname}","${student.lname}",DATE("${student.startDate}"),"${student.street}",
    "${student.city}","${student.state}",${parseInt(student.zip)},"${student.phone}",${parseInt(student.year)})`, (err, rows, fields) => {
        callback(err, rows.insertId);
    });

};

//     //Read
exports.read = function(id, callback){
    connection.query(`select * from students where id="${parseInt(id)}"`, (err, rows, fields) => {
        if(err)callback(err, null);

        var student = {
            "fname": rows[0].fname,
            "lname": rows[0].lname,
            "startDate": rows[0].startDate.toDateString(),
            "street": rows[0].street,
            "city": rows[0].city,
            "state": rows[0].state,
            "zip": rows[0].zip,
            "phone": rows[0].phone,
            "year": rows[0].year
        };
        callback(err, student);
    });
};

//     //Update
exports.update = function(id, student, callback){
    var updatedInfo = '';
    var data = student;
    for (var property in data) {
        // if (property === 'zip' || property === 'year')
        //     updatedInfo += `${property}=${data[property]},`;
        // if (property === 'startDate'){
        //     var date = data[property];
        //     date = new Date(date);
        //     date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        //     updatedInfo += `${property}="${date}",`;
        // }
        // else {
            updatedInfo += `${property}="${data[property]}",`; ///!!!!!!!!!!!!!TODO FIX THIS
        //}
    }
    updatedInfo = updatedInfo.slice(0, -1);

    connection.query(`UPDATE students SET ${updatedInfo} WHERE id=${id}`, function(err, results, fields) {
        callback(err);
    });
};


//Delete
exports.delete = function(id, callback){
    connection.query('delete from students where id=' + id, (err, rows, fields) => {
        callback(err);
    });
};

//List
exports.list = function(callback){
    connection.query('select id from students', (err, rows, fields) => {
        rows = rows.map(row => row.id);
        callback(err, rows);
    });
};

module.exports = exports;