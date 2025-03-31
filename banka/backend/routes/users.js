const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Account = require('../models/Account');
const { authorizeRole } = require('../middleware/auth');
const auditLog = require('../middleware/auditLog');

// Developed by Garrison N Sayor III (20209/2022)

// Create staff/admin user (admin only)
router.post('/admin', authorizeRole('admin'), auditLog('Create User', 'User'), async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ status: 201, data: user });
  } catch (error) {
    res.status(400).json({ status: 400, error: 'User creation failed' });
  }
});

//email: garrisonsayor@gmail.com or whatsapp +250791955398
router.get('/me/accounts', authorizeRole('staff'), async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ status: 404, error: 'User not found' });

    const accounts = await Account.find({ owner: user.id });

    res.json({
      status: 200,
      firstName: user.firstName,
      lastName: user.lastName,
      accounts
    });

  });


router.get('/admin', authorizeRole('admin'), auditLog('View Users', 'User'), async (req, res) => {
  try {
     const users = await User.find();
         res.status(200).json({ status: 200, data: users });
         } catch (error) {
         res.status(500).json({ status: 500, error: 'Failed to fetch users' });
           }
            });

router.put('/admin/:userId', authorizeRole('admin'), auditLog('Update User', 'User'), async (req, res) => {

          const { role, status } = req.body;
          try {
            const user = await User.findByIdAndUpdate(req.params.userId, { role, status }, { new: true });
            res.status(200).json({ status: 200, data: user });
          } catch (error) {
            res.status(400).json({ status: 400, error: 'Failed to update user' });
          }
        });

router.delete('/admin/:userId', authorizeRole('admin'), auditLog('Delete User', 'User'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ status: 400, error: 'Failed to delete user' });
  }
});

module.exports = router;
