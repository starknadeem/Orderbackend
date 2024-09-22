// controllers/modController.js
const Mod = require('../model/Mod'); // Adjust the path as needed

// Get all mods
const getAllMods = async (req, res) => {
    try {
        const mods = await Mod.find();
        res.status(200).json(mods);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching mods' });
    }
};

// Create a new mod
const createMod = async (req, res) => {
    const { name } = req.body;
    try {
        const newMod = new Mod({ name });
        await newMod.save();
        res.status(201).json(newMod);
    } catch (error) {
        res.status(500).json({ message: 'Error creating mod' });
    }
};

// Update an existing mod
const updateMod = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedMod = await Mod.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedMod) return res.status(404).json({ message: 'Mod not found' });
        res.status(200).json(updatedMod);
    } catch (error) {
        res.status(500).json({ message: 'Error updating mod' });
    }
};

// Delete a mod
const deleteMod = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Mod.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ message: 'Mod not found' });
        res.status(200).json({ message: 'Mod deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mod' });
    }
};

module.exports = { getAllMods, createMod, updateMod, deleteMod };
