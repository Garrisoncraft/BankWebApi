const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Developed by Uwiringiye Elyse (20046/2022)

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['client', 'staff'], default: 'client' },
  isAdmin: { type: Boolean, default: false },
});

userSchema.path('password').validate(function (value) {
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/; // At least 8 characters, one number, one special character
  return passwordRegex.test(value);
}, 'Password must contain at least one special character and one number, and be at least 8 characters long.');

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
