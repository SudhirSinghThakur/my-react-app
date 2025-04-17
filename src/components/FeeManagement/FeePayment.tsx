import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const FeePayment: React.FC = () => {
    const [studentId, setStudentId] = useState('');
    const [amountPaid, setAmountPaid] = useState('');

    const handlePayment = () => {
        console.log(`Student ID: ${studentId}, Amount Paid: ${amountPaid}`);
        // Payment processing logic here
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: 2 }}>
                Record Fee Payment
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Student ID"
                    variant="outlined"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <TextField
                    label="Amount Paid"
                    variant="outlined"
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={handlePayment}
                >
                    Record Payment
                </Button>
            </Box>
        </Paper>
    );
};

export default FeePayment;