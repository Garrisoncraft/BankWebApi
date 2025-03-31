import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import api from '../../services/api';

const AccountForm = ({ onSuccess }) => {
  const [accountType, setAccountType] = useState('savings');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/accounts', { type: accountType, balance: initialDeposit, status: 'pending' }); 
      onSuccess('Account created successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Account Type"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Initial Deposit"
          type="number"
          value={initialDeposit}
          onChange={(e) => setInitialDeposit(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Creating...' : 'Create Account'}
        </Button>
      </form>
    </Paper>
  );
};

export default AccountForm;
