// src/components/Alerts.js
import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import apiClient from '../services/api';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await apiClient.get('/observability/alerts');
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alerts', error);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      {alerts.map((alert) => (
        <Alert severity="warning" key={alert.id} style={{ marginBottom: '1rem' }}>
          <AlertTitle>Drift Detected</AlertTitle>
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}

export default Alerts;
