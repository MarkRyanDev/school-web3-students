console.log('hello world');
console.log(process.argv);

var fs = require('fs');

var fileName = `${process.argv[2]}.txt`;
var contents = `${process.argv[3]}\n${process.argv[4]}`;
fs.writeFileSync(fileName, contents, 'utf8');
fs.readFileSync(fileName, 'utf8');
var bravo = fs.readFileSync(fileName, 'utf8');
console.log()

console.log('done');
