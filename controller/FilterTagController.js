const FilterTag = require('../model/FilterTag');

// Add new filter tag
const createFilterTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newFilterTag = new FilterTag({ name });
        await newFilterTag.save();
        res.status(201).json(newFilterTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all filter tags
const getFilterTags = async (req, res) => {
    try {
        const filterTags = await FilterTag.find();
        res.json(filterTags);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a filter tag
const updateFilterTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const filterTag = await FilterTag.findByIdAndUpdate(id, { name }, { new: true });
        res.json(filterTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a filter tag
const deleteFilterTag = async (req, res) => {
    try {
        const { id } = req.params;
        await FilterTag.findByIdAndDelete(id);
        res.json({ message: 'Filter tag deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createFilterTag,
    getFilterTags,
    updateFilterTag,
    deleteFilterTag
};
