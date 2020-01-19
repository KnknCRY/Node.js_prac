const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		enum: ['action', 'horror', 'romance'],
		lowercase: true
	}
});

module.exports.genreSchema = genreSchema;