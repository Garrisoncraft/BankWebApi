const mongoose = require('mongoose');

// Developed by Uwiringiye Elyse (20046/2022)

const transactionSchema = new mongoose.Schema({
  createdOn: { type: Date, default: Date.now },
  type: { type: String, enum: ['credit', 'debit'] },
  accountNumber: Number,
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  oldBalance: Number,
  newBalance: Number,
});

module.exports = mongoose.model('Transaction', transactionSchema);