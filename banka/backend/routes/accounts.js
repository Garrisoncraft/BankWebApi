const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const User = require ('../models/User');
const Transaction = require('../models/Transaction');
const { authorizeRole, authenticateUser } = require('../middleware/auth');
const auditLog = require('../middleware/auditLog');
const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');


// Create account
const createAccountLimiter = rateLimit({ // Apply rate limiting to account creation route
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { status: 429, error: 'Too many requests, please try again later.' }
});

router.post('/', authenticateUser, createAccountLimiter, auditLog('Create Account', 'Account'), [
  check('type').isIn(['savings', 'current']).withMessage('Account type must be savings or current'),
  check('balance').isFloat({ min: 0 }).withMessage('Opening balance must be a positive number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

const account = new Account({ owner: req.user.id, status: 'pending', ...req.body });


  await account.save();
  const user = await User.findById(req.user.id);

  res.status(201).json({
    status: 201,
    data: {
      accountNumber: account.accountNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: account.type,
      openingBalance: account.balance,
    },
  });
});

// Update account status
router.patch('/:accountNumber', authorizeRole('staff'), auditLog('Update Account Status', 'Account'), [ // Allow Staff and Admin to update accounts
  check('status').isIn(['active', 'pending', 'dormant']).withMessage('Status must be pending, active or dormant')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

  const account = await Account.findOne({ accountNumber: req.params.accountNumber });
  if (!account) return res.status(404).json({ status: 404, error: 'Account not found' });

  account.status = req.body.status;
  await account.save();
  res.json({ status: 200, data: { accountNumber: account.accountNumber, status: account.status } });
});

// Delete account
router.delete('/:accountNumber', authorizeRole('admin'), auditLog('Delete Account', 'Account'), async (req, res) => { // Only Admin can delete accounts

  const account = await Account.findOneAndDelete({ accountNumber: req.params.accountNumber });
  if (!account) {
    return res.status(404).json({ status: 404, error: 'Account not found' });
  }
  res.json({ status: 200, message: 'Account successfully deleted' });
  });

// Get all accounts (for staff/admin) or user's accounts (for client)
router.get('/', authenticateUser, [
  check('status').optional().isIn(['active', 'pending', 'dormant']).withMessage('Status must be pending, active or dormant'),
  // Add validation for owner query parameter if needed (e.g., check if it's a valid ObjectId)
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

  const { status, owner } = req.query; 
  const query = {};

  if (status) {
    query.status = status;
  }

  if (owner) {
    query.owner = owner;
  }
  else {
      if (req.user.role === 'client') {
        query.owner = req.user.id;
      }
      else if (req.user.role !== 'staff' && req.user.role !== 'admin') {
         return res.status(403).json({ status: 403, error: 'Forbidden: Insufficient role' });
      }
  }

  try {
    const accounts = await Account.find(query).populate('owner', 'email firstName lastName');
    res.json({ status: 200, data: accounts });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ status: 500, error: 'Internal server error fetching accounts' });
  }
});

// Get specific account
router.get('/:accountNumber', authorizeRole('staff'), async (req, res) => {
    const account = await Account.findOne({ accountNumber: req.params.accountNumber })
      .populate('owner', 'email firstName lastName');

    if (!account) return res.status(404).json({ status: 404, error: 'Account not found' });
    res.json({ status: 200, data: account });
  });

module.exports = router;

//call or whatsapp +250791955398
