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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

interface TimetableEntry {
    id: number;
    grade: string;
    day: string;
    date: string;
    subject: string;
    time: string;
}

interface Student {
    id: number;
    name: string;
}

const Timetable: React.FC = () => {
    const [grade, setGrade] = useState<string>('Nursery');
    const [timetable, setTimetable] = useState<TimetableEntry[]>([
        { id: 1, grade: 'Nursery', day: 'Monday', date: '2025-04-07', subject: 'Math', time: '9:00 AM - 10:00 AM' },
        { id: 2, grade: 'Nursery', day: 'Monday', date: '2025-04-07', subject: 'Science', time: '10:00 AM - 11:00 AM' },
        { id: 3, grade: 'Class 1', day: 'Tuesday', date: '2025-04-08', subject: 'English', time: '9:00 AM - 10:00 AM' },
    ]);
    const [newEntry, setNewEntry] = useState({ day: '', date: '', subject: '', time: '' });
    const [students, setStudents] = useState<Student[]>([]);
    const [openPrintDialog, setOpenPrintDialog] = useState(false);

    const handleAddEntry = () => {
        if (newEntry.day && newEntry.date && newEntry.subject && newEntry.time) {
            setTimetable([
                ...timetable,
                { id: timetable.length + 1, grade, ...newEntry },
            ]);
            setNewEntry({ day: '', date: '', subject: '', time: '' });
        }
    };

    // Fetch students for the selected class
    const fetchStudents = async (className: string) => {
        // Simulate fetching students from an API
        const mockStudents = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
            { id: 3, name: 'Alice Johnson' },
            { id: 4, name: 'Bob Brown' },
            { id: 5, name: 'Charlie Davis' },
            { id: 6, name: 'Diana Evans' },
            { id: 7, name: 'Ethan Harris' },
            { id: 8, name: 'Fiona Green' },
        ];
        setStudents(mockStudents.filter((student) => student.id <= 8)); // Filter by class if needed
    };

    // Handle printing admit cards
    const handlePrintAdmitCards = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Admit Cards</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }
                            .admit-card-container {
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: space-between;
                                padding: 20px;
                                page-break-inside: avoid;
                            }
                            .admit-card {
                                width: 48%;
                                border: 1px solid #ccc;
                                border-radius: 8px;
                                padding: 10px;
                                margin-bottom: 20px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                                text-align: center;
                                page-break-inside: avoid;
                            }
                            .admit-card h3 {
                                margin: 10px 0;
                                color: #2E7D32;
                            }
                            .admit-card p {
                                margin: 5px 0;
                                font-size: 14px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="admit-card-container">
                            ${students
                                .map(
                                    (student) => `
                                    <div class="admit-card">
                                        <h3>Admit Card</h3>
                                        <p><strong>Student Name:</strong> ${student.name}</p>
                                        <p><strong>Class:</strong> ${grade}</p>
                                        <p><strong>Roll No:</strong> ${student.id}</p>
                                        <p><strong>Exam Date:</strong> 2025-04-10</p>
                                        <p><strong>Exam Time:</strong> 9:00 AM - 12:00 PM</p>
                                    </div>
                                `
                                )
                                .join('')}
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
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
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={() => {
                        fetchStudents(grade);
                        setOpenPrintDialog(true);
                    }}
                >
                    Print Admit Cards
                </Button>
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

            {/* Print Admit Cards Dialog */}
            <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth>
                <DialogTitle>Confirm Print Admit Cards</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        You are about to print admit cards for the class <strong>{grade}</strong>.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#616161' }}>
                        Each page will contain up to 6 admit cards.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPrintDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#2E7D32',
                            color: '#FFFFFF',
                            '&:hover': { backgroundColor: '#1B5E20' },
                        }}
                        onClick={() => {
                            handlePrintAdmitCards();
                            setOpenPrintDialog(false);
                        }}
                    >
                        Print
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Timetable;