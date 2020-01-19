const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    }
});

module.exports.customerSchema = customerSchema;