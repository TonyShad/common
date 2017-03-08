/**
 * Created by mcsim-gr on 08.03.17.
 */
const fs = require('fs');
const path = require('path');
const data = {};

const dataFiles = fs.readdirSync('./data');

for (let file of dataFiles) {
	data[path.basename(file, path.extname(file))] = require('./data/'+file);
}

console.log(data);

module.exports = {
    Error: require('./lib/error'),
    ioClient: require('./lib/client'),
    data
};