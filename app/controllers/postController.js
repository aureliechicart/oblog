const Post = require('../models/post');

const postController = {
    allPosts: async (_, res) => {
        const thePosts = await Post.findAll();
        res.json(thePosts);
    },
    // GET /v1/posts/:id
    onePost: async (req, res) => {
        const { id } = req.params;

        const thePost = await Post.findOne(id);

        if (thePost) {
            res.json(thePost);
        } else {
            res.status(404).json('No post with this id');
        }
    },
    byCategory: async (req, res) => {
        // we retrieve the category id in params
        const { id } = req.params;

        const thePosts = await Post.findByCategory(id);

        res.json(thePosts);
    }
};

module.exports = postController;