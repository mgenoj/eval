// src/components/ObservabilityDashboard.js
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  TextField,
  Grid,
} from '@mui/material';
import apiClient from '../services/api';
import TraceVisualization from './TraceVisualization';

function ObservabilityDashboard() {
  const [traces, setTraces] = useState([]);
  const [filteredTraces, setFilteredTraces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTraces = async () => {
      try {
        const response = await apiClient.get('/observability/traces');
        setTraces(response.data);
        setFilteredTraces(response.data);
      } catch (error) {
        console.error('Error fetching traces', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTraces();
  }, []);

  useEffect(() => {
    setFilteredTraces(
      traces.filter((trace) =>
        trace.id.includes(searchTerm) || trace.name.includes(searchTerm)
      )
    );
  }, [searchTerm, traces]);

  if (loading) {
    return <CircularProgress style={{ marginTop: '2rem' }} />;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ marginTop: '2rem' }}>
        Observability Dashboard
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Search Traces"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
      </Grid>
      {filteredTraces.map((trace) => (
        <TraceVisualization key={trace.id} trace={trace} />
      ))}
    </Container>
  );
}

export default ObservabilityDashboard;
