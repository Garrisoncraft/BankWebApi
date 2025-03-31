require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Developed By Garrison N Sayor III 

const authenticateUser = async (req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', ''); 
  if (!token) return res.status(401).json({ status: 401, error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return res.status(401).json({ status: 401, error: 'Invalid or expired token' });
  }
};

const authorizeRole = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ status: 401, error: 'Access denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) return res.status(404).json({ status: 404, error: 'User not found' });
      if (requiredRole === 'admin' && !user.isAdmin) {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      if (requiredRole === 'staff' && user.role !== 'staff') {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      if (requiredRole === 'client' && user.role !== 'client') {
        return res.status(403).json({ status: 403, error: 'Forbidden' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ status: 401, error: 'Invalid or expired token' });
    }
  }
};

//garrisonsayor@gmail.com
module.exports = { authenticateUser, authorizeRole };
