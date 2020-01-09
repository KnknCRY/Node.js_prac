
/*path, os, fs
const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);

const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

const fs = require('fs');
var files = fs.readdirSync('./');
console.log(files);
fs.readdir('./123', function (err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files)
});
*/

/*load module
const logger = require("./logger.js");

logger.log("hi");
*/