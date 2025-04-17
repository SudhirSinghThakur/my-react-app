import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const FeeReports: React.FC = () => {
    const handleGenerateReport = () => {
        console.log('Generating Fee Report...');
        // Report generation logic here
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: 2 }}>
                Fee Reports
            </Typography>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#2E7D32',
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#1B5E20' },
                }}
                onClick={handleGenerateReport}
            >
                Generate Report
            </Button>
        </Paper>
    );
};

export default FeeReports;