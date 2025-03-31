import React, { useState, useEffect, useCallback } from 'react';
import { Button, Container, Paper, Typography, Alert } from '@mui/material';
import { Pagination } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {Add } from '@mui/icons-material';
import TransactionTable from '../common/TransactionTable';
import AccountForm from '../common/AccountForm';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState({});
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalTransactions, setTotalTransactions] = useState({});

  const fetchAccounts = useCallback(async () => {
    if (!user) {
      console.error('User is not authenticated.');
      navigate('/login');
      return;
    }
    try {
      const res = await api.get(`/accounts?owner=${user._id}`);
      if (res.status === 200) {
        setAccounts(res.data.data);       
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch accounts.');
      console.error(err);
    }
  }, [navigate, user]);

  const fetchTransactions = useCallback(async (accountIds, page) => {
    try {
      const transactionPromises = accountIds.map(async (accountId) => {
        const transactionRes = await api.get(
          `/transactions/${accountId}/transactions?page=${page}&limit=${itemsPerPage}`
        );
        return {
          accountId,
          transactions: transactionRes.data.data, 
          total: transactionRes.data.total || 0,
        };
      });

      const results = await Promise.all(transactionPromises);
      const transactionsMap = results.reduce((acc, { accountId, transactions }) => {
        acc[accountId] = transactions;
        return acc;
      }, {});

      const totalMap = results.reduce((acc, { accountId, total }) => {
        acc[accountId] = total;
        return acc;
      }, {});

      setTransactions((prev) => ({ ...prev, ...transactionsMap }));
      setTotalTransactions((prev) => ({ ...prev, ...totalMap }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions.');
      console.error(err);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    if (accounts.length > 0) {
      const accountIds = accounts.map((account) => account._id);
      fetchTransactions(accountIds, currentPage);
    }
  }, [accounts, currentPage, fetchTransactions]);

  const handleAccountCreated = () => {
    fetchAccounts();
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const allTransactions = Object.values(transactions).flat();
    if (allTransactions.length === 0) {
      setError('No transactions to export.');
      return;
    }

    const csvData = allTransactions.map((t) => ({
      Amount: t.amount,
      Date: t.timestamp,
      Description: t.description,
    }));

    const csvLink = document.createElement('a');
    csvLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(csvData));
    csvLink.download = 'transactions.csv';
    document.body.appendChild(csvLink);
    csvLink.click();
    document.body.removeChild(csvLink);
    setError(null);
  };

  if (!user) {
    return <Typography variant="h6">Please log in to view your dashboard.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
        <h2>My Accounts</h2>
        <Button variant="contained" startIcon={<Add />} onClick={() => setShowForm(!showForm)}>
          New Account
        </Button>
      </Paper>

      {showForm && (
        <Paper sx={{ p: 3 }}>
          <AccountForm onSuccess={handleAccountCreated} />
        </Paper>
      )}

      {accounts.length > 0 && (
        <Button
          variant="outlined"
          onClick={handleExport}
          sx={{ mb: 2 }}
          disabled={Object.values(transactions).flat().length === 0}
        >
          Export Transactions
        </Button>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {accounts.length > 0 ? (
        accounts.map((account) => {
          const accountTransactions = transactions[account._id] || [];
          const total = totalTransactions[account._id] || 0;

          return (
            <Paper sx={{ p: 3, mb: 3 }} key={account._id}>
              <TransactionTable 
                transactions={accountTransactions} 
                accountId={account._id}
                accountType={account.type}
                accountBalance={account.balance}
                accountStatus={account.status}
              />
              <Pagination
                count={Math.ceil(total / itemsPerPage)}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
              />
            </Paper>
          );
        })
      ) : (
        <p>No accounts found.</p>
      )}
    </Container>
  );
};

export default ClientDashboard;