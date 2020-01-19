const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger') // a function from logger.js
const courses = require('./routes/courses');
const home = require('./routes/home');

const express = require('express');//a function
const app = express();

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(logger);
/*
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
*/

app.use('/api/courses', courses);
app.use('/', home);
//Configuration
//console.log('Application name: ' + config.get('name'));
//console.log('Mail server: ' + config.get('mail.host'));
//console.log('Mail password: ' + config.get('mail.password'));
/*
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enable...');
}
*/

/*
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});
*/

//environment variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));