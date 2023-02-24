const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileControllers');
const { isLoggedInOrNot } = require('../middleware/isLoggedInOrNot');


router.get('/:id', isLoggedInOrNot , ProfileController.getUserData )
router.post('/:id/edit', isLoggedInOrNot , ProfileController.editProfile )

router.get('/:id/posts', isLoggedInOrNot ,ProfileController.getUserPosts )
router.post('/:id/follow', isLoggedInOrNot ,ProfileController.followUser )
router.post('/:id/un-follow', isLoggedInOrNot ,ProfileController.unFollowUser )


module.exports = router;
