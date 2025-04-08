import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Tab,
} from '@mui/material';

interface Student {
    id: number;
    name: string;
    fatherName: string;
}

interface TimetableEntry {
    date: string;
    subject: string;
}

interface ExamEntry {
    id: number;
    grade: string;
    subject: string;
    date: string;
}

const Timetable: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0); // Tab index for switching between Class and Exam Timetable
    const [grade, setGrade] = useState<string>('Nursery');
    const [students, setStudents] = useState<Student[]>([]);
    const [timetable, setTimetable] = useState<TimetableEntry[]>([
        { date: '12/03/2024', subject: 'Math' },
        { date: '14/03/2024', subject: 'Science' },
        { date: '16/03/2024', subject: 'English' },
        { date: '19/03/2024', subject: 'Social Studies' },
    ]);
    const [exams, setExams] = useState<ExamEntry[]>([
        { id: 1, grade: 'Nursery', subject: 'Math', date: '2025-04-10' },
        { id: 2, grade: 'Class 1', subject: 'Science', date: '2025-04-12' },
    ]);
    const [newExam, setNewExam] = useState({ grade: '', subject: '', date: '' });
    const [openPrintDialog, setOpenPrintDialog] = useState(false);

    // Fetch students for the selected class
    const fetchStudents = async (className: string) => {
        // Simulate fetching students from an API
        const mockStudents = [
            { id: 1, name: 'John Doe', fatherName: 'Robert Doe' },
            { id: 2, name: 'Jane Smith', fatherName: 'Michael Smith' },
            { id: 3, name: 'Alice Johnson', fatherName: 'David Johnson' },
            { id: 4, name: 'Bob Brown', fatherName: 'James Brown' },
        ];
        setStudents(mockStudents);
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
                            .page {
                                width: 100%;
                                height: 100%;
                                display: grid;
                                grid-template-columns: 1fr 1fr; /* Two cards per row */
                                grid-gap: 10px; /* Space between cards */
                                padding: 20px;
                                box-sizing: border-box;
                                page-break-after: always;
                            }
                            .admit-card {
                                width: 100%;
                                border: 1px solid #000;
                                border-radius: 8px;
                                padding: 10px;
                                box-sizing: border-box;
                                text-align: left;
                                height: 48%; /* Adjust height to fit 4 cards per page */
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                overflow: hidden; /* Prevent content overflow */
                            }
                            .admit-card h3 {
                                margin: 0;
                                text-align: center;
                                font-size: 14px;
                                font-weight: bold;
                            }
                            .admit-card p {
                                margin: 5px 0;
                                font-size: 12px;
                                word-wrap: break-word; /* Ensure long text wraps */
                            }
                            .admit-card .timetable {
                                margin-top: 10px;
                                border-top: 1px solid #000;
                                padding-top: 10px;
                            }
                            .admit-card .signature {
                                margin-top: 20px;
                                display: flex;
                                justify-content: space-between;
                                font-size: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="page">
                            ${students
                                .map(
                                    (student) => `
                                    <div class="admit-card">
                                        <h3>DADA VIKRAM PUBLIC SCHOOL</h3>
                                        <p><strong>Class:</strong> ${grade}</p>
                                        <p><strong>Student Name:</strong> ${student.name}</p>
                                        <p><strong>Father's Name:</strong> ${student.fatherName}</p>
                                        <p><strong>Roll No:</strong> ${student.id}</p>
                                        <div class="timetable">
                                            <h4>Timetable:</h4>
                                            ${timetable
                                                .map(
                                                    (entry) =>
                                                        `<p>${entry.date} - ${entry.subject}</p>`
                                                )
                                                .join('')}
                                        </div>
                                        <div class="signature">
                                            <p>Examiner Sign</p>
                                            <p>Principal Sign</p>
                                        </div>
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

    // Add a new exam
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
                    Timetable Management
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage class schedules and exam timetables.
                </Typography>
            </Paper>

            {/* Tabs for Class Timetable and Exam Timetable */}
            <Tabs
                value={tabIndex}
                onChange={(e, newValue) => setTabIndex(newValue)}
                sx={{ marginBottom: 3 }}
            >
                <Tab label="Class Timetable" />
                <Tab label="Exam Timetable" />
            </Tabs>

            {/* Class Timetable Tab */}
            {tabIndex === 0 && (
                <Box>
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
                </Box>
            )}

            {/* Exam Timetable Tab */}
            {tabIndex === 1 && (
                <Box>
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
            )}

            {/* Print Admit Cards Dialog */}
            <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth>
                <DialogTitle>Confirm Print Admit Cards</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        You are about to print admit cards for the class <strong>{grade}</strong>.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#616161' }}>
                        Each page will contain up to 4 admit cards.
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