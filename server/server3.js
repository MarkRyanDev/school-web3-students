console.log('Loading Server');
const WEB = __dirname.replace('server', 'web');

// __dirname == /home/ubuntu/workspace/students/server/
// the goal:    /home/ubuntu/workspace/students/web

//--------------------------load main modules---------------------------------------
var express = require('express'); //have to have loaded this module onto your machine first
var fs = require('fs');

// var listOfFileNames = fs.readdirSync(__dirname + '/students').map(function(fileName) {
//     return parseInt(fileName.replace('.json', ''));
// })

//--------------------------load express middleware modules----------------------------------------

// var fsRouter = require('./students-fs-dao.js');
var routes = require('./students-router.js');
//var mysqlRouter = require('./students-mysql-dao.js');

//var _ = require('lodash');
var colors = require('colors');
var logger = require('morgan');
var winston = require('winston');
var nconf = require('nconf');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser'); //NEW
var exec = require('child_process').exec;
//var sleepAttribute = require('sleep');

//create express app
var app = express();

//--------------------------insert middleware------------------------------------
winston.stream = {
    write: function(message, encoding){winston.info(message.trim())}  };
winston.add(winston.transports.File, {filename: 'winston log'})
app.use(logger('dev', {stream: winston.stream, colorize: false}));

app.use(compression()); //NEW
app.use(favicon(WEB + '/favicon.ico')); //NEW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application

// app.use('/api/v1', fsRouter);
app.use('/api/v1', routes);
//app.use('/api/v2', mysqlRouter);

//------------------Helper Functions--------------------------------

// function generateUniqueID() {
//     var lastNumber = 0;
//     for (var student of listOfFileNames) {
//         if (student - lastNumber > 1)
//             break;
//         lastNumber++;
//     }
//     listOfFileNames.push(lastNumber + 1);
//     listOfFileNames.sort((first, second) => {
//         if (first < second) return -1;
//         if (first > second) return 1;
//         return 0;
//     });
//     return ('0000' + (lastNumber + 1).toString()).slice(-4);
// }

//--------------Rest API calls go here---------------------------------

// //Create
// app.post('/api/v1/students', function(req, res) {
//     var id = generateUniqueID();
//     fs.writeFile(`students/${id}.json`, JSON.stringify(req.body, null, 2), 'utf8', function(err) {
//         if (err) throw err;
//         res.status(201).json(id);
//     });
// });

// //     //Read
// app.get('/api/v1/students/:id.json', function(req, res) {
//     fs.readFile(`students/${req.params.id}.json`, 'utf8', function(err, data) {
//         if (err) throw err;
//         //sleepAttribute.usleep(50000); //simulate server s time
//         //was getting strings, no idea why
//         data = JSON.parse(data);
//         data.year = parseInt(data.year);
//         data.zip = parseInt(data.zip);
//         res.status(200).json(data);
//     });
// });
// //     //Update
// app.put('/api/v1/students/:id.json', function(req, res) {
//     var id = req.params.id;
//     var data = req.body;
//     //was getting strings, no idea why
//     data.year = parseInt(data.year);
//     data.zip = parseInt(data.zip);

//     fs.writeFile(`${__dirname}/students/${id}.json`, JSON.stringify(data, null, 2), 'utf8', function(err) {
//         if (err) throw err;

//         res.sendStatus(204);
//     });

// });


// //Delete
// app.delete('/api/v1/students/:id.json', function(req, res) {
//     _.remove(listOfFileNames, fileName => parseInt(req.params.id) === fileName);
//     fs.unlink(`students/${req.params.id}.json`, function(err) {
//         if (err) throw err;

//         res.sendStatus(204); //204 means: successful thus no content
//     });
// });

// //List
// app.get('/api/v1/students.json', function(req, res) {
//     fs.readdir(__dirname + '/students', function(err, files) {
//         if (err) throw err;

//         var fileList = files.map(fileName => fileName.replace('.json', ''));
//         res.status(200).json(fileList);
//     });
// });

//------------------Other Server Setup-----------------------------------
var dbProc = exec('mongod --dbpath=mongo --port 27017');

nconf.argv().env().file({file: 'config.json'});
//traditional webserver stuff for serving static files
app.use(express.static(WEB)); //this turns it into a server like Apache server that we were using before //secret sauce //will feed your html your images 

app.get('*', function(req, res) {
    res.status(404).sendFile(WEB + '/404.html');
});

var server = app.listen(nconf.get('port'), nconf.get('host'), function() {
    winston.info(`Server listening on ${nconf.get('host')}:${nconf.get('port')}`.green);
});

winston.info('API explanation at https://docs.google.com/spreadsheets/d/1LBNDk-790NerRe_ptgJZdBOXOFGX7fFqPJ9PjIMLucI/edit#gid=0'.yellow);




//------------------------------Shutdown Stuff-----------------------------------

function gracefullShutdown() {
    winston.info('Starting Shutdown'.blue);
    dbProc.kill();
    server.close(function() {
        winston.info('Shutdown Complete'.red);
    });
}

process.on('SIGTERM', function() { //kill (terminate)
    gracefullShutdown();
});

process.on('SIGINT', function() { //Ctrl+C (interrupt)
    gracefullShutdown();
});

//SIGKILL (kill -9) can't be caught by any process, including node
//SIGSTP/SIGCONT (stop/continue) can't be caught