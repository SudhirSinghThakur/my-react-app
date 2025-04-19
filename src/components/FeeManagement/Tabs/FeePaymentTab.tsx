import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import DataTable from '../Shared/DataTable';
import config from '../../../config';

interface FeePaymentTabProps {
    openPopup: (content: React.ReactNode, title: string) => void;
}

const FeePaymentTab: React.FC<FeePaymentTabProps> = ({ openPopup }) => {
    const [feePayments, setFeePayments] = useState([]);

    const fetchFeePayments = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/FeePayment`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFeePayments(data);
            } else {
                console.error('Failed to fetch fee payments');
            }
        } catch (error) {
            console.error('Error fetching fee payments:', error);
        }
    };

    useEffect(() => {
        fetchFeePayments();
    }, []);

    const handleEdit = (item: any) => {
        openPopup(<div>Edit Payment for {item.studentName}</div>, 'Edit Fee Payment');
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                const response = await fetch(`${config.BASE_URL}/FeePayment/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    fetchFeePayments();
                } else {
                    console.error('Failed to delete payment');
                }
            } catch (error) {
                console.error('Error deleting payment:', error);
            }
        }
    };

    return (
        <Card elevation={3}>
            <CardContent>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openPopup(<div>Add Fee Payment</div>, 'Add Fee Payment')}
                    sx={{ marginBottom: 2 }}
                >
                    Add Fee Payment
                </Button>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    List of Fee Payments:
                </Typography>
                <DataTable
                    columns={['paymentId', 'studentName', 'className', 'amountPaid', 'paymentDate']}
                    data={feePayments}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </CardContent>
        </Card>
    );
};

export default FeePaymentTab;