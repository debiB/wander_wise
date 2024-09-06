const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const nodemailer = require("nodemailer");
const { generateOTP } = require('../utils/OTPgenerator');
const { generateAccessToken } = require('../utils/authUtils');
const jwt = require('jsonwebtoken');

// Configure nodemailer for sending OTP emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: true }
});

// Signup controller
async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    // Hash user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and save user to the database
    const otp = generateOTP();
    const otpCreatedAt = new Date(); 
    const user = await User.create({ name, email, password: hashedPassword, otp, otpCreatedAt, isVerified: false });

    // Send OTP via email
    await sendOtpEmail(email, otp);
    res.json({ name, message: 'Verification email has been sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Send OTP email
async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

// Check if OTP is expired
function isOtpExpired(otpCreatedAt) {
  const currentTime = new Date();
  const otpExpirationTime = new Date(otpCreatedAt.getTime() + 3 * 60 * 1000); // OTP valid for 3 minutes
  return currentTime > otpExpirationTime;
}

// Verify OTP and authenticate user
async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or OTP' });

    // Check if OTP matches and has not expired
    if (user.otp !== otp) return res.status(401).json({ error: 'Invalid OTP' });
    if (isOtpExpired(user.otpCreatedAt)) return res.status(401).json({ error: 'OTP has expired' });

    // Mark user as verified and generate token
    user.isVerified = true;
    await user.save();

     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '1h'
});
    res.json({ message: 'Email verified successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Resend OTP to the user
async function resendOtp(req, res) {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email' });

    // Generate new OTP and send it
    const otp = generateOTP();
    user.otp = otp;
    user.otpCreatedAt = new Date();
    await user.save();

    await sendOtpEmail(email, otp);
    res.json({ message: 'New OTP has been sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// User login controller
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid email or password' });

    // Ensure the user has verified their email
    if (!user.isVerified) return res.status(401).json({ error: 'Email not verified' });

    // Generate access token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: '1h'
});

    res.json({ name: user.name, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Modify password controller
async function modifyPassword(req, res) {
  const { newPassword } = req.body;

  try {
    const userId = req.userId; 
    const user = await User.findById(userId); 
    if (!user) return res.status(401).json({ error: 'User not found' });

    // Check if new password is provided
    if (!newPassword) return res.status(400).json({ error: 'New password is required' });

    // Hash the new password and update the user record
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { signup, verifyOtp, login, resendOtp, modifyPassword };
