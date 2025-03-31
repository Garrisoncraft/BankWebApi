import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import api from '../../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { resetToken } = new URLSearchParams(location.search);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.post(`/auth/reset-password/${resetToken}`, { newPassword });
      setSuccess('Password updated successfully. You can now log in.');
      setError('');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to update password');
      setSuccess('');
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h2">Set New Password</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Password
        </Button>
      </form>
    </Paper>
  );
};

export default NewPassword;
