import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const Student: React.FC = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Student Dashboard
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Access study materials, assignments, and grades.
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
                View Assignments
            </Button>
        </Box>
    );
};

export default Student;