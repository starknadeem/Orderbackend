// models/Mod.js
const mongoose = require('mongoose');

const modSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Mod', modSchema);
