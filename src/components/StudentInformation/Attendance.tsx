import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const Attendance: React.FC = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Attendance Monitoring
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Track and manage student attendance records.
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
                View Attendance Records
            </Button>
        </Box>
    );
};

export default Attendance;