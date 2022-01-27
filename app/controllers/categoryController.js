const Category = require('../models/category');

const categoryController = {
    allCategories: async (_, res) => {
        const theCategories = await Category.findAll();

        res.json(theCategories);
    }
};

module.exports = categoryController;