// TransactionTable.jsx
import { useState, useRef } from 'react';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, TextField, IconButton, Tooltip, Box, Typography } from '@mui/material';
import { AccountBalance, Download, Search } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import ErrorBoundary from '../../ErrorBoundary';
import StatusChip from './StatusChip'; // Import StatusChip

const TransactionTable = ({ 
  transactions: propTransactions = [],
  accountType,
  accountBalance,
  accountStatus
}) => {
  const csvLinkRef = useRef();
  const [filter, setFilter] = useState('');

  const filteredTransactions = Array.isArray(propTransactions) 
    ? propTransactions.filter(txn => 
        txn.type.toLowerCase().includes(filter.toLowerCase())
      ) 
    : [];

  return (
      <Paper sx={{ p: 2, mb: 3, display: 'flex', flexDirection: 'column',gap: 2 }}>
        <Box>
      <TextField
          label="Filter by type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            startAdornment: <Search />,
          }}
          sx={{ width: '300px' }}
        /> 
        </Box>
        <Box sx={{ display: 'flex', mb: 2 }}>
        <AccountBalance sx={{ fontSize: 30, color: 'primary.main' }} />
        <div style={{ marginLeft: 10, fontSize: 20, color: 'primary.main' }}>
          <Typography variant="h7">Type: {accountType}</Typography>
          <Typography>Balance: ${accountBalance}</Typography>
          {/* Use StatusChip for account status */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>Status:</Typography> 
            <StatusChip status={accountStatus} />
          </Box>
        </div>

        <ErrorBoundary>
          <Tooltip title="Export to CSV">
            <IconButton onClick={() => csvLinkRef.current.link.click()}>
              <Download />
            </IconButton>
          </Tooltip>
          <CSVLink
            data={filteredTransactions}
            filename="transactions.csv"
            ref={csvLinkRef}
            style={{ display: 'none' }}
          />
        </ErrorBoundary>
        </Box>
      </Paper>
      
    
  );
};

export default TransactionTable;
