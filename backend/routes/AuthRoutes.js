const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { isLoggedInOrNot } = require('../middleware/isLoggedInOrNot');

router.post('/signup', AuthController.signUp )
router.post('/login', AuthController.logIn )
router.get('/getuser', isLoggedInOrNot ,AuthController.getUser )

module.exports = router;
