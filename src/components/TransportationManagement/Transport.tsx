import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const Transport: React.FC = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Transportation Management
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage bus routes, schedules, and student transport details.
                </Typography>
            </Paper>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#2E7D32',
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#1B5E20' },
                }}
            >
                View Transport Details
            </Button>
        </Box>
    );
};

export default Transport;