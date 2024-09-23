import React, { useState } from 'react';
import { Grid, Button, Typography, TextField, Paper, Box } from '@mui/material';
import axios from 'axios';

const DbFrontend = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleAnswerSubmission = async () => {
    try {
      const response = await axios.post(`http://localhost:8082/api/execute-query`, { query });
      console.log('API response:', response);
      const result = response.data;
      setResult(result);
      setError(null);
    } catch (error) {
      console.error('API error:', error);
      setError(error.message);
      setResult(null);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '50%', maxWidth: '500px' }}>
        <Typography variant="h5" align="center" gutterBottom>Quiz Question</Typography>
        <Typography variant="body1" align="center" gutterBottom>What is the capital of India</Typography>
        <TextField
          label="Enter your MongoDB query"
          value={query}
          onChange={handleQueryChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" onClick={handleAnswerSubmission} sx={{ mt: 2, width: '100%' }}>Run Query</Button>
        {result && (
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            Result: {JSON.stringify(result)}
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error" gutterBottom sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default DbFrontend;