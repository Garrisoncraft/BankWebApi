import { useState, useEffect, useContext } from 'react';
import { Button, TextField, Container, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Select, MenuItem, FormControl, InputLabel, IconButton, Switch } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AuditLogs from '../admin/AuditLogs';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' });

  useEffect(() => {
    if (!user) {
      console.error('User is not authenticated.');
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await api.get('/users/admin');
        const usersWithAccounts = await Promise.all(
          res.data.data.map(async (user) => {
            try {
              const accountRes = await api.get(`/accounts?owner=${user._id}`);
              if (accountRes.data && accountRes.data.data && accountRes.data.data.length > 0) {
               return { ...user, accountNumber: accountRes.data.data[0].accountNumber, accountStatus: accountRes.data.data[0].status };
              } else {
                return { ...user, accountNumber: 'N/A', accountStatus: 'N/A' };
              }
            } catch (error) {
              console.error(`Error fetching account for user ${user._id}:`, error);
              return { ...user, accountNumber: 'Error', accountStatus: 'Error' };
            }
          })
        );
        setUsers(usersWithAccounts);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch users');
      }
    };
    fetchUsers();
  }, [user, navigate]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`users/admin/${userId}`, { role: newRole });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      console.error(err);
      alert('Failed to update role');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`users/admin/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error(err);
        alert('Delete failed');
      }
    }
  };

  const handleToggleStatus = async (accountNumber) => {
    try {
      const newStatus = users.find(user => user.accountNumber === accountNumber).accountStatus === 'active' ? 'dormant' : 'active';
      await api.patch(`/accounts/${accountNumber}`, { status: newStatus });
      setUsers(users.map(user => {
        if (user.accountNumber === accountNumber) {
          return { ...user, accountStatus: newStatus };
        }
        return user;
      }));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleCreateUser = async () => {
    try {
      const res = await api.post('/users/admin', newUser);
      setUsers([...users, res.data.data]);
      setNewUser({ firstName: '', lastName: '', email: '', password: '', role: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to create user');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <h2>User Management</h2>
            <TextField
              label="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              fullWidth
              margin="normal"
            />
             <TextField
              label="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              fullWidth
              margin="normal"
            />
             <TextField
              label="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleCreateUser}>Create User</Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Account Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(user => (
                      <TableRow key={user._id}>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.accountNumber}</TableCell>
                        <TableCell>
                          <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            >
                              <MenuItem value="client">Client</MenuItem>
                              <MenuItem value="staff">Staff</MenuItem>
                              <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={user.accountStatus === 'active'}
                            onChange={() => handleToggleStatus(user.accountNumber)}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(user._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(_, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                />
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <h2>Audit Logs</h2>
            <AuditLogs />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
