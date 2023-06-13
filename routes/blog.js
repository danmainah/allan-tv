const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.post('/', postController.createBlog);
router.get('/', postController.getBlogs);
router.get('/:id', postController.getBlog);
router.put('/:id', postController.updateBlog);
router.delete('/:id', postController.deleteBlog);
router.post('/:id/comment', commentController.createComment);
router.get('/:id/comment', commentController.getComments);
router.put(':id/comment/:id', commentController.updateComment);
router.delete(':id/comment/:id', commentController.deleteComment);

module.exports = router;