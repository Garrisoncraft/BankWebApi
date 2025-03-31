require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit'); // Import rate limiting middleware

const { sendPasswordResetEmail } = require('../services/emailService');
const OTP = require('../models/OTP'); // Import OTP model
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); // Import crypto for OTP generation

// Signup
router.post('/signup', [
  check('email').isEmail().withMessage('Valid email is required'), 
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character'),

  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

  const user = new User(req.body);
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ status: 400, error: 'User already exists' });
  }

  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(201).json({
    status: 201,
    data: { token, ...user.toJSON() }
  });
});

// Signin
const signinLimiter = rateLimit({ // Apply rate limiting to signin route
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { status: 429, error: 'Too many requests, please try again later.' }
});

router.post('/signin', signinLimiter, async (req, res) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ status: 401, error: 'Invalid credentials' });
  }
  
  if (!await bcrypt.compare(req.body.password, user.password)) {
    return res.status(401).json({ status: 401, error: 'Invalid credentials' });
  }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Set token expiration to 15 minutes

    res.json({ status: 200, data: { token, ...user.toJSON() } });

});

router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(400).json({ status: 400, error: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ status: 400, error: 'Invalid or expired token' });
    }

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(404).json({ status: 404, error: 'User not found' });
    }

    await User.updateOne({ _id: decoded.id }, { $pull: { tokens: { token } } });
    res.json({ status: 200, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, error: 'Internal server error' });
  }
});

// Password Reset Request

router.post('/reset-password', [
  check('email').isEmail().withMessage('Valid email is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ status: 404, error: 'User not found' });
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Hash the OTP before saving it
  const hashedOTP = await bcrypt.hash(otp, 10);

  // Save OTP to database
  const newOTP = new OTP({
    email: user.email,
    otp: hashedOTP,
  });

  await newOTP.save();

  // Send OTP to user's email
  await sendPasswordResetEmail(user.email, otp);

  res.json({
    status: 200,
    data: {
      message: 'Password reset instructions sent to your email',
    }
  });
});

// Verify OTP
router.post('/verify-otp', [
  check('email').isEmail().withMessage('Valid email is required'),
  check('otp').notEmpty().withMessage('OTP is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

  const { email, otp } = req.body;

  // Find OTP in database
  const otpRecord = await OTP.findOne({ email });

  if (!otpRecord) {
    return res.status(404).json({ status: 404, error: 'OTP not found' });
  }

  // Verify OTP
  const isMatch = await bcrypt.compare(otp, otpRecord.otp);

  if (!isMatch) {
    return res.status(400).json({ status: 400, error: 'Invalid OTP' });
  }

  // Generate reset token
  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '20m' });

  // Delete OTP from database
  await OTP.deleteOne({ email });

  res.json({
    status: 200,
    data: {
      message: 'OTP verified successfully',
      resetToken,
    }
  });
});

// Get current user
router.get('/me', async (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ status: 400, error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).json({ status: 400, error: 'Invalid or expired token' });
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(404).json({ status: 404, error: 'User not found' });
  }

  res.json({ status: 200, data: user });
});

// Password Reset Confirmation
router.post('/reset-password/:resetToken', [
  check('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

  try {
    const decoded = jwt.verify(req.params.resetToken, process.env.JWT_SECRET);
    const { email } = decoded;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 404, error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashedPassword;
    console.log(`Password was changed and sent via ${user.email} on ${new Date().toISOString()}`);

    await user.save();

    res.json({
      status: 200,
      data: { message: 'Password successfully updated' }
    });
  } catch (error) {
    res.status(401).json({ status: 401, error: 'Invalid or expired token' });
  }
});

module.exports = router;
