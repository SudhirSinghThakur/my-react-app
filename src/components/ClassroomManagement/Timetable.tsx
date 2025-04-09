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
    const [editExam, setEditExam] = useState<ExamEntry | null>(null); // Exam to edit

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

    // Add a New Exam Timetable (POST)
    const handleSubmit = async () => {
        if (grade && examType && rows.every((row) => row.date && row.subject)) {
            const payload = {
                grade,
                examType,
                timetable: rows,
            };

            try {
                const response = await fetch(`${config.BASE_URL}/ExamSchedule`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(payload),
                });

                console.log('Payload:', payload);
                console.log('API Response:', response);

                if (response.ok) {
                    alert('Exam timetable added successfully!');
                    setGrade('');
                    setExamType('');
                    setRows([{ date: '', subject: '' }]); // Reset the form
                    setOpenAddDialog(false); // Close the dialog
                    fetchExamTimetable(); // Refresh the timetable
                } else {
                    alert('Failed to add exam timetable.');
                }
            } catch (error) {
                console.error('Error adding exam timetable:', error);
            }
        } else {
            alert('Please fill out all fields.');
        }
    };
 
    // Edit an Existing Exam Timetable (PUT)
    const handleEditExam = async () => {
        if (editExam) {
            try {
                const response = await fetch(`${config.BASE_URL}/ExamSchedule/${editExam.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(editExam),
                });

                if (response.ok) {
                    alert('Exam timetable updated successfully!');
                    setOpenEditDialog(false); // Close the dialog
                    setEditExam(null); // Reset the edit state
                    fetchExamTimetable(); // Refresh the timetable
                } else {
                    alert('Failed to update exam timetable.');
                }
            } catch (error) {
                console.error('Error updating exam timetable:', error);
            }
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
                alert('Exam timetable deleted successfully!');
                fetchExamTimetable(); // Refresh the timetable
            } else {
                alert('Failed to delete exam timetable.');
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
                    onClick={() => setOpenAddDialog(true)}
                >
                    Add New Exam
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Exam Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exams.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell>{exam.id}</TableCell>
                                <TableCell>{exam.grade}</TableCell>
                                <TableCell>{exam.subject}</TableCell>
                                <TableCell>{exam.date}</TableCell>
                                <TableCell>{exam.examType}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginRight: 1 }}
                                        onClick={() => {
                                            setEditExam(exam);
                                            setOpenEditDialog(true);
                                        }}
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

            {/* Add Exam Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="md">
                <DialogTitle>Add New Exam Timetable</DialogTitle>
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
                    <Button onClick={() => setOpenAddDialog(false)} color="secondary">
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
                        Submit Timetable
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Exam Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="md">
                <DialogTitle>Edit Exam Timetable</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Grade</InputLabel>
                        <Select
                            value={editExam?.grade || ''}
                            onChange={(e) =>
                                setEditExam((prev) => (prev ? { ...prev, grade: e.target.value } : null))
                            }
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
                            value={editExam?.examType || ''}
                            onChange={(e) =>
                                setEditExam((prev) => (prev ? { ...prev, examType: e.target.value } : null))
                            }
                        >
                            <MenuItem value="Quarterly">Quarterly</MenuItem>
                            <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                            <MenuItem value="Annual">Annual</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Subject"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={editExam?.subject || ''}
                        onChange={(e) =>
                            setEditExam((prev) => (prev ? { ...prev, subject: e.target.value } : null))
                        }
                    />
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={editExam?.date || ''}
                        onChange={(e) =>
                            setEditExam((prev) => (prev ? { ...prev, date: e.target.value } : null))
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#2E7D32',
                            color: '#FFFFFF',
                            '&:hover': { backgroundColor: '#1B5E20' },
                        }}
                        onClick={handleEditExam}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Timetable;