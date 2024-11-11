// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ObservabilityDashboard from './components/ObservabilityDashboard';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/observability" element={<ObservabilityDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
