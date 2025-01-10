const express = require('express');
const authController = require('../controller/Authentication');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/deleteuser', authenticate, authController.deleteUser);
router.post('/google-login', authController.googleLogin);
router.post('/updatename', authenticate, authController.updatename);
router.post('/userdetail', authenticate, authController.userdetail);
router.post('/updatepassword', authenticate, authController.updatepassword);

module.exports = router;
