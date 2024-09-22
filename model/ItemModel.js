const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    tax: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Store image path
    applyDiscount: { type: Boolean, default: false },
    discountValue: { type: Number, default: 0 },
    discountStart: { type: Date, default: null },
    discountExpiry: { type: Date, default: null },
    addRecipe: { type: Boolean, default: false }, // Updated from addInventory to addRecipe
    recipename: { type: String, default: '' },
    itemWeight: { type: Number, default: 0 },
    weightUnit: { type: String, default: '' },
    productCode: { type: String, default: '' },
    nutritionName: { type: String, default: '' },
    nutritionValue: { type: String, default: '' }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
