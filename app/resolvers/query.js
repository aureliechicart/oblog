const Category = require('../models/category');
const Post = require('../models/post');

const resolver = {
  // all-in-1: all the posts + posts by category
  posts: async (_, { category }) => {
    if (category) {
      return await Post.findByCategoryName(category);
    } else {
      return await Post.findAll();
    }
  },
  // one post per id
  post: async (_, { id }) => await Post.findOne(id),
  // all categories
  categories: async () => await Category.findAll(),

};

module.exports = resolver;