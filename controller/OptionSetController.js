// controllers/OptionSetController.js
const OptionSet = require('../model/OptionSet');

exports.createOptionSet = async (req, res) => {
    try {
        const { name, minQuantity, maxQuantity } = req.body;

        // Validate input
        if (!name || !minQuantity || !maxQuantity) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Create new option set
        const newOptionSet = new OptionSet({
            name,
            minQuantity,
            maxQuantity
        });

        await newOptionSet.save();
        res.status(201).json({ message: 'Option Set created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


exports.getOptionSet = async (req, res) => {
    try {
        const optionSets = await OptionSet.find(); // Assuming OptionSet is your MongoDB model
        res.json(optionSets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching option sets' });
    }
};

exports.putOptionSet = async (req, res) => {
    try {
        const optionSet = await OptionSet.findById(req.params.id);
        if (!optionSet) {
            return res.status(404).json({ message: 'Option Set not found' });
        }

        optionSet.name = req.body.name || optionSet.name;
        optionSet.minQuantity = req.body.minQuantity || optionSet.minQuantity;
        optionSet.maxQuantity = req.body.maxQuantity || optionSet.maxQuantity;

        const updatedOptionSet = await optionSet.save();
        res.json(updatedOptionSet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOptionSet = async (req, res) => {
    try {
      const { id } = req.params; // assuming you're passing the ID as a URL parameter
      const result = await OptionSet.deleteOne({ _id: id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Option set not found' });
      }
  
      res.status(200).json({ message: 'Option set deleted successfully' });
    } catch (error) {
      console.error('Error deleting option set:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

