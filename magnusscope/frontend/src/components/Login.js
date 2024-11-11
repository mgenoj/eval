// src/components/Login.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/token', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '4rem' }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
