const { Router } = require('express');

const router = Router();

/** Controllers */
const postController = require('./controllers/postController');
const categoryController = require('./controllers/categoryController');

/** Data Validation */
const postSchema = require('./schemas/post');
const { validateBody } = require('./services/validator');

/** Caching and flushing middleware */
const { cache, flush } = require('./services/cache');

/** Routes */

/**
 * Returns all posts from the database
 * @route GET /posts
 * @group Posts
 * @returns {Array<Post>} 200 - An array of posts
 */
router.get('/posts', cache(10), postController.allPosts);

/**
 * Returns a post from the database with its id
 * @route GET /posts/{id}
 * @group Posts
 * @param {number} id.path.required - the id to get the correct post
 * @returns {Post.model} 200 - The post
 * @returns {string} 404
 */
router.get('/posts/:id(\\d+)', cache(30), postController.onePost);

/**
 * Returns some post from the database based on the category id
 * @route GET /posts/category/{cid}
 * @group Posts
 * @param {number} cid.path.required - the category id
 * @returns {Array<Post>} 200 - An array of posts, can be empty
 */
router.get('/posts/category/:id(\\d+)', cache(), postController.byCategory);

/**
 * Returns all categories from the database
 * @route GET /categories
 * @group Categories
 * @returns {Array<Category>} 200 - An array of categories
 */
router.get('/categories', cache(10 * 60), categoryController.allCategories);

router.post('/posts', validateBody(postSchema), flush, postController.newPost);

router.use((req, res) => res.status(404).json('endpoint not found'));

module.exports = router;