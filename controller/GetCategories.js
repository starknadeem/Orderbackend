const Category = require('../model/CategoryModel');
const Item = require('../model/ItemModel');

const getcategories = async (req, res) => {
    try {
        const categories = await Category.find();
        
        const categoriesWithItemCount = await Promise.all(categories.map(async (category) => {
            const itemCount = await Item.countDocuments({ category: category._id });
            return { ...category._doc, itemCount };
        }));

        res.json(categoriesWithItemCount);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

module.exports = getcategories;
