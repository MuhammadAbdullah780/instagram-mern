const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { isLoggedInOrNot } = require('../middleware/isLoggedInOrNot');




router.post('/create', isLoggedInOrNot , PostController.createPost )
router.get('/all', PostController.getAllPosts )
router.get('/:id', PostController.getSpecificPost )
router.patch('/:id/like', isLoggedInOrNot , PostController.addLikeOnPost )
router.patch('/:id/unlike', isLoggedInOrNot , PostController.removeLikeOnPost )
router.post('/:id/comment/add', isLoggedInOrNot , PostController.addCommentOnPost )
router.delete('/:id/comment/delete', isLoggedInOrNot , PostController.removeCommentOnPost )
router.delete('/delete/:id', isLoggedInOrNot, PostController.deletePost )
router.patch('/update/:id', isLoggedInOrNot, PostController.updatePost )


// * WORK NEED TO DONE LATER | SHARE POST, COMMENT ON POST, GET LIKED, GET PEOPLE WHO LIKED, SAVE POST IN USER DOCS ETC

module.exports = router;
