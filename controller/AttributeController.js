const Attribute = require('../model/Attribute');
const Category = require('../model/CategoryModel');

// Add new attribute
const createAttribute = async (req, res) => {
    try {
        const { name, category } = req.body;
        const newAttribute = new Attribute({ name, category });
        await newAttribute.save();
        res.status(201).json(newAttribute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all attributes by category
const getAttributesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const attributes = await Attribute.find({ category: categoryId }).populate('category');
        res.json(attributes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an attribute
const updateAttribute = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category } = req.body;
        const attribute = await Attribute.findByIdAndUpdate(id, { name, category }, { new: true });
        res.json(attribute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an attribute
const deleteAttribute = async (req, res) => {
    try {
        const { id } = req.params;
        await Attribute.findByIdAndDelete(id);
        res.json({ message: 'Attribute deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createAttribute,
    getAttributesByCategory,
    updateAttribute,
    deleteAttribute
};
