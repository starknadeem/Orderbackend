const mongoose = require('mongoose');

const filterTagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('FilterTag', filterTagSchema);
