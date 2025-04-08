import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    CssBaseline,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import BarChartIcon from '@mui/icons-material/BarChart';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Categorized modules
    const categories = [
        {
            title: 'User Management',
            modules: [
                { name: 'Admin', path: '/admin', icon: <PeopleIcon /> },
                { name: 'Teacher', path: '/teacher', icon: <SchoolIcon /> },
                { name: 'Student', path: '/student', icon: <SchoolIcon /> },
                { name: 'Parent', path: '/parent', icon: <PeopleIcon /> },
            ],
        },
        {
            title: 'Academic Management',
            modules: [
                { name: 'Enrollment', path: '/enrollment', icon: <DashboardIcon /> },
                { name: 'Attendance', path: '/attendance', icon: <EventNoteIcon /> },
                { name: 'Timetable', path: '/timetable', icon: <EventNoteIcon /> },
                { name: 'Exams', path: '/exams', icon: <EventNoteIcon /> },
            ],
        },
        {
            title: 'Administrative Tools',
            modules: [
                { name: 'Fee Structure', path: '/fee-structure', icon: <AttachMoneyIcon /> },
                { name: 'Noticeboard', path: '/noticeboard', icon: <EventNoteIcon /> },
            ],
        },
        {
            title: 'Library Management',
            modules: [
                { name: 'Library', path: '/library', icon: <LibraryBooksIcon /> },
            ],
        },
        {
            title: 'Transportation Management',
            modules: [
                { name: 'Transport', path: '/transport', icon: <DirectionsBusIcon /> },
            ],
        },
        {
            title: 'Reports and Analytics',
            modules: [
                { name: 'Reports', path: '/reports', icon: <BarChartIcon /> },
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
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column', // Ensure content stacks vertically
                        height: '100vh', // Ensure the sidebar takes the full height of the viewport
                        overflow: 'hidden', // Prevent scrolling
                    },
                }}
            >
                {/* Branding Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                        backgroundColor: '#1B5E20',
                    }}
                >
                    <img
                        src="/Logo.jpg"
                        alt="School Logo"
                        style={{ height: 50, marginRight: 10 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#FFFFFF',
                        }}
                    >
                        School Management
                    </Typography>
                </Box>
                <Divider sx={{ backgroundColor: '#FFFFFF' }} />

                {/* Sidebar Items */}
                <List
                    sx={{
                        flexGrow: 1, // Allow the list to grow and fill the remaining space
                    }}
                >
                    {categories.map((category) => (
                        <React.Fragment key={category.title}>
                            {/* Section Title */}
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    padding: 1,
                                    fontWeight: 'bold',
                                    color: '#FFC107',
                                    textTransform: 'uppercase',
                                    fontSize: '0.8rem',
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
                                        '&.Mui-selected': {
                                            backgroundColor: '#FFC107',
                                            color: '#2E7D32',
                                            '&:hover': { backgroundColor: '#FFB300' },
                                        },
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            color: '#FFFFFF',
                                            marginRight: 2,
                                        }}
                                    >
                                        {module.icon}
                                    </IconButton>
                                    <ListItemText
                                        primary={module.name}
                                        primaryTypographyProps={{
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </ListItem>
                            ))}
                            <Divider sx={{ backgroundColor: '#FFFFFF' }} />
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
                    
            {/* Main Content */}
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {/* Top Navigation Bar */}
                <AppBar
                    position="static"
                    sx={{
                        backgroundColor: '#2E7D32',
                        marginBottom: 2,
                        borderRadius: 1,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                            sx={{
                                '&:hover': { backgroundColor: '#1B5E20' },
                            }}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

                {/* Quick Links Section */}
                <Grid container spacing={2}>
                    {categories.flatMap((category) =>
                        category.modules.map((module) => (
                            <Grid item xs={6} sm={4} md={3} key={module.name}>
                                <Card
                                    sx={{
                                        borderRadius: 1,
                                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                            transition: 'all 0.2s ease-in-out',
                                        },
                                    }}
                                >
                                    <CardActionArea onClick={() => navigate(module.path)}>
                                        <CardMedia
                                            sx={{
                                                height: 80,
                                                backgroundColor: '#E8F5E9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {module.icon}
                                        </CardMedia>
                                        <CardContent>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    color: '#1B5E20',
                                                }}
                                            >
                                                {module.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;