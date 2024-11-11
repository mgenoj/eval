// src/components/Dashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import EvaluationList from './EvaluationList';
import Alerts from './Alerts';

function Dashboard() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: '2rem' }}>
        Dashboard
      </Typography>
      <Alerts />
      <EvaluationList />
    </Container>
  );
}

export default Dashboard;
