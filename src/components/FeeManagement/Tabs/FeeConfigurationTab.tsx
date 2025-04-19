import React, { useEffect, useState } from 'react';
import {
    Button,
    Typography,
    Card,
    CardContent,
    TextField,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent,
} from '@mui/material';
import DataTable from '../Shared/DataTable';
import config from '../../../config';

interface FeeConfigurationTabProps {
    openPopup: (content: React.ReactNode, title: string) => void;
}

// Define the type for formData
interface FormData {
    id: number | null;
    className: string;
    academicYear: string;
    admissionFee: number;
    tuitionFee: number;
    otherFee: number;
}

const FeeConfigurationTab: React.FC<FeeConfigurationTabProps> = ({ openPopup }) => {
    const [feeConfigurations, setFeeConfigurations] = useState([]);
    const [formData, setFormData] = useState<FormData>({
        id: null,
        className: '',
        academicYear: '',
        admissionFee: 0,
        tuitionFee: 0,
        otherFee: 0,
    });

    // Fetch Fee Configurations
    const fetchFeeConfigurations = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/FeeConfiguration`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFeeConfigurations(data);
            } else {
                console.error('Failed to fetch fee configurations');
            }
        } catch (error) {
            console.error('Error fetching fee configurations:', error);
        }
    };

    useEffect(() => {
        fetchFeeConfigurations();
    }, []);

    // Add Fee Configuration
    const handleAdd = () => {
        const emptyData: FormData = {
            id: null,
            className: '',
            academicYear: '',
            admissionFee: 0,
            tuitionFee: 0,
            otherFee: 0,
        };

        openPopup(
            <FeeConfigurationForm
                formData={emptyData}
                setFormData={setFormData}
                onSave={fetchFeeConfigurations}
                onClose={() => openPopup(null, '')}
            />,
            'Add Fee Configuration'
        );
    };

    // Edit Fee Configuration
    const handleEdit = (item: any) => {
        const updatedFormData: FormData = {
            id: item.id,
            className: item.className,
            academicYear: item.academicYear,
            admissionFee: item.admissionFee,
            tuitionFee: item.tuitionFee,
            otherFee: item.otherFee,
        };

        setFormData(updatedFormData);

        openPopup(
            <FeeConfigurationForm
                formData={updatedFormData}
                setFormData={setFormData}
                onSave={fetchFeeConfigurations}
                onClose={() => openPopup(null, '')}
            />,
            'Edit Fee Configuration'
        );
    };

    // Delete Fee Configuration
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this fee configuration?')) {
            try {
                const response = await fetch(`${config.BASE_URL}/FeeConfiguration/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    fetchFeeConfigurations();
                } else {
                    console.error('Failed to delete fee configuration');
                }
            } catch (error) {
                console.error('Error deleting fee configuration:', error);
            }
        }
    };

    return (
        <Card elevation={3}>
            <CardContent>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    sx={{ marginBottom: 2 }}
                >
                    Add Fee Configuration
                </Button>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    List of Fee Configurations:
                </Typography>
                <DataTable
                    columns={['className', 'academicYear', 'admissionFee', 'tuitionFee', 'otherFee']}
                    data={feeConfigurations}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </CardContent>
        </Card>
    );
};

const FeeConfigurationForm: React.FC<{
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onSave: () => void;
    onClose: () => void;
}> = ({ formData: initialFormData, setFormData, onSave, onClose }) => {
    const [formData, updateFormData] = useState<FormData>(initialFormData);

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateFormData((prev: FormData) => ({
            ...prev,
            [name]: ['admissionFee', 'tuitionFee', 'otherFee'].includes(name)
                ? parseFloat(value) || 0
                : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        updateFormData((prev: FormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            className: formData.className,
            academicYear: formData.academicYear,
            admissionFee: formData.admissionFee,
            tuitionFee: formData.tuitionFee,
            otherFee: formData.otherFee,
        };

        try {
            const response = await fetch(
                formData.id
                    ? `${config.BASE_URL}/FeeConfiguration/${formData.id}`
                    : `${config.BASE_URL}/FeeConfiguration`,
                {
                    method: formData.id ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (response.ok) {
                onSave();
                onClose();
            } else {
                console.error('Failed to save fee configuration');
            }
        } catch (error) {
            console.error('Error saving fee configuration:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                    name="className"
                    value={formData.className || ''}
                    onChange={handleSelectChange}
                >
                    <MenuItem value="">Select a Class</MenuItem>
                    <MenuItem value="Nursery">Nursery</MenuItem>
                    <MenuItem value="KG - I">KG - I</MenuItem>
                    <MenuItem value="KG - II">KG - II</MenuItem>
                    <MenuItem value="1st">1st</MenuItem>
                    <MenuItem value="2nd">2nd</MenuItem>
                    <MenuItem value="3rd">3rd</MenuItem>
                    <MenuItem value="4th">4th</MenuItem>
                    <MenuItem value="5th">5th</MenuItem>
                    <MenuItem value="6th">6th</MenuItem>
                    <MenuItem value="7th">7th</MenuItem>
                    <MenuItem value="8th">8th</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Academic Year</InputLabel>
                <Select
                    name="academicYear"
                    value={formData.academicYear || ''}
                    onChange={handleSelectChange}
                >
                    <MenuItem value="2021-2022">2021-2022</MenuItem>
                    <MenuItem value="2022-2023">2022-2023</MenuItem>
                    <MenuItem value="2023-2024">2023-2024</MenuItem>
                    <MenuItem value="2024-2025">2024-2025</MenuItem>
                    <MenuItem value="2025-2026">2025-2026</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Admission Fee"
                name="admissionFee"
                type="number"
                value={formData.admissionFee || ''}
                onChange={handleTextFieldChange}
                fullWidth
            />

            <TextField
                label="Tuition Fee"
                name="tuitionFee"
                type="number"
                value={formData.tuitionFee || ''}
                onChange={handleTextFieldChange}
                fullWidth
            />

            <TextField
                label="Other Fee"
                name="otherFee"
                type="number"
                value={formData.otherFee || ''}
                onChange={handleTextFieldChange}
                fullWidth
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="contained" color="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default FeeConfigurationTab;