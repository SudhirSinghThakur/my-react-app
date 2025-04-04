import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const Enrollment: React.FC = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Student Enrollment
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage student profiles and enrollment details.
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
                Add New Student
            </Button>
        </Box>
    );
};

export default Enrollment;