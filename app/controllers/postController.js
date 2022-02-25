const Post = require('../models/post');

const cache = require('../services/cache');

const postController = {
    allPosts: async (_, res) => {
        console.log('carotte');
        try {
            const thePosts = await Post.findAll();
            res.json(thePosts);
        } catch (error) {
            console.log(error);
        }
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
    },
    newPost: async (req, res) => {
        const theNewPost = new Post(req.body);

        // the save method runs an INSERT
        try {
            await theNewPost.save();

            res.status(201).json(theNewPost);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
};

module.exports = postController;