const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(msg) {
        console.log(msg);
        this.emit('msgLogged', { id: 1, url: 'http://' });
    }
}

module.exports = Logger;
//module.exports.log = log;