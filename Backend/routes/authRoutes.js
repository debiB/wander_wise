const express = require('express');
const { signup, login, verifyOtp, resendOtp, modifyPassword } = require('../controllers/authController');


const router = express.Router();

router.post('/signup', signup); 
router.post('/login', login);  


router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/modify-password', modifyPassword);

module.exports = router;

