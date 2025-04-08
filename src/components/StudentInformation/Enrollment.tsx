import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
} from '@mui/material';
import config from '../../config'; // Import the config file

interface Student {
    id: number;
    studentName: string;
    dateOfBirth: string;
    fatherName: string;
    motherName: string;
    fatherOccupation: string;
    motherOccupation: string;
    fatherQualification: string;
    motherQualification: string;
    addressResidential: string;
    addressOffice: string;
    phoneResidential: string;
    phoneOffice: string;
    guardianName: string;
    nationality: string;
    religion: string;
    class: string;
}

const Enrollment: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        dateOfBirth: '',
        fatherName: '',
        motherName: '',
        fatherOccupation: '',
        motherOccupation: '',
        fatherQualification: '',
        motherQualification: '',
        addressResidential: '',
        addressOffice: '',
        phoneResidential: '',
        phoneOffice: '',
        guardianName: '',
        nationality: '',
        religion: '',
        class: '',
    });

    // Fetch enrolled students
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${config.BASE_URL}/Students`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStudents(data); // Update the student list
            } else {
                console.error('Failed to fetch students');
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (
            formData.studentName &&
            formData.dateOfBirth &&
            formData.fatherName &&
            formData.motherName &&
            formData.class
        ) {
            setLoading(true);
            try {
                const response = await fetch(`${config.BASE_URL}/Students`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Student added successfully!');
                    fetchStudents(); // Refresh the student list
                    setOpenAdd(false); // Close the dialog
                    setFormData({
                        studentName: '',
                        dateOfBirth: '',
                        fatherName: '',
                        motherName: '',
                        fatherOccupation: '',
                        motherOccupation: '',
                        fatherQualification: '',
                        motherQualification: '',
                        addressResidential: '',
                        addressOffice: '',
                        phoneResidential: '',
                        phoneOffice: '',
                        guardianName: '',
                        nationality: '',
                        religion: '',
                        class: '',
                    });
                } else {
                    console.error('Failed to add student');
                    alert('Failed to add student. Please try again.');
                }
            } catch (error) {
                console.error('Error adding student:', error);
                alert('An error occurred while adding the student.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    // Handle file upload
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const response = await fetch(`${config.BASE_URL}/Students/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully!');
                fetchStudents(); // Fetch the updated list of students
            } else {
                console.error('Failed to upload file');
                alert('Failed to upload file. Please check the file format.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        } finally {
            setLoading(false);
            event.target.value = ''; // Reset file input field
        }
    };

    // Fetch students on component mount
    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Student Enrollment
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage student profiles and enrollment details.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: 3,
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={() => setOpenAdd(true)}
                >
                    Add New Student
                </Button>
                <Button
                    variant="contained"
                    component="label"
                    sx={{
                        marginTop: 3,
                        marginLeft: 2,
                        backgroundColor: '#FFC107',
                        color: '#2E7D32',
                        '&:hover': { backgroundColor: '#FFB300' },
                    }}
                >
                    Bulk Upload
                    <input
                        type="file"
                        accept=".csv, .xlsx"
                        hidden
                        onChange={handleFileUpload}
                    />
                </Button>
            </Paper>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Add New Student Dialog */}
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="md">
                <DialogTitle>Add New Student</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="studentName"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.studentName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        InputLabelProps={{ shrink: true }}
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Father's Name"
                        name="fatherName"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.fatherName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Mother's Name"
                        name="motherName"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.motherName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Father's Occupation"
                        name="fatherOccupation"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Mother's Occupation"
                        name="motherOccupation"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.motherOccupation}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Father's Qualification"
                        name="fatherQualification"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.fatherQualification}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Mother's Qualification"
                        name="motherQualification"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.motherQualification}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Residential Address"
                        name="addressResidential"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.addressResidential}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Office Address"
                        name="addressOffice"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.addressOffice}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Residential Phone"
                        name="phoneResidential"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.phoneResidential}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Office Phone"
                        name="phoneOffice"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.phoneOffice}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Guardian's Name"
                        name="guardianName"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.guardianName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Nationality"
                        name="nationality"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.nationality}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Religion"
                        name="religion"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.religion}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Class for Admission"
                        name="admissionClass"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={formData.class}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAdd(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#2E7D32',
                            color: '#FFFFFF',
                            '&:hover': { backgroundColor: '#1B5E20' },
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* List of Enrolled Students */}
            <Paper elevation={3} sx={{ padding: 4, marginTop: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: 2 }}>
                    Enrolled Students
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Father's Name</TableCell>
                                <TableCell>Mother's Name</TableCell>
                                <TableCell>Class</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.id}</TableCell>
                                        <TableCell>{student.studentName}</TableCell>
                                        <TableCell>{student.dateOfBirth}</TableCell>
                                        <TableCell>{student.fatherName}</TableCell>
                                        <TableCell>{student.motherName}</TableCell>
                                        <TableCell>{student.class}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No students found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default Enrollment;