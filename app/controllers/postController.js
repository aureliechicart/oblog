const Post = require('../models/post');

const postController = {
    allPosts: async (_, res) => {
        const thePosts = await Post.findAll();
        res.json(thePosts);
    }
};

module.exports = postController;