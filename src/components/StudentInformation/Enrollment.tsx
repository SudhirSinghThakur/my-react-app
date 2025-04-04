import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

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
    admissionClass: string;
}

const Enrollment: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
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
        admissionClass: '',
    });
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (
            formData.studentName &&
            formData.dateOfBirth &&
            formData.fatherName &&
            formData.motherName &&
            formData.admissionClass
        ) {
            setStudents([
                ...students,
                { id: students.length + 1, ...formData },
            ]);
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
                admissionClass: '',
            });
            setOpen(false); // Close the modal after submission
        }
    };

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
                    onClick={() => setOpen(true)}
                >
                    Add New Student
                </Button>
            </Paper>

            {/* Enrollment Form Modal */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>Add New Student</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name of Student"
                                variant="outlined"
                                fullWidth
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date of Birth"
                                type="date"
                                variant="outlined"
                                fullWidth
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Father's Name"
                                variant="outlined"
                                fullWidth
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Mother's Name"
                                variant="outlined"
                                fullWidth
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Father's Occupation"
                                variant="outlined"
                                fullWidth
                                name="fatherOccupation"
                                value={formData.fatherOccupation}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Mother's Occupation"
                                variant="outlined"
                                fullWidth
                                name="motherOccupation"
                                value={formData.motherOccupation}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Father's Qualification"
                                variant="outlined"
                                fullWidth
                                name="fatherQualification"
                                value={formData.fatherQualification}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Mother's Qualification"
                                variant="outlined"
                                fullWidth
                                name="motherQualification"
                                value={formData.motherQualification}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Residential Address"
                                variant="outlined"
                                fullWidth
                                name="addressResidential"
                                value={formData.addressResidential}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Office Address"
                                variant="outlined"
                                fullWidth
                                name="addressOffice"
                                value={formData.addressOffice}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Residential Phone No."
                                variant="outlined"
                                fullWidth
                                name="phoneResidential"
                                value={formData.phoneResidential}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Office Phone No."
                                variant="outlined"
                                fullWidth
                                name="phoneOffice"
                                value={formData.phoneOffice}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name and Address of Guardian"
                                variant="outlined"
                                fullWidth
                                name="guardianName"
                                value={formData.guardianName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nationality"
                                variant="outlined"
                                fullWidth
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Religion"
                                variant="outlined"
                                fullWidth
                                name="religion"
                                value={formData.religion}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Class in which admission sought"
                                variant="outlined"
                                fullWidth
                                name="admissionClass"
                                value={formData.admissionClass}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
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
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.studentName}</TableCell>
                                    <TableCell>{student.dateOfBirth}</TableCell>
                                    <TableCell>{student.fatherName}</TableCell>
                                    <TableCell>{student.motherName}</TableCell>
                                    <TableCell>{student.admissionClass}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default Enrollment;