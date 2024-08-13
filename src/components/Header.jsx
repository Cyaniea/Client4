import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wedding Reservation
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/reservation">Reservation</Button>
        <Button color="inherit" component={Link} to="/contacts">Contacts</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
