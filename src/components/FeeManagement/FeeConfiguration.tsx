import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import config from '../../config'; // Import the config file for the base URL

const FeeConfiguration: React.FC = () => {
    const [className, setClassName] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [particulars, setParticulars] = useState<{ [key: string]: number }>({
        admissionFee: 0,
        tuitionFee: 0,
        otherFee: 0,
    });
    const [totalFee, setTotalFee] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Handle Particulars Change
    const handleParticularChange = (key: string, value: number) => {
        const updatedParticulars = { ...particulars, [key]: value };
        setParticulars(updatedParticulars);

        // Calculate Total Fee
        const total = Object.values(updatedParticulars).reduce((sum, fee) => sum + fee, 0);
        setTotalFee(total);
    };

    // Handle Save (API Integration)
    const handleSave = async () => {
        if (!className || !academicYear) {
            setMessage('Please select a class and academic year.');
            return;
        }

        const payload = {
            className,
            academicYear,
            particulars,
            totalFee,
        };

        try {
            setLoading(true);
            setMessage('');

            const response = await fetch(`${config.BASE_URL}/FeeConfiguration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage('Fee structure saved successfully!');
                console.log('API Response:', await response.json());
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to save fee structure.');
                console.error('API Error:', errorData);
            }
        } catch (error) {
            setMessage('Failed to save fee structure. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: 2 }}>
                Configure Fee Structure
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Class Dropdown */}
                <FormControl fullWidth>
                    <InputLabel>Class</InputLabel>
                    <Select
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        label="Class"
                    >
                        <MenuItem value="">Select a Class</MenuItem>
                        <MenuItem value="Nursery">Nursery</MenuItem>
                        <MenuItem value="KG - I">KG - I</MenuItem>
                        <MenuItem value="KG - II">KG - II</MenuItem>
                        <MenuItem value="1st">1st</MenuItem>
                        <MenuItem value="2nd">2nd</MenuItem>
                        <MenuItem value="3rd">3rd</MenuItem>
                        <MenuItem value="4th">4th</MenuItem>
                        <MenuItem value="5th">5th</MenuItem>
                        <MenuItem value="6th">6th</MenuItem>
                        <MenuItem value="7th">7th</MenuItem>
                        <MenuItem value="8th">8th</MenuItem>
                    </Select>
                </FormControl>

                {/* Academic Year Dropdown */}
                <FormControl fullWidth>
                    <InputLabel>Academic Year</InputLabel>
                    <Select
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        label="Academic Year"
                    >
                        <MenuItem value="">Select an Academic Year</MenuItem>
                        <MenuItem value="2021-2022">2021-2022</MenuItem>
                        <MenuItem value="2022-2023">2022-2023</MenuItem>
                        <MenuItem value="2023-2024">2023-2024</MenuItem>
                    </Select>
                </FormControl>

                {/* Particulars Input Fields */}
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: '#2E7D32' }}>
                    Particulars
                </Typography>
                <TextField
                    label="Admission Fee"
                    variant="outlined"
                    type="number"
                    value={particulars.admissionFee}
                    onChange={(e) => handleParticularChange('admissionFee', parseFloat(e.target.value) || 0)}
                />
                <TextField
                    label="Tuition Fee"
                    variant="outlined"
                    type="number"
                    value={particulars.tuitionFee}
                    onChange={(e) => handleParticularChange('tuitionFee', parseFloat(e.target.value) || 0)}
                />
                <TextField
                    label="Other Fee"
                    variant="outlined"
                    type="number"
                    value={particulars.otherFee}
                    onChange={(e) => handleParticularChange('otherFee', parseFloat(e.target.value) || 0)}
                />

                {/* Total Fee Display */}
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: '#2E7D32' }}>
                    Total Fee: ₹{totalFee}
                </Typography>

                {/* Save Button */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Fee Structure'}
                </Button>

                {/* Message Display */}
                {message && (
                    <Typography
                        variant="body1"
                        sx={{
                            marginTop: 2,
                            color: message.includes('successfully') ? '#2E7D32' : '#D32F2F',
                        }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default FeeConfiguration;