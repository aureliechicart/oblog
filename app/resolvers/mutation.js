const Post = require('../models/post');

const resolver = {
  // create a post
  addPost: async (_, { input }) => {
    const newPost = new Post(input);
    await newPost.save();

    return newPost;
  }
};

module.exports = resolver;