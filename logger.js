console.log(__filename);
console.log(__dirname);

function log(msg) {
    console.log(msg);
}

//module.exports = log;
module.exports.log = log;