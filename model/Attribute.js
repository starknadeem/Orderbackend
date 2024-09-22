const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true 
    }
});

const Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;
