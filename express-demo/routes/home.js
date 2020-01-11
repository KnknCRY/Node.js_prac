const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { //req has many properties, this callback function also called route handler
    res.render('index.pug', {title:'my express app', message:'Hello'});
});

module.exports = router;