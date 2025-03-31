const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { authorizeRole } = require('../middleware/auth');
const auditLog = require('../middleware/auditLog');
const { check, validationResult } = require('express-validator');

// Developed by Garrison N Sayor III (20046/2022)

// Debit account
router.post('/:accountId/debit', authorizeRole('staff'), auditLog('Debit Account', 'Account'), [
  check('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

  const account = await Account.findById(req.params.accountId);
  if (!account || account.status !== 'active') {
    return res.status(400).json({ status: 400, error: 'Account not active' });
  }

  // Check for sufficient funds
  if (account.balance < req.body.amount) {
    return res.status(400).json({ status: 400, error: 'Insufficient funds' });
  }

  const transaction = new Transaction({
    type: 'debit',
    accountNumber: account.accountNumber,
    cashier: req.userId,
    amount: req.body.amount, 
    oldBalance: account.balance,
    newBalance: account.balance - req.body.amount,
  });

  account.balance -= req.body.amount;
  await account.save();
  await transaction.save();

  res.status(201).json({
    status: 201,
    data: {
      transactionId: transaction._id,
      accountNumber: account.accountNumber,
      amount: transaction.amount,
      cashier: req.userId,
      transactionType: 'debit',
      accountBalance: account.balance,
    },
  });
});

// Credit account
router.post('/:accountId/credit', authorizeRole('staff'), auditLog('Credit Account', 'Account'), [
  check('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, error: errors.array()[0].msg });
  }

  const account = await Account.findById(req.params.accountId);
  if (!account || account.status !== 'active') {
    return res.status(400).json({ status: 400, error: 'Account not active' });
  }

  const transaction = new Transaction({
    type: 'credit',
    accountNumber: account.accountNumber,
    cashier: req.userId,
    amount: req.body.amount,
    oldBalance: account.balance,
    newBalance: account.balance + req.body.amount,
  });

  account.balance += req.body.amount;
  await account.save();
  await transaction.save();

  res.status(201).json({
    status: 201,
    data: {
      transactionId: transaction._id,
      accountNumber: account.accountNumber,
      amount: transaction.amount,
      cashier: req.userId,
      transactionType: 'credit',
      accountBalance: account.balance,
    },
  });
});

// Get transaction history
router.get('/:accountId/transactions', [
  check('accountId').isMongoId().withMessage('Invalid account ID')
], async (req, res) => {
  const account = await Account.findById(req.params.accountId);
  if (!account) {
    return res.status(404).json({ status: 404, error: 'Account not found' });
  }

  // Check ownership
  if (account.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'staff') {
    return res.status(403).json({ status: 403, error: 'Forbidden' });
  }

  const transactions = await Transaction.find({ accountNumber: account.accountNumber }).populate('cashier', 'email'); // Populate cashier info
  res.json({ status: 200, data: transactions });
});

// Get specific transaction
router.get('/:transactionId', [
  check('transactionId').isMongoId().withMessage('Invalid transaction ID')
], async (req, res) => {
  const transaction = await Transaction.findById(req.params.transactionId);
  if (!transaction) {
    return res.status(404).json({ status: 404, error: 'Transaction not found' });
  }

  const account = await Account.findOne({ accountNumber: transaction.accountNumber });
    if (!account) {
      return res.status(404).json({ status: 404, error: 'Account not found' });
    }

  // Check ownership
  if (account.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'staff') {
    return res.status(403).json({ status: 403, error: 'Forbidden' });
  }
  res.json({ status: 200, data: transaction });
});

module.exports = router;
//email: garrisonsayor@gmail.com or whatsapp +250791955398