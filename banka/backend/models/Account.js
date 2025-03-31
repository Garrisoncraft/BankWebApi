const mongoose = require('mongoose');

// Developed by Garrison N Sayor III (20209/2022)

const accountSchema = new mongoose.Schema({
  accountNumber: { type: Number, unique: true },
  createdOn: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['savings', 'current'], default: 'savings' },
  status: { type: String, enum: ['active', 'dormant', 'pending'], default: 'pending' }, 
  balance: { type: Number, default: 0 },
});

accountSchema.pre('save', async function (next) {
  if (!this.accountNumber) {
    const lastAccount = await this.constructor.findOne({}, {}, { sort: {'accountNumber': -1}});
    this.accountNumber = lastAccount ? lastAccount.accountNumber + 1 : 100000000;
  }
  next();
});

module.exports = mongoose.model('Account', accountSchema);
