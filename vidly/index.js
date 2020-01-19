const Joi = require('joi');
const genres = require('./routes/genres.js');
const customers = require('./routes/customers.js')
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log('Connection error...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));