var fs = require('fs');

fs.readdirSync(__dirname + '/students').forEach(filename=>{
    let file = JSON.parse(fs.readFileSync(`${__dirname}/students/${filename}`, 'utf-8'));
    file.startDate = Date(file.startDate).toString();
    // console.log(Date(file.startDate).toString());
    // console.log(file);
    fs.writeFileSync(`${__dirname}/students/${filename}`, JSON.stringify(file, null, 2), 'utf8');
})

