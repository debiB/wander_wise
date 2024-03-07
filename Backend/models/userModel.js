const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: {
    type: String,
    required: true
  },
  otpCreatedAt: {
    type: Date,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);