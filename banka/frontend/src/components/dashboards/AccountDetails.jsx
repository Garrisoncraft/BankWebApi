import React from 'react';
import { Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AccountDetails = ({ account, transactions }) => {
  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h2">Account Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Account Number: {account.accountNumber}</Typography>
          <Typography variant="h6">Account Type: {account.type}</Typography>
          <Typography variant="h6">Balance: ${account.balance}</Typography>
          <Typography variant="h6">Status: {account.status}</Typography>
          <Typography variant="h6">Owner: {account.owner}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Transaction History:</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountDetails;
