const express = require('express');
const router = express.Router();

//Files
const {
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controller/CategoryController');
const getcategories = require('../controller/GetCategories');
const ItemController = require('../controller/ItemController');
const upload = require('../middleware/multer');
const OptionSetController = require('../controller/OptionSetController');
const { getAllMods, createMod, updateMod, deleteMod } = require('../controller/modController');
const { getAllBrands, createBrand, updateBrand, deleteBrand } = require('../controller/BrandController');
const FilterTagController = require('../controller/FilterTagController');
const AttributeController = require('../controller/AttributeController');

router.post('/categories', createCategory);
router.get('/getcategories', getcategories);
router.put('/categories/:id', updateCategory); // Route for updating a category
router.delete('/categories/:id', deleteCategory); // Route for deleting a category

router.post('/items', upload.single('image'), ItemController.createItem);
router.get('/items/category/:categoryName', ItemController.getItemsByCategoryName);
router.get('/items', ItemController.getAllItems); // Route to get all items
router.put('/items/:id', ItemController.updateItem);
router.delete('/items/:id', ItemController.deleteItem);

router.post('/optionset', OptionSetController.createOptionSet);
router.get('/optionset', OptionSetController.getOptionSet);
router.put('/optionset/:id', OptionSetController.putOptionSet);
router.delete('/optionset/:id', OptionSetController.deleteOptionSet);

router.get('/getmod', getAllMods);
router.post('/mod', createMod);
router.put('/updatemod/:id', updateMod);
router.delete('/deletemod/:id', deleteMod);



router.get('/getbrand', getAllBrands);
router.post('/addbrand', createBrand);
router.put('/updatebrand/:id', updateBrand);
router.delete('/deletebrand/:id', deleteBrand);



router.post('/addfiltertag', FilterTagController.createFilterTag);
router.get('/getfiltertag', FilterTagController.getFilterTags);
router.put('/updatefiltertag/:id', FilterTagController.updateFilterTag);
router.delete('/deletefiltertag/:id', FilterTagController.deleteFilterTag);




router.post('/addattribute', AttributeController.createAttribute);
router.get('/getattributes/:categoryId', AttributeController.getAttributesByCategory);
router.put('/updateattribute/:id', AttributeController.updateAttribute);
router.delete('/deleteattribute/:id', AttributeController.deleteAttribute);

module.exports = router;