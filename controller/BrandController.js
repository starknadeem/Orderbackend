const Brand = require('../model/Brand');

// Get all brands
const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brands' });
    }
};

// Create a new brand
const createBrand = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newBrand = new Brand({ name, description });
        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(500).json({ message: 'Error creating brand' });
    }
};

// Update an existing brand
const updateBrand = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedBrand) return res.status(404).json({ message: 'Brand not found' });
        res.status(200).json(updatedBrand);
    } catch (error) {
        res.status(500).json({ message: 'Error updating brand' });
    }
};

// Delete a brand
const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Brand.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ message: 'Brand not found' });
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting brand' });
    }
};

module.exports = { getAllBrands, createBrand, updateBrand, deleteBrand };
