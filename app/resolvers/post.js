const Category = require('../models/category');

const resolver = {
  // the category property of a Post, which is an instance of the Category class
  category: async ({ category_id }) => {
    return await Category.findOne(category_id);
  }
};

module.exports = resolver;