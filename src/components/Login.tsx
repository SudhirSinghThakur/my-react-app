import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogin = async () => {
        if (auth) {
            const success = await auth.login(username, password); // Wait for login to complete
            if (success) {
                navigate('/dashboard'); // Redirect to Dashboard
            } else {
                setError('Invalid username or password');
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Ensures the content fits within the viewport
                background: 'linear-gradient(to bottom, #2E7D32, #A5D6A7)', // Gradient background
                padding: 2,
                boxSizing: 'border-box', // Ensures padding doesn't cause overflow
                overflow: 'hidden', // Prevents scrolling
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    padding: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                }}
            >
                {/* Logo */}
                <Box sx={{ marginBottom: 3 }}>
                    <img
                        src="/Logo.jpg"
                        alt="School Logo"
                        style={{
                            height: 100,
                            objectFit: 'contain',
                        }}
                    />
                </Box>

                {/* Welcome Title */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        color: '#2E7D32',
                        marginBottom: 2,
                    }}
                >
                    Welcome Back!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#616161',
                        marginBottom: 3,
                    }}
                >
                    Login to access your account and manage school activities.
                </Typography>

                {/* Error Message */}
                {error && (
                    <Typography color="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}

                {/* Username Field */}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* Password Field */}
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: 3,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Login Button */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        padding: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: '#1B5E20',
                        },
                    }}
                    onClick={handleLogin}
                >
                    Login
                </Button>

                {/* Footer */}
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 3,
                        color: '#9E9E9E',
                    }}
                >
                    © 2025 Dada Vikram Public School. All rights reserved.
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;