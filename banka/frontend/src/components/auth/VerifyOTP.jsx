import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Paper, Alert } from '@mui/material';
import api from '../../services/api';

const VerifyOTP = () => {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      setMessage(response.data.data.message);
      setError('');
      navigate(`/new-password?resetToken=${response.data.data.resetToken}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to verify OTP.');
      setMessage('');
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="OTP"
          value={otp}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2, mt: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mb: 2 }}>
          Verify OTP
        </Button>
      </form>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Link to="/login" style={{ color: '#1976d2', mt: 2 }}>Back to Login</Link>
    </Paper>
  );
};

export default VerifyOTP;
