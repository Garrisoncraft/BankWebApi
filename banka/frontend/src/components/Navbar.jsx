import React, { useContext, useState } from 'react';
import { Box, Avatar, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <AppBar position="static">
        <Toolbar>Loading...</Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Box sx={{ display: 'flex', alignItems: 'center', margin: { xs: 1, sm: 1 } }}>
        <Avatar
          src={logo}
          alt="Logo"
          sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }}
        />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontSize: { xs: '.75rem', sm: '1.5rem' } }}
        >
          WealthCore
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button
            color="inherit"
            sx={{ '&:hover': { bgcolor: 'black', color: 'white' }, fontSize: { xs: '0.5rem', sm: '1rem' } }}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            sx={{ '&:hover': { bgcolor: 'black', color: 'white' }, fontSize: { xs: '0.5rem', sm: '1rem' } }}
            component={Link}
            to="/about"
          >
            About
          </Button>
          <Button
            color="inherit"
            sx={{ '&:hover': { bgcolor: 'black', color: 'white' }, fontSize: { xs: '0.5rem', sm: '1rem' } }}
            component={Link}
            to="/contact"
          >
            Contact
          </Button>

          {!user ? (
            <Button
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'blue', color: 'white' },
                fontSize: { xs: '0.5rem', sm: '1rem' },
                fontWeight: 'bold',
                mr: { xs: 3, sm: 1 },
              }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          ) : (
            <>
              {user.role === 'client' && (
                <Button
                  component={Link}
                  to="/client"
                  sx={{
                    '&:hover': { bgcolor: 'black', color: 'white' },
                    color: 'black',
                    bgcolor: 'gray',
                    mr: 1,
                    fontWeight: 'bold',
                    fontSize: { xs: '0.5rem', sm: '.5rem' },
                  }}
                >
                  Create Account
                </Button>
              )}
              {user.role === 'staff' && (
                <Button
                  component={Link}
                  to="/staff"
                  sx={{
                    '&:hover': { bgcolor: 'black', color: 'white' },
                    color: 'black',
                    bgcolor: 'gray',
                    mr: 1,
                    fontWeight: 'bold',
                    fontSize: { xs: '0.5rem', sm: '.5rem' },
                  }}
                >
                  Staff Dashboard
                </Button>
              )}
              {user.isAdmin === true && (
                <Button
                  component={Link}
                  to="/admin"
                  sx={{
                    '&:hover': { bgcolor: 'black', color: 'white' },
                    color: 'black',
                    bgcolor: 'gray',
                    mr: 1,
                    fontWeight: 'bold',
                    fontSize: { xs: '0.5rem', sm: '.5rem' },
                  }}
                >
                  Admin Dashboard
                </Button>
              )}
              <Button
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': { bgcolor: 'blue', color: 'white' },
                  mr: 1,
                  fontWeight: 'bold',
                  fontSize: { xs: '0.5rem', sm: '.5rem' },
                }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/about">
              About
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/contact">
              Contact
            </MenuItem>
            {!user ? (
              <MenuItem onClick={handleClose} component={Link} to="/login">
                Login
              </MenuItem>
            ) : (
              <>
                {user.role === 'client' && (
                  <MenuItem onClick={handleClose} component={Link} to="/client">
                    Create Account
                  </MenuItem>
                )}
                {user.role === 'staff' && (
                  <MenuItem onClick={handleClose} component={Link} to="/staff">
                    Staff Dashboard
                  </MenuItem>
                )}
                {user.isAdmin === true && (
                  <MenuItem onClick={handleClose} component={Link} to="/admin">
                    Admin Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={() => { handleClose(); logout(); }}>
                  Logout
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;