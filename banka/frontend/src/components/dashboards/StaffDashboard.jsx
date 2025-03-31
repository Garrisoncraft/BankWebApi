import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ToggleButtonGroup, ToggleButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AccountBalance, Search } from '@mui/icons-material';
import api from '../../services/api';
import StatusChip from '../common/StatusChip'; // Import StatusChip


const StaffDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'dormant'
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newStatus, setNewStatus] = useState(''); // State for status update dropdown
  const [amount, setAmount] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'credit' or 'debit'
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    if (!user) {
      console.error('User is not authenticated.');
      navigate('/login');
      return;
    }

    const fetchAccounts = async () => {
      try {
        // Add status filter to API call if not 'all'
        const params = {};
        if (statusFilter !== 'all') {
          params.status = statusFilter;
        }
        const res = await api.get('/accounts', { params });
        setAccounts(res.data.data);        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch accounts.');
      }
    };

    fetchAccounts();
  }, [user, navigate, statusFilter]); // Add statusFilter to dependencies

  const handleOpenDialog = (type) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount greater than zero.');
      return;
    }

    setDialogType(type);
    setDialogMessage(
      `Are you sure you want to ${type} $${parsedAmount.toFixed(2)} ${type === 'credit' ? 'to' : 'from'} account ${selectedAccount?.accountNumber}?`
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogMessage('');
    setDialogType('');
  };

  const confirmTransaction = async () => {
    if (!selectedAccount || !dialogType || !amount) return;

    try {
      const endpoint = dialogType === 'credit'
        ? `/transactions/${selectedAccount._id}/credit`
        : `/transactions/${selectedAccount._id}/debit`;

      await api.post(endpoint, {
        accountId: selectedAccount._id,
        amount: parseFloat(amount),
        type: dialogType,
      });

      setAmount('');
      setSelectedAccount(null); // Deselect account after transaction
      handleCloseDialog(); // Close dialog

      // Refetch accounts to update the list
      const res = await api.get('/accounts');
      setAccounts(res.data.data);

      alert('Transaction successful!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || 'Transaction failed. Please try again.');
      handleCloseDialog(); // Close dialog even on error
    }
  };

  const handleStatusFilterChange = (event, newFilter) => {
    if (newFilter !== null) { // Prevent unselecting all toggles
      setStatusFilter(newFilter);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedAccount || !newStatus || newStatus === selectedAccount.status) {
      alert('Please select a new status different from the current one.');
      return;
    }
    try {
      await api.patch(`/accounts/${selectedAccount.accountNumber}`, { status: newStatus });
      alert('Account status updated successfully!');

      // Refetch accounts to reflect the change
      const params = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      const res = await api.get('/accounts', { params });
      setAccounts(res.data.data);

      // Update selected account details locally or deselect
      setSelectedAccount(prev => ({ ...prev, status: newStatus }));
      // setNewStatus(''); // Optionally reset dropdown, but might be better to keep it reflecting current status

    } catch (err) {
      console.error('Failed to update account status:', err);
      alert(err.response?.data?.error || err.message || 'Failed to update status.');
    }
  };

  // Filter accounts based on search query (status filtering is done backend-side)
  const filteredAccounts = accounts.filter(account =>
    account.accountNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Effect to update newStatus when selectedAccount changes
  useEffect(() => {
    if (selectedAccount) {
      setNewStatus(selectedAccount.status);
    } else {
      setNewStatus('');
    }
  }, [selectedAccount]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {error && (
        <Typography variant="body1" color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search account by number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ // Corrected prop name
            startAdornment: <Search />,
          }}
        />
         <ToggleButtonGroup
            color="primary"
            value={statusFilter}
            exclusive
            onChange={handleStatusFilterChange}
            aria-label="Account status filter"
            sx={{ mt: 2, mb: 2 }} // Add margin
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="dormant">Dormant</ToggleButton> {/* Changed from inactive */}
          </ToggleButtonGroup>
      </Box>

      {filteredAccounts.length > 0 ? (
          filteredAccounts.map(account => (
            <Paper
              key={account._id}
              sx={{
                p: 3,
                cursor: 'pointer',
                mb: 2,
                border: selectedAccount?._id === account._id ? '2px solid primary.main' : '1px solid #ddd', // Highlight selected
                boxShadow: selectedAccount?._id === account._id ? 3 : 1, // Add elevation on selection
              }}
              onClick={() => {
                setSelectedAccount(account);
                // setNewStatus(account.status); // Set initial status for dropdown - moved to useEffect
              }}
            >
                <Typography>
                Owner: {account.owner?.firstName && account.owner?.lastName
                  ? `${account.owner.firstName} ${account.owner.lastName}`
                  : 'Not Assigned'}
              </Typography>
              <AccountBalance sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6">Account Number: {account.accountNumber}</Typography>
              <Typography>Balance: ${account.balance?.toFixed(2)}</Typography> {/* Format balance */}
              {/* Use StatusChip for account status */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography>Status:</Typography>
                <StatusChip status={account.status} />
              </Box>

            </Paper>
          ))
        ) : (
          <Typography>No accounts found matching your search.</Typography>
        )}
      {selectedAccount && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Manage Account: {selectedAccount.owner ? `${selectedAccount.owner.firstName} ${selectedAccount.owner.lastName} - ${selectedAccount.accountNumber}` : `Owner Not Assigned - ${selectedAccount.accountNumber}`}
          </Typography>

          <TextField
            fullWidth
            label="Amount"
            type="number"
            inputProps={{ min: "0.01", step: "0.01" }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{ startAdornment: <AccountBalance /> }}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOpenDialog('credit')} // Use handleOpenDialog
              disabled={!selectedAccount} // Disable if no account selected
            >
              Credit Account
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleOpenDialog('debit')} // Use handleOpenDialog
              disabled={!selectedAccount} // Disable if no account selected
            >
              Debit Account
            </Button>
          </Box>

          {/* Status Update Section */}
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
             <FormControl sx={{ minWidth: 150 }}>
               <InputLabel id="status-select-label">New Status</InputLabel>
               <Select
                 labelId="status-select-label"
                 id="status-select"
                 value={newStatus}
                 label="New Status"
                 onChange={(e) => setNewStatus(e.target.value)}
                 disabled={!selectedAccount}
               >
                 <MenuItem value="pending">Pending</MenuItem>
                 <MenuItem value="active">Active</MenuItem>
                 <MenuItem value="dormant">Dormant</MenuItem>
               </Select>
             </FormControl>
            <Button
              variant="contained"
              onClick={handleStatusUpdate}
              disabled={!selectedAccount || newStatus === selectedAccount.status}
            >
              Update Status
            </Button>
          </Box>
        </Paper>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmTransaction} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StaffDashboard;
