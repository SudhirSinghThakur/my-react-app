import React, { useState } from 'react';
import { Box, Paper, Typography, Tabs, Tab } from '@mui/material';
import FeeConfigurationTab from './Tabs/FeeConfigurationTab';
import FeePaymentTab from './Tabs/FeePaymentTab';
import FeeReportsTab from './Tabs/FeeReportsTab';
import FeeHistoryTab from './Tabs/FeeHistoryTab';   
import Popup from './Shared/Popup';

const FeeStructure: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0); // Track the active tab
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup visibility
    const [popupContent, setPopupContent] = useState<React.ReactNode>(null); // Content for the popup
    const [popupTitle, setPopupTitle] = useState(''); // Title for the popup

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const openPopup = (content: React.ReactNode, title: string) => {
        setPopupContent(content);
        setPopupTitle(title);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setPopupContent(null);
        setPopupTitle('');
    };

    return (
        <Box sx={{ padding: 3 }}>
            {/* Header */}
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Fee Management
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage fee-related operations for all grades.
                </Typography>
            </Paper>

            {/* Tabs */}
            <Paper elevation={3} sx={{ marginBottom: 3 }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Fee Configuration" />
                    <Tab label="Fee Payment" />
                    <Tab label="Fee Reports" />
                    <Tab label="Fee History" />
                </Tabs>
            </Paper>

            {/* Tab Content */}
            <Box sx={{ padding: 3 }}>
                {activeTab === 0 && <FeeConfigurationTab openPopup={openPopup} />}
                {activeTab === 1 && <FeePaymentTab openPopup={openPopup} />}
                {activeTab === 2 && <FeeReportsTab openPopup={openPopup} />}
                {activeTab === 3 && <FeeHistoryTab openPopup={openPopup} />}
            </Box>

            {/* Popup */}
            <Popup isOpen={isPopupOpen} title={popupTitle} onClose={closePopup}>
                {popupContent}
            </Popup>
        </Box>
    );
};

export default FeeStructure;