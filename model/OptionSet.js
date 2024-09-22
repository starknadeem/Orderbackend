// models/OptionSet.js
const mongoose = require('mongoose');

const OptionSetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    minQuantity: {
        type: Number,
        required: true
    },
    maxQuantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('OptionSet', OptionSetSchema);
