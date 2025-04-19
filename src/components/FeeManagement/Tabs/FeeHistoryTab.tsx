import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import DataTable from '../Shared/DataTable';
import config from '../../../config';

interface FeeHistoryTabProps {
    openPopup: (content: React.ReactNode, title: string) => void;
}

const FeeHistoryTab: React.FC<FeeHistoryTabProps> = ({ openPopup }) => {
    const [feeHistory, setFeeHistory] = useState([]);

    const fetchFeeHistory = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/FeeHistory`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFeeHistory(data);
            } else {
                console.error('Failed to fetch fee history');
            }
        } catch (error) {
            console.error('Error fetching fee history:', error);
        }
    };

    useEffect(() => {
        fetchFeeHistory();
    }, []);

    const handleViewDetails = (item: any) => {
        openPopup(<div>Details for Payment ID: {item.paymentId}</div>, 'Fee History Details');
    };

    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    List of Fee History:
                </Typography>
                <DataTable
                    columns={['paymentId', 'studentName', 'className', 'amountPaid', 'paymentDate']}
                    data={feeHistory}
                    onEdit={handleViewDetails} // View details instead of editing
                    onDelete={() => {}} // No delete action for history
                />
            </CardContent>
        </Card>
    );
};

export default FeeHistoryTab;