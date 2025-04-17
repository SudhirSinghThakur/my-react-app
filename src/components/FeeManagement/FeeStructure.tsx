import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FeeConfiguration from './FeeConfiguration';
import FeePayment from './FeePayment';
import FeeReports from './FeeReports';
import FeeHistory from './FeeHistory';

const FeeStructure: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number | null>(null); // Track the active tab
    const [openDialog, setOpenDialog] = useState(false); // Track dialog state

    const handleOpenDialog = (tabIndex: number) => {
        setActiveTab(tabIndex);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setActiveTab(null);
    };

    return (
        <Box sx={{ padding: 3 }}>
             <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Fee Management
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage fee for all grades.
                </Typography>
            </Paper>

            {/* Grid Layout for Cards */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <CardActionArea onClick={() => handleOpenDialog(0)}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                    Fee Configuration
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#757575', marginTop: 1 }}>
                                    Configure fee structures for classes and terms.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <CardActionArea onClick={() => handleOpenDialog(1)}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                    Fee Payment
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#757575', marginTop: 1 }}>
                                    Record and manage student fee payments.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <CardActionArea onClick={() => handleOpenDialog(2)}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                    Fee Reports
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#757575', marginTop: 1 }}>
                                    Generate detailed fee collection reports.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: 3,
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <CardActionArea onClick={() => handleOpenDialog(3)}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                    Fee History
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#757575', marginTop: 1 }}>
                                    View payment history for students.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

            {/* Dialog for Popup */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <Box
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        padding: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6">
                        {activeTab === 0 && 'Fee Configuration'}
                        {activeTab === 1 && 'Fee Payment'}
                        {activeTab === 2 && 'Fee Reports'}
                        {activeTab === 3 && 'Fee History'}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            color: '#FFFFFF',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <DialogContent sx={{ padding: 3 }}>
                    {activeTab === 0 && <FeeConfiguration />}
                    {activeTab === 1 && <FeePayment />}
                    {activeTab === 2 && <FeeReports />}
                    {activeTab === 3 && <FeeHistory />}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default FeeStructure;