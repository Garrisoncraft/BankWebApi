import React from 'react';
import { Paper, Typography } from '@mui/material';

const TransactionDetails = ({ transaction }) => {
  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h2">Transaction Details</Typography>
      <Typography variant="h6">Transaction ID: {transaction.id}</Typography>
      <Typography variant="h6">Type: {transaction.type}</Typography>
      <Typography variant="h6">Amount: ${transaction.amount}</Typography>
      <Typography variant="h6">Old Balance: ${transaction.oldBalance}</Typography>
      <Typography variant="h6">New Balance: ${transaction.newBalance}</Typography>
      <Typography variant="h6">Cashier: {transaction.cashier}</Typography>
      <Typography variant="h6">Date: {transaction.date}</Typography>
    </Paper>
  );
};

export default TransactionDetails;
