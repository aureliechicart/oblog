const Post = require('../models/post');

const cache = require('../services/cache');

const postController = {
    allPosts: async (_, res) => {
        let thePosts;
        // if the data already exists in cache, we get them from the cache to accelerate performance
        try {
            if (await cache.postsExist() === 1) {
                thePosts = await cache.getPosts();
            } else {
                // if not, we get the data from the postgres database
                thePosts = await Post.findAll();
                // and we save it in the Redis cache
                cache.setPosts(thePosts);
            }
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
        // event-based invalidation
        //  if we create a new post, the list of posts saved in cache need to be removed,
        // to force the API to get the list of posts including the new posts from the postgresDB
        await cache.delPosts();

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