const express = require('express');
const authController = require('../controller/Authentication');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);

module.exports = router;
