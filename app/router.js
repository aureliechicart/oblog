const { Router } = require('express');

const router = Router();

/** Controllers */
const postController = require('./controllers/postController');
const categoryController = require('./controllers/categoryController');

/** Routes */
router.get('/posts', postController.allPosts);
router.get('/posts/:id(\\d+)', postController.onePost);
router.get('/posts/category/:id(\\d+)', postController.byCategory);

router.get('/categories', categoryController.allCategories);

router.use((req, res) => res.status(404).json('endpoint not found'));

module.exports = router;