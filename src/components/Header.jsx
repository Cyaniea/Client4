// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, signOut } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wedding Reservation
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/reservation">Reservation</Button>
        <Button color="inherit" component={Link} to="/contacts">Contacts</Button>
        {user ? (
          <>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Welcome, {user.email}
            </Typography>
            <Button color="inherit" onClick={signOut}>Sign Out</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signin">Sign In</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;