import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const FeeHistory: React.FC = () => {
    const [studentId, setStudentId] = useState('');

    const handleViewHistory = () => {
        console.log(`Viewing history for Student ID: ${studentId}`);
        // Fetch and display payment history logic here
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: 2 }}>
                View Payment History
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Student ID"
                    variant="outlined"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={handleViewHistory}
                >
                    View History
                </Button>
            </Box>
        </Paper>
    );
};

export default FeeHistory;