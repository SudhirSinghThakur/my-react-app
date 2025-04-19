import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import DataTable from '../Shared/DataTable';
import config from '../../../config';

interface FeeReportsTabProps {
    openPopup: (content: React.ReactNode, title: string) => void;
}

const FeeReportsTab: React.FC<FeeReportsTabProps> = ({ openPopup }) => {
    const [feeReports, setFeeReports] = useState([]);

    const fetchFeeReports = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/FeeReports`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFeeReports(data);
            } else {
                console.error('Failed to fetch fee reports');
            }
        } catch (error) {
            console.error('Error fetching fee reports:', error);
        }
    };

    useEffect(() => {
        fetchFeeReports();
    }, []);

    const handleViewDetails = (item: any) => {
        openPopup(<div>Details for Report ID: {item.reportId}</div>, 'Fee Report Details');
    };

    return (
        <Card elevation={3}>
            <CardContent>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openPopup(<div>Generate Fee Report</div>, 'Generate Fee Report')}
                    sx={{ marginBottom: 2 }}
                >
                    Generate Fee Report
                </Button>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    List of Fee Reports:
                </Typography>
                <DataTable
                    columns={['reportId', 'reportName', 'generatedDate']}
                    data={feeReports}
                    onEdit={handleViewDetails} // View details instead of editing
                    onDelete={() => {}} // No delete action for reports
                />
            </CardContent>
        </Card>
    );
};

export default FeeReportsTab;