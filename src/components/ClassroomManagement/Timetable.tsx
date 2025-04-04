import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
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
    Button,
    TextField,
} from '@mui/material';

interface TimetableEntry {
    id: number;
    grade: string;
    day: string;
    date: string;
    subject: string;
    time: string;
}

const Timetable: React.FC = () => {
    const [grade, setGrade] = useState<string>('Nursery');
    const [timetable, setTimetable] = useState<TimetableEntry[]>([
        { id: 1, grade: 'Nursery', day: 'Monday', date: '2025-04-07', subject: 'Math', time: '9:00 AM - 10:00 AM' },
        { id: 2, grade: 'Nursery', day: 'Monday', date: '2025-04-07', subject: 'Science', time: '10:00 AM - 11:00 AM' },
        { id: 3, grade: 'Class 1', day: 'Tuesday', date: '2025-04-08', subject: 'English', time: '9:00 AM - 10:00 AM' },
    ]);
    const [newEntry, setNewEntry] = useState({ day: '', date: '', subject: '', time: '' });

    const handleAddEntry = () => {
        if (newEntry.day && newEntry.date && newEntry.subject && newEntry.time) {
            setTimetable([
                ...timetable,
                { id: timetable.length + 1, grade, ...newEntry },
            ]);
            setNewEntry({ day: '', date: '', subject: '', time: '' });
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Class Timetable
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    View and manage class schedules.
                </Typography>
            </Paper>

            {/* Grade Selection */}
            <Box sx={{ marginBottom: 3 }}>
                <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
                    <InputLabel>Grade</InputLabel>
                    <Select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
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
            </Box>

            {/* Add New Timetable Entry */}
            <Box sx={{ marginBottom: 3 }}>
                <TextField
                    label="Day"
                    variant="outlined"
                    value={newEntry.day}
                    onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Date"
                    type="date"
                    variant="outlined"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Subject"
                    variant="outlined"
                    value={newEntry.subject}
                    onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Time"
                    variant="outlined"
                    value={newEntry.time}
                    onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                    sx={{ marginRight: 2 }}
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={handleAddEntry}
                >
                    Add Entry
                </Button>
            </Box>

            {/* Timetable Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timetable
                            .filter((entry) => entry.grade === grade)
                            .map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell>{entry.day}</TableCell>
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell>{entry.subject}</TableCell>
                                    <TableCell>{entry.time}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Timetable;