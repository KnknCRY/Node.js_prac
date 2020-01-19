const express = require('express');
const mongoose = require('mongoose');
const genre = require('./../model/genre.js')
const router = express.Router();

const Genre = mongoose.model('genres', genre.genreSchema);

router.post('/', async (req, res) => {
	const genre = new Genre({
		name: req.body.name
	});
	try {
		const result = await genre.save();
		res.send(result);
	}
	catch (err) {
		res.status(400).send(err);
	}
});

router.get('/', async (req, res) => {
	const result = await Genre.find().sort();
	res.send(result);
});


router.put('/:id', async (req, res) => {
	const result = await Genre.findByIdAndUpdate(req.params.id, {
		$set: {
			name: req.body.name
		}
	}, { new: true });
	if (!result) return res.status(404).send('No this ID');
	res.send(result);
});

router.delete('/:id', async (req, res) => {
	const result = await Genre.findByIdAndRemove(req.params.id)
	if (!result) return res.status(404).send('No this ID');
	res.send(result);
});

router.get('/:id', async (req, res) => {
	const result = await Genre.findById(req.params.id);
	if (!result) return res.status(404).send('No this ID');
	res.send(result);
});

module.exports = router;