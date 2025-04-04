import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Paper, Button, Drawer, List, ListItem, ListItemText, Divider, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    // Categorized modules
    const categories = [
        {
            title: 'User Management',
            modules: [
                { name: 'Admin', path: '/admin' },
                { name: 'Teacher', path: '/teacher' },
                { name: 'Student', path: '/student' },
                { name: 'Parent', path: '/parent' },
            ],
        },
        {
            title: 'Academic Management',
            modules: [
                { name: 'Enrollment', path: '/enrollment' },
                { name: 'Attendance', path: '/attendance' },
                { name: 'Timetable', path: '/timetable' },
                { name: 'Exams', path: '/exams' },
            ],
        },
        {
            title: 'Administrative Tools',
            modules: [
                { name: 'Fee Structure', path: '/fee-structure' },
                { name: 'Noticeboard', path: '/noticeboard' },
            ],
        },
        {
            title: 'Library Management',
            modules: [
                { name: 'Library', path: '/library' },
            ],
        },
        {
            title: 'Transportation Management',
            modules: [
                { name: 'Transport', path: '/transport' },
            ],
        },
        {
            title: 'Reports and Analytics',
            modules: [
                { name: 'Reports', path: '/reports' },
            ],
        },
    ];

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#F5F5F5' }}>
            <CssBaseline />

            {/* Sidebar Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 280,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 280,
                        boxSizing: 'border-box',
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                    },
                }}
            >
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <img src="/Logo.jpg" alt="School Logo" style={{ height: 50, marginRight: 10 }} />
                        <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            School Management
                        </Typography>
                    </Box>
                </Toolbar>
                <Divider sx={{ backgroundColor: '#FFFFFF' }} />
                <List>
                    {categories.map((category) => (
                        <React.Fragment key={category.title}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    padding: 2,
                                    fontWeight: 'bold',
                                    color: '#FFC107',
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                }}
                            >
                                {category.title}
                            </Typography>
                            {category.modules.map((module) => (
                                <ListItem
                                    button
                                    key={module.name}
                                    onClick={() => navigate(module.path)}
                                    sx={{
                                        '&:hover': { backgroundColor: '#1B5E20' },
                                    }}
                                >
                                    <ListItemText primary={module.name} />
                                </ListItem>
                            ))}
                            <Divider sx={{ backgroundColor: '#FFFFFF' }} />
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                {/* Top Navigation Bar */}
                <AppBar
                    position="static"
                    sx={{
                        backgroundColor: '#2E7D32',
                        marginBottom: 3,
                        borderRadius: 2,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/')}
                            sx={{
                                backgroundColor: '#FFC107',
                                color: '#2E7D32',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#FFD54F' },
                            }}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>

                {/* Welcome Section */}
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        marginBottom: 3,
                        backgroundColor: '#E8F5E9',
                        borderRadius: 2,
                        textAlign: 'center',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ color: '#1B5E20', fontWeight: 'bold' }}>
                        Welcome to the School Management Dashboard
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1B5E20' }}>
                        Use the navigation menu on the left or the quick links below to access different modules of the School Management System.
                    </Typography>
                </Paper>

                {/* Quick Links Section */}
                {categories.map((category) => (
                    <Box key={category.title} sx={{ marginBottom: 4 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                color: '#2E7D32',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: 2,
                            }}
                        >
                            {category.title}
                        </Typography>
                        <Grid container spacing={3}>
                            {category.modules.map((module) => (
                                <Grid item xs={12} sm={6} md={4} key={module.name}>
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            padding: 3,
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: 2,
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                            '&:hover': {
                                                backgroundColor: '#E8F5E9',
                                                transform: 'scale(1.05)',
                                                transition: 'all 0.3s ease-in-out',
                                            },
                                        }}
                                        onClick={() => navigate(module.path)}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#1B5E20',
                                            }}
                                        >
                                            {module.name}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Dashboard;