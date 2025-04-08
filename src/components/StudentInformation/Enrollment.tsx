import React, { useState, useEffect, useMemo } from 'react';
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
    TablePagination,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
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
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState(''); // Selected class for filtering
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

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

    // Handle pagination changes
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    // Filtered students based on search term and selected class
    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesSearch = student.studentName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesClass = selectedClass
                ? student.class === selectedClass
                : true; // If no class is selected, show all
            return matchesSearch && matchesClass;
        });
    }, [students, searchTerm, selectedClass]);

    // Paginated students
    const paginatedStudents = useMemo(
        () =>
            filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [filteredStudents, page, rowsPerPage]
    );

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            {/* Header Section */}
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    textAlign: 'center',
                    marginBottom: 3,
                    backgroundColor: '#E8F5E9',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Student Enrollment
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2, color: '#616161' }}>
                    Manage student profiles and enrollment details.
                </Typography>
                <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{
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
                        startIcon={<UploadFileIcon />}
                        component="label"
                        sx={{
                            backgroundColor: '#FFC107',
                            color: '#2E7D32',
                            '&:hover': { backgroundColor: '#FFB300' },
                        }}
                    >
                        Bulk Upload
                        <input type="file" accept=".csv, .xlsx" hidden />
                    </Button>
                </Box>
            </Paper>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Filters Section */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                {/* Search Bar */}
                <TextField
                    label="Search Students"
                    variant="outlined"
                    fullWidth
                    placeholder="Search by name"
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ marginRight: 1, color: '#616161' }} />,
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Class Filter Dropdown */}
                <FormControl fullWidth>
                    <InputLabel>Filter by Class</InputLabel>
                    <Select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        label="Filter by Class"
                    >
                        <MenuItem value="">All Classes</MenuItem>
                        <MenuItem value="Nursery">Nursery</MenuItem>
                        <MenuItem value="KG - I">LKG</MenuItem>
                        <MenuItem value="KG - II">UKG</MenuItem>
                        <MenuItem value="1st">Class 1</MenuItem>
                        <MenuItem value="2nd">Class 2</MenuItem>
                        <MenuItem value="3rd">Class 3</MenuItem>
                        <MenuItem value="4th">Class 4</MenuItem>
                        <MenuItem value="5th">Class 5</MenuItem>
                        <MenuItem value="6th">Class 6</MenuItem>
                        <MenuItem value="7th">Class 7</MenuItem>
                        <MenuItem value="8th">Class 8</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Student Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                Date of Birth
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                Father's Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                Mother's Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>Class</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedStudents.length > 0 ? (
                            paginatedStudents.map((student) => (
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

            {/* Pagination */}
            <TablePagination
                component="div"
                count={filteredStudents.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />

            {/* Add New Student Dialog */}
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="lg">
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#2E7D32' }}>
                    Add New Student
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {Object.keys(formData).map((key) => (
                            <Grid item xs={12} sm={6} key={key}>
                                <TextField
                                    label={key
                                        .replace(/([A-Z])/g, ' $1')
                                        .replace(/^./, (str) => str.toUpperCase())}
                                    name={key}
                                    fullWidth
                                    value={(formData as any)[key]}
                                    onChange={handleChange}
                                />
                            </Grid>
                        ))}
                    </Grid>
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
                        onClick={() => {}}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Enrollment;