import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
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
import { useNavigate, Outlet } from 'react-router-dom';
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

    // Sidebar categories
    const categories = [
        {
            title: 'User Management',
            modules: [
                { name: 'Admin', path: '/dashboard/admin', icon: <PeopleIcon /> },
                { name: 'Teacher', path: '/dashboard/teacher', icon: <SchoolIcon /> },
                { name: 'Student', path: '/dashboard/student', icon: <SchoolIcon /> },
                { name: 'Parent', path: '/dashboard/parent', icon: <PeopleIcon /> },
            ],
        },
        {
            title: 'Academic Management',
            modules: [
                { name: 'Enrollment', path: '/dashboard/enrollment', icon: <DashboardIcon /> },
                { name: 'Attendance', path: '/dashboard/attendance', icon: <EventNoteIcon /> },
                { name: 'Timetable', path: '/dashboard/timetable', icon: <EventNoteIcon /> },
                { name: 'Exams', path: '/dashboard/exams', icon: <EventNoteIcon /> },
            ],
        },
        {
            title: 'Administrative Tools',
            modules: [
                { name: 'Fee Structure', path: '/dashboard/fee-structure', icon: <AttachMoneyIcon /> },
                { name: 'Noticeboard', path: '/dashboard/noticeboard', icon: <EventNoteIcon /> },
            ],
        },
        {
            title: 'Library Management',
            modules: [
                { name: 'Library', path: '/dashboard/library', icon: <LibraryBooksIcon /> },
            ],
        },
        {
            title: 'Transportation Management',
            modules: [
                { name: 'Transport', path: '/dashboard/transport', icon: <DirectionsBusIcon /> },
            ],
        },
        {
            title: 'Reports and Analytics',
            modules: [
                { name: 'Reports', path: '/dashboard/reports', icon: <BarChartIcon /> },
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
                        display: 'flex',
                        flexDirection: 'column',
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
                <List>
                    {categories.map((category) => (
                        <React.Fragment key={category.title}>
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

                {/* Render Child Routes */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default Dashboard;