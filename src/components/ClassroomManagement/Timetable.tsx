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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import config from '../../config'; // Import the config file

interface ExamEntry {
    id: number;
    grade: string;
    examType: string;
    subject: string;
    date: string;
}

interface TimetableRow {
    date: string;
    subject: string;
}

const Timetable: React.FC = () => {
    const [exams, setExams] = useState<ExamEntry[]>([]); // Exam timetable data
    const [openAddDialog, setOpenAddDialog] = useState(false); // Add dialog state
    const [openEditDialog, setOpenEditDialog] = useState(false); // Edit dialog state
    const [grade, setGrade] = useState<string>(''); // Selected grade
    const [examType, setExamType] = useState<string>(''); // Selected exam type
    const [rows, setRows] = useState<TimetableRow[]>([{ date: '', subject: '' }]); // Dynamic rows
    const [editExamId, setEditExamId] = useState<number | null>(null); // ID of the exam being edited

    // Fetch Exam Timetable (GET)
    const fetchExamTimetable = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/ExamSchedule`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setExams(data);
            } else {
                console.error('Failed to fetch exam timetable');
            }
        } catch (error) {
            console.error('Error fetching exam timetable:', error);
        }
    };

    // Add or Edit Exam Timetable (POST or PUT)
    const handleSubmit = async () => {
        if (grade && examType && rows.every((row) => row.date && row.subject)) {
            const payload = {
                grade,
                examType,
                examDetails: rows,
            };

            try {
                const url = editExamId
                    ? `${config.BASE_URL}/ExamSchedule/${editExamId}`
                    : `${config.BASE_URL}/ExamSchedule`;
                const method = editExamId ? 'PUT' : 'POST';

                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    console.log(`Exam timetable ${editExamId ? 'updated' : 'added'} successfully!`);
                    setGrade('');
                    setExamType('');
                    setRows([{ date: '', subject: '' }]); // Reset the form
                    setOpenAddDialog(false);
                    setOpenEditDialog(false);
                    setEditExamId(null);
                    fetchExamTimetable(); // Refresh the timetable
                } else {
                    console.error(`Failed to ${editExamId ? 'update' : 'add'} exam timetable.`);
                }
            } catch (error) {
                console.error(`Error ${editExamId ? 'updating' : 'adding'} exam timetable:`, error);
            }
        } else {
            console.error('Please fill out all fields.');
        }
    };

    // Open Edit Dialog with Prefilled Data
    const handleEditClick = async (exam: ExamEntry) => {
        try {
            // Fetch the specific timetable details from the backend
            const response = await fetch(`${config.BASE_URL}/ExamSchedule/${exam.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();

                // Format the date to 'YYYY-MM-DD' for each row
                const formattedRows = data.timetable.map((row: TimetableRow) => ({
                    ...row,
                    date: row.date.split('T')[0], // Extract only the date part
                }));

                // Update the state with the fetched data
                setGrade(data.grade);
                setExamType(data.examType);
                setRows(formattedRows); // Ensure timetable is an array with formatted dates
                setEditExamId(exam.id);
                setOpenEditDialog(true);
            } else {
                console.error('Failed to fetch timetable details');
            }
        } catch (error) {
            console.error('Error fetching timetable details:', error);
        }
    };

    // Delete an Exam Timetable (DELETE)
    const handleDeleteExam = async (id: number) => {
        try {
            const response = await fetch(`${config.BASE_URL}/ExamSchedule/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                console.log('Exam timetable deleted successfully!');
                fetchExamTimetable(); // Refresh the timetable
            } else {
                console.error('Failed to delete exam timetable.');
            }
        } catch (error) {
            console.error('Error deleting exam timetable:', error);
        }
    };

    // Handle adding a new row
    const handleAddRow = () => {
        setRows([...rows, { date: '', subject: '' }]);
    };

    // Handle removing a row
    const handleRemoveRow = (index: number) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    // Handle updating a row
    const handleRowChange = (index: number, field: keyof TimetableRow, value: string) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    useEffect(() => {
        fetchExamTimetable(); // Fetch exam timetable on component mount
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Timetable Management
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage exam timetables for all grades.
                </Typography>
            </Paper>

            <Box sx={{ marginBottom: 3 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={() => {
                        setGrade('');
                        setExamType('');
                        setRows([{ date: '', subject: '' }]); // Reset form for adding
                        setOpenAddDialog(true);
                    }}
                >
                    Add Exam Timetable
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Exam Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exams.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell>{exam.id}</TableCell>
                                <TableCell>{exam.grade}</TableCell>
                                <TableCell>{exam.examType}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginRight: 1 }}
                                        onClick={() => handleEditClick(exam)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteExam(exam.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Exam Dialog */}
            <Dialog
                open={openAddDialog || openEditDialog}
                onClose={() => {
                    setOpenAddDialog(false);
                    setOpenEditDialog(false);
                }}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{editExamId ? 'Edit Exam Timetable' : 'Add New Exam Timetable'}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Grade</InputLabel>
                        <Select
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        >
                            <MenuItem value="Nursery">Nursery</MenuItem>
                            <MenuItem value="Class 1">Class 1</MenuItem>
                            <MenuItem value="Class 2">Class 2</MenuItem>
                            <MenuItem value="Class 3">Class 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                            value={examType}
                            onChange={(e) => setExamType(e.target.value)}
                        >
                            <MenuItem value="Quarterly">Quarterly</MenuItem>
                            <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                            <MenuItem value="Annual">Annual</MenuItem>
                        </Select>
                    </FormControl>

                    {rows.map((row, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                            <TextField
                                label="Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={row.date}
                                onChange={(e) => handleRowChange(index, 'date', e.target.value)}
                            />
                            <TextField
                                label="Subject"
                                fullWidth
                                value={row.subject}
                                onChange={(e) => handleRowChange(index, 'subject', e.target.value)}
                            />
                            <IconButton
                                color="error"
                                onClick={() => handleRemoveRow(index)}
                                disabled={rows.length === 1}
                            >
                                <RemoveCircle />
                            </IconButton>
                        </Box>
                    ))}

                    <Button
                        variant="outlined"
                        startIcon={<AddCircle />}
                        onClick={handleAddRow}
                        sx={{ marginBottom: 3 }}
                    >
                        Add Row
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenAddDialog(false);
                            setOpenEditDialog(false);
                        }}
                        color="secondary"
                    >
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
                        {editExamId ? 'Save Changes' : 'Submit Timetable'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Timetable;