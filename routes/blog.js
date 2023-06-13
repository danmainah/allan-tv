const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
// const commentController = require('../controllers/commentController');

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
// router.post('/:id/comment', commentController.createComment);
// router.get('/:id/comment', commentController.getComments);
// router.put(':id/comment/:id', commentController.updateComment);
// router.delete(':id/comment/:id', commentController.deleteComment);

module.exports = router;