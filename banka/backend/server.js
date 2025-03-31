const dotenv = require('dotenv');
const cors = require('cors'); 
const express = require('express');
const contactRoute = require('./routes/contact'); 
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accounts');
const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/users');
const auditLogRoutes = require('./routes/auditLogs');
const { authenticateUser } = require('./middleware/auth');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Local development frontend
  'https://bankwebapp-fullstack.onrender.com' // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Allow credentials to be sent
})); // Enable CORS

app.use(express.json());

// API Versioning and Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contact', contactRoute);
app.use('/api/v1/accounts', authenticateUser, accountRoutes);
app.use('/api/v1/transactions', authenticateUser, transactionRoutes);
app.use('/api/v1/users', authenticateUser, userRoutes);
app.use('/api/v1/audit-logs', authenticateUser, auditLogRoutes);

// Errors handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err.message || 'Internal Server Error'
  });
});

// Database Connection and Server Startup
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT;

  mongoose.connect(process.env.MONGODB, {})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {  
      console.log(`Server is running on port ${PORT}`);
    });
  });
}

// Export app for testing
module.exports = app;
