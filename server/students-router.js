var express = require('express');
var _ = require('lodash');
var router = express.Router();
// var dao = require('./students-mongo-dao.js');
var dao = require('./students-mysql-dao.js');


//Create
router.post('/students', function(req, res) {
    dao.create(req.body, function(err, id){
        if (err) throw err;
        res.status(201).json(id);
    });
    // fs.writeFile(`students/${id}.json`, JSON.stringify(req.body, null, 2), 'utf8', function(err) {
    //     if (err) throw err;
    //     res.status(201).json(id);
    // });
});

//     //Read
router.get('/students/:id.json', function(req, res) {
    dao.read(req.params.id, function(err, student){
        if (err) throw err;
        res.status(200).json(student);
    });
    // fs.readFile(`students/${req.params.id}.json`, 'utf8', function(err, data) {
    //     if (err) throw err;
    //     data = JSON.parse(data);
    //     data.year = parseInt(data.year);
    //     data.zip = parseInt(data.zip);
    //     res.status(200).json(data);
    // });
});
//     //Update
router.put('/students/:id.json', function(req, res) {
    dao.update(req.params.id, req.body, function(err){
        if(err) throw err;
        res.sendStatus(204);
    });
    // var id = req.params.id;
    // var data = req.body;
    // //was getting strings, no idea why
    // data.year = parseInt(data.year);
    // data.zip = parseInt(data.zip);

    // fs.writeFile(`${__dirname}/students/${id}.json`, JSON.stringify(data, null, 2), 'utf8', function(err) {
    //     if (err) throw err;

    //     res.sendStatus(204);
    // });

});


//Delete
router.delete('/students/:id.json', function(req, res) {
    dao.delete(req.params.id, function(err){
        if(err) throw err;
        res.sendStatus(204);
    });
    // _.remove(listOfFileNames, fileName => parseInt(req.params.id) === fileName);
    // fs.unlink(`students/${req.params.id}.json`, function(err) {
    //     if (err) throw err;

    //     res.sendStatus(204); //204 means: successful thus no content
    // });
});

//List
router.get('/students.json', function(req, res) {
    dao.list(function(err, students){
        if (err) throw err;
        res.status(200).json(students);
    })
    // fs.readdir(__dirname + '/students', function(err, files) {
    //     if (err) throw err;

    //     var fileList = files.map(fileName => fileName.replace('.json', ''));
    //     res.status(200).json(fileList);
    // });
});

module.exports = router