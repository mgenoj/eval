// src/components/EvaluationList.js
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import apiClient from '../services/api';

function EvaluationList() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await apiClient.get('/evaluations');
        setEvaluations(response.data);
      } catch (error) {
        console.error('Error fetching evaluations', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvaluations();
  }, []);

  if (loading) {
    return <CircularProgress style={{ marginTop: '2rem' }} />;
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Input</TableCell>
            <TableCell>Model Response</TableCell>
            <TableCell>AI Judge Score</TableCell>
            <TableCell>Similarity Score</TableCell>
            <TableCell>Functional Test</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {evaluations.map((eval, index) => (
            <TableRow key={index}>
              <TableCell>{eval.input}</TableCell>
              <TableCell>{eval.model_response}</TableCell>
              <TableCell>{eval.ai_judge_score}</TableCell>
              <TableCell>{eval.similarity_score}</TableCell>
              <TableCell>
                {eval.functional_test_result.is_valid_json ? 'Pass' : 'Fail'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EvaluationList;
