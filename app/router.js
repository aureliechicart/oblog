const { Router } = require('express');

const router = Router();

/** Controllers */
const postController = require('./controllers/postController');
const categoryController = require('./controllers/categoryController');

/** Data Vlidation */
const postSchema = require('./schemas/post');
const { validateBody } = require('./services/validator');

/** Routes */

/**
 * Returns all posts from the database
 * @route GET /posts
 * @group Posts
 * @returns {Array<Post>} 200 - An array of posts
 */
router.get('/posts', postController.allPosts);

/**
 * Returns a post from the database with its id
 * @route GET /posts/{id}
 * @group Posts
 * @param {number} id.path.required - the id to get the correct post
 * @returns {Post.model} 200 - The post
 * @returns {string} 404
 */
router.get('/posts/:id(\\d+)', postController.onePost);

/**
 * Returns some post from the database based on the category id
 * @route GET /posts/category/{cid}
 * @group Posts
 * @param {number} cid.path.required - the category id
 * @returns {Array<Post>} 200 - An array of posts, can be empty
 */
router.get('/posts/category/:id(\\d+)', postController.byCategory);

/**
 * Returns all categories from the database
 * @route GET /categories
 * @group Categories
 * @returns {Array<Category>} 200 - An array of categories
 */
router.get('/categories', categoryController.allCategories);

router.post('/posts', validateBody(postSchema), postController.newPost);

router.use((req, res) => res.status(404).json('endpoint not found'));

module.exports = router;