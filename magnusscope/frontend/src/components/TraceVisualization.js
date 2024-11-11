// src/components/TraceVisualization.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function TraceVisualization({ trace }) {
  return (
    <Card style={{ marginTop: '1rem' }}>
      <CardContent>
        <Typography variant="h6">Trace ID: {trace.id}</Typography>
        <Typography variant="subtitle1">Name: {trace.name}</Typography>
        <Typography variant="body2">
          Start Time: {new Date(trace.start_time).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          End Time: {new Date(trace.end_time).toLocaleString()}
        </Typography>
        {/* Display steps */}
        {trace.steps.map((step, index) => (
          <Card key={index} style={{ marginTop: '1rem' }}>
            <CardContent>
              <Typography variant="subtitle1">Step {index + 1}</Typography>
              <Typography variant="body2">Action: {step.action}</Typography>
              <Typography variant="body2">Input: {step.input}</Typography>
              <Typography variant="body2">Output: {step.output}</Typography>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default TraceVisualization;
