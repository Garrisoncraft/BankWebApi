const AuditLog = require('../models/AuditLog');

const auditLog = (action, targetType, targetId) => async (req, res, next) => {
  try {
    if (req.user) {
      await AuditLog.create({
        user: req.user._id,
        action,
        targetType,
        targetId, 
      });
    } else {
      console.warn('User not authenticated, skipping audit log.');
    }
    next(); // Call next() only once
  } catch (error) {
    console.error('Error creating audit log:', error);
    next(error); // Pass error to the next middleware
  }
};

module.exports = auditLog;
