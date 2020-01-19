const express = require('express');
const mongoose = require('mongoose');
const customer = require('./../model/customer.js');
const router = express.Router();

const Customer = mongoose.model('customers', customer.customerSchema);

router.get('/', async (req, res) => {
    const result = await Customer.find();
    res.send(result);
});

router.post('/', async (req, res) => {
    const cus = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    try {
        const result = await cus.save();
        res.send(result);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const result = await Customer.findById(req.params.id);
    if (!result) return res.status(404).send('No this ID.');
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const result = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });
    if (!result) return res.status(404).send('No this ID.');
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const result = await Customer.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('No this ID.');
    res.send(result);
});

module.exports = router;