const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const { authorizeRole } = require('../middleware/auth');

router.get('/', authorizeRole('admin'), async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('user', 'email');
    res.json({ status: 200, data: logs });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ status: 500, error: 'Failed to fetch audit logs' });
  }
});
 
module.exports = router;
//call or whatsapp +250791955398