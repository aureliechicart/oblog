const { Router } = require('express');

const router = Router();

const postController = require('./controllers/postController');

router.get('/posts', postController.allPosts);

module.exports = router;