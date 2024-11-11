// src/components/NavBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MagnusScope
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/observability">
          Observability
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
