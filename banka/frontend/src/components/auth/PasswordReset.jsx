import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Alert } from '@mui/material';
import api from '../../services/api';
import VerifyOTP from './VerifyOTP';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/reset-password', { email });
      setMessage('Password reset instructions sent to your email. Please check your inbox for the OTP.');
      setError('');
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      console.error(err);
      setError('Failed to send password reset link.');
      setMessage('');
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2, mt: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{mb: 2}}>
          Send Reset Link
        </Button>
      </form>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      Check Your Mail <Link to="/login" style={{ color: '#1976d2', mt: 2 }}>Login Over</Link>
    </Paper>
  );
};

export default PasswordReset;
