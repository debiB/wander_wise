const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const nodemailer = require("nodemailer");
const { generateOTP } = require('../utils/OTPgenerator.js');
const { generateAccessToken } = require('../utils/authUtils');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls:{
    rejectUnauthorized:true
  }
});

async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpCreatedAt = new Date(); // Current timestamp
    const user = await User.create({ name, email, password: hashedPassword, otp, otpCreatedAt, isVerified: false }); 

    await sendOtpEmail(email, otp);
    res.json({ name, message: 'Verification email has been sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

function isOtpExpired(otpCreatedAt) {
  const currentTime = new Date();
  const otpExpirationTime = new Date(otpCreatedAt.getTime() + 3 * 60 * 1000); // Add 3 minutes to the OTP creation time
  return currentTime > otpExpirationTime;
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or OTP' });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    if (isOtpExpired(user.otpCreatedAt)) {
      return res.status(401).json({ error: 'OTP has expired' });
    }

    // Update the user document to mark email as verified
    user.isVerified = true;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function resendOtp(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const otp = generateOTP();
    const otpCreatedAt = new Date(); // Current timestamp
    user.otp = otp;
    user.otpCreatedAt = otpCreatedAt;
    await user.save();

    await sendOtpEmail(email, otp);
    res.json({ message: 'New OTP has been sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: 'Email not verified' });
    }

    const token = generateAccessToken(user._id);
    const name = user.name;
    res.json({ name, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { signup, verifyOtp, login, resendOtp};