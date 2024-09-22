// ItemController.js

const Item = require('../model/ItemModel');
const Category = require('../model/CategoryModel'); // Assuming you have a Category model
const upload = require('../middleware/multer');

// Create a new item
exports.createItem = async (req, res) => {
    try {
        const {
            category, itemName, itemPrice, tax, description,
            applyDiscount, discountValue, discountStart, discountExpiry,
            addRecipe, recipename, itemWeight, weightUnit, productCode,
            nutritionName, nutritionValue
        } = req.body;

        // Check if category exists
        const categoryExists = await Category.findOne({ name: category });

        if (!categoryExists) {
            return res.status(400).json({ message: "Category does not exist" });
        }

        // Get the image file path
        let imagePath;
        if (req.file) {
            imagePath = req.file.path;
        } else {
            return res.status(400).json({ message: "Image is required" });
        }

        const newItem = new Item({
            category: categoryExists._id, // Store category ID
            itemName, itemPrice, tax, description,
            applyDiscount, discountValue, discountStart, discountExpiry,
            addRecipe, recipename, itemWeight, weightUnit, productCode,
            nutritionName, nutritionValue,
            image: imagePath // Add image path to the item
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get items by category name
// Get items by category name
exports.getItemsByCategoryName = async (req, res) => {
    const { categoryName } = req.params;
    try {
        let items;

        if (categoryName === 'All Categories') {
            items = await Item.find();
        } else {
            const category = await Category.findOne({ name: categoryName });
            if (!category) return res.status(404).json({ message: 'Category not found' });
            items = await Item.find({ category: category._id });
        }

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch items' });
    }
};

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find().populate('category');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    try {
        // Check if a new file is uploaded
        if (req.file) {
            updateData.image = req.file.path; // Update image path
        }

        const item = await Item.findByIdAndUpdate(id, updateData, { new: true });
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.json(item);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Server Error');
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.send('Item deleted');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Server Error');
    }
};