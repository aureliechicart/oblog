const { Router } = require('express');

const router = Router();

/** Controllers */
const postController = require('./controllers/postController');
const categoryController = require('./controllers/categoryController');

/** Routes */
router.get('/posts', postController.allPosts);
router.get('/posts/:id', postController.onePost);

router.get('/categories', categoryController.allCategories);

module.exports = router;