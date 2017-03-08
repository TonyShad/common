/**
 * Created by mcsim-gr on 08.03.17.
 */
const fs = require('fs');
const path = require('path');
const data = {};

const dataFolder = __dirname + '/data';
const dataFiles = fs.readdirSync(dataFolder);

for (let file of dataFiles) {
	data[path.basename(file, path.extname(file))] = require(dataFolder + '/' + file);
}

module.exports = {
    Error: require('./lib/error'),
    data
};