var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var router = express.Router();

var listOfFileNames = fs.readdirSync(__dirname + '/students').map(function(fileName) {
    return parseInt(fileName.replace('.json', ''));
});

function generateUniqueID() {
    var lastNumber = 0;
    for (var student of listOfFileNames) {
        if (student - lastNumber > 1)
            break;
        lastNumber++;
    }
    listOfFileNames.push(lastNumber + 1);
    listOfFileNames.sort((first, second) => {
        if (first < second) return -1;
        if (first > second) return 1;
        return 0;
    });
    return ('0000' + (lastNumber + 1).toString()).slice(-4);
}

//Create
router.post('/students', function(req, res) {
    var id = generateUniqueID();
    fs.writeFile(`students/${id}.json`, JSON.stringify(req.body, null, 2), 'utf8', function(err) {
        if (err) throw err;
        res.status(201).json(id);
    });
});

//     //Read
router.get('/students/:id.json', function(req, res) {
    fs.readFile(`students/${req.params.id}.json`, 'utf8', function(err, data) {
        if (err) throw err;
        //sleepAttribute.usleep(50000); //simulate server access time
        //was getting strings, no idea why
        data = JSON.parse(data);
        data.year = parseInt(data.year);
        data.zip = parseInt(data.zip);
        res.status(200).json(data);
    });
});
//     //Update
router.put('/students/:id.json', function(req, res) {
    var id = req.params.id;
    var data = req.body;
    //was getting strings, no idea why
    data.year = parseInt(data.year);
    data.zip = parseInt(data.zip);

    fs.writeFile(`${__dirname}/students/${id}.json`, JSON.stringify(data, null, 2), 'utf8', function(err) {
        if (err) throw err;

        res.sendStatus(204);
    });

});


//Delete
router.delete('/students/:id.json', function(req, res) {
    _.remove(listOfFileNames, fileName => parseInt(req.params.id) === fileName);
    fs.unlink(`students/${req.params.id}.json`, function(err) {
        if (err) throw err;

        res.sendStatus(204); //204 means: successful thus no content
    });
});

//List
router.get('/students.json', function(req, res) {
    fs.readdir(__dirname + '/students', function(err, files) {
        if (err) throw err;

        var fileList = files.map(fileName => fileName.replace('.json', ''));
        res.status(200).json(fileList);
    });
});

module.exports = router;