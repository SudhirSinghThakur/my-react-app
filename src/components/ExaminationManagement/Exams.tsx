import React, { useState } from 'react';
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
} from '@mui/material';

interface Exam {
    id: number;
    grade: string;
    subject: string;
    date: string;
}

const Exams: React.FC = () => {
    const [exams, setExams] = useState<Exam[]>([
        { id: 1, grade: 'Nursery', subject: 'Math', date: '2025-04-10' },
        { id: 2, grade: 'Class 1', subject: 'Science', date: '2025-04-12' },
    ]);
    const [newExam, setNewExam] = useState({ grade: '', subject: '', date: '' });

    const handleAddExam = () => {
        if (newExam.grade && newExam.subject && newExam.date) {
            setExams([...exams, { id: exams.length + 1, ...newExam }]);
            setNewExam({ grade: '', subject: '', date: '' });
        }
    };

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
            <Box sx={{ marginBottom: 3 }}>
                <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                    <InputLabel>Grade</InputLabel>
                    <Select
                        value={newExam.grade}
                        onChange={(e) => setNewExam({ ...newExam, grade: e.target.value })}
                        label="Grade"
                    >
                        <MenuItem value="Nursery">Nursery</MenuItem>
                        <MenuItem value="LKG">LKG</MenuItem>
                        <MenuItem value="UKG">UKG</MenuItem>
                        <MenuItem value="Class 1">Class 1</MenuItem>
                        <MenuItem value="Class 2">Class 2</MenuItem>
                        <MenuItem value="Class 3">Class 3</MenuItem>
                        <MenuItem value="Class 4">Class 4</MenuItem>
                        <MenuItem value="Class 5">Class 5</MenuItem>
                        <MenuItem value="Class 6">Class 6</MenuItem>
                        <MenuItem value="Class 7">Class 7</MenuItem>
                        <MenuItem value="Class 8">Class 8</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Subject"
                    variant="outlined"
                    value={newExam.subject}
                    onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Date"
                    type="date"
                    variant="outlined"
                    value={newExam.date}
                    onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                />
                <Button
                    variant="contained"
                    sx={{
                        marginLeft: 2,
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={handleAddExam}
                >
                    Add Exam
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exams.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell>{exam.id}</TableCell>
                                <TableCell>{exam.grade}</TableCell>
                                <TableCell>{exam.subject}</TableCell>
                                <TableCell>{exam.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Exams;