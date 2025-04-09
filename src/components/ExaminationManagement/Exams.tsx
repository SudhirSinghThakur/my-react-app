import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import config from '../../config'; // Import the config file

interface Exam {
    id: number;
    grade: string;
    subject: string;
    date: string;
}

const Exams: React.FC = () => {
    const [exams, setExams] = useState<Exam[]>([]); // Exam data
    const [newExam, setNewExam] = useState({ grade: '', subject: '', date: '' }); // New exam form data
    const [editExam, setEditExam] = useState<Exam | null>(null); // Exam to edit
    const [openAddDialog, setOpenAddDialog] = useState(false); // Add dialog state
    const [openEditDialog, setOpenEditDialog] = useState(false); // Edit dialog state

    // Fetch exams from the backend
    const fetchExams = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/exams`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setExams(data);
            } else {
                console.error('Failed to fetch exams');
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    // Add a new exam
    const handleAddExam = async () => {
        if (newExam.grade && newExam.subject && newExam.date) {
            try {
                const response = await fetch(`${config.BASE_URL}/exams`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(newExam),
                });

                if (response.ok) {
                    fetchExams(); // Refresh the exam list
                    setOpenAddDialog(false); // Close the dialog
                    setNewExam({ grade: '', subject: '', date: '' }); // Reset the form
                } else {
                    console.error('Failed to add exam');
                }
            } catch (error) {
                console.error('Error adding exam:', error);
            }
        }
    };

    // Edit an existing exam
    const handleEditExam = async () => {
        if (editExam) {
            try {
                const response = await fetch(`${config.BASE_URL}/exams/${editExam.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(editExam),
                });

                if (response.ok) {
                    fetchExams(); // Refresh the exam list
                    setOpenEditDialog(false); // Close the dialog
                    setEditExam(null); // Reset the edit state
                } else {
                    console.error('Failed to edit exam');
                }
            } catch (error) {
                console.error('Error editing exam:', error);
            }
        }
    };

    // Delete an exam
    const handleDeleteExam = async (id: number) => {
        try {
            const response = await fetch(`${config.BASE_URL}/exams/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                fetchExams(); // Refresh the exam list
            } else {
                console.error('Failed to delete exam');
            }
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };

    useEffect(() => {
        fetchExams(); // Fetch exams on component mount
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Examination Management
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Schedule exams and manage grading for all grades.
                </Typography>
            </Paper>

            {/* Add Exam Button */}
            <Button
                variant="contained"
                sx={{
                    marginBottom: 3,
                    backgroundColor: '#2E7D32',
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#1B5E20' },
                }}
                onClick={() => setOpenAddDialog(true)}
            >
                Add New Exam
            </Button>

            {/* Exam Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Date</TableCell>
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
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add New Exam</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Grade</InputLabel>
                        <Select
                            value={newExam.grade}
                            onChange={(e) => setNewExam({ ...newExam, grade: e.target.value })}
                        >
                            <MenuItem value="Nursery">Nursery</MenuItem>
                            <MenuItem value="Class 1">Class 1</MenuItem>
                            <MenuItem value="Class 2">Class 2</MenuItem>
                            <MenuItem value="Class 3">Class 3</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Subject"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={newExam.subject}
                        onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                    />
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={newExam.date}
                        onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddExam} variant="contained" sx={{ backgroundColor: '#2E7D32' }}>
                        Add Exam
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Exam Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Exam</DialogTitle>
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
                    <Button onClick={handleEditExam} variant="contained" sx={{ backgroundColor: '#2E7D32' }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Exams;