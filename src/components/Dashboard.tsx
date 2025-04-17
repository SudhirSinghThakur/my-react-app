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
    ListItemIcon,
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

const drawerWidth = 260;

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
                { name: 'Fee Management', path: '/dashboard/fee-structure', icon: <AttachMoneyIcon /> },
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
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />

            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                    },
                }}
            >
                <Box sx={{ textAlign: 'center', py: 2, backgroundColor: '#1B5E20' }}>
                    <Typography variant="h6" fontWeight="bold" color="#FFFFFF">
                        Dashboard
                    </Typography>
                </Box>

                <Divider sx={{ backgroundColor: '#C8E6C9' }} />

                <List>
                    {categories.map((category) => (
                        <Box key={category.title}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    px: 2,
                                    pt: 2,
                                    pb: 1,
                                    color: '#C8E6C9',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {category.title}
                            </Typography>
                            {category.modules.map((module) => (
                                <ListItem
                                    key={module.name}
                                    button
                                    onClick={() => navigate(module.path)}
                                    sx={{
                                        '&:hover': { backgroundColor: '#1B5E20' },
                                        px: 3,
                                    }}
                                >
                                    <ListItemIcon sx={{ color: '#FFFFFF', minWidth: 36 }}>
                                        {module.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={module.name}
                                        primaryTypographyProps={{
                                            fontSize: '0.9rem',
                                            fontWeight: 500,
                                        }}
                                    />
                                </ListItem>
                            ))}
                            <Divider sx={{ backgroundColor: '#C8E6C9' }} />
                        </Box>
                    ))}
                </List>
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#F1F8E9',
                    minHeight: '100vh',
                }}
            >
                {/* Top NavBar */}
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                        backgroundColor: '#2E7D32',
                        borderRadius: 0,
                        paddingLeft: `${drawerWidth}px`, // Ensures alignment with the drawer
                    }}
                >
                    <Toolbar>
                    <Typography variant="h6" textAlign={'left'} sx={{ flexGrow: 1 }} fontWeight="bold" color="#FFFFFF">
                        Dada Vikram Public School
                    </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                            sx={{ '&:hover': { backgroundColor: '#1B5E20' } }}
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
                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
