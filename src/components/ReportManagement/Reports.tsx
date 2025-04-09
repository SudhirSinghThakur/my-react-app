import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
} from '@mui/material';

interface Student {
    id: number;
    name: string;
    fatherName: string;
    grade: string;
}

interface Mark {
    subject: string;
    marks: number;
}

const Reports: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0); // Tab index for switching between Admit Card and Marksheet
    const [grade, setGrade] = useState<string>(''); // Selected grade
    const [students, setStudents] = useState<Student[]>([]); // List of students
    const [selectedStudent, setSelectedStudent] = useState<string>(''); // Selected student
    const [marks, setMarks] = useState<Mark[]>([]); // Marks for the selected student
    const [openPrintDialog, setOpenPrintDialog] = useState(false);

    // Fetch students for the selected class
    const fetchStudents = async (className: string) => {
        // Simulate fetching students from an API
        const mockStudents = [
            { id: 1, name: 'John Doe', fatherName: 'Robert Doe', grade: 'Class 1' },
            { id: 2, name: 'Jane Smith', fatherName: 'Michael Smith', grade: 'Class 1' },
            { id: 3, name: 'Alice Johnson', fatherName: 'David Johnson', grade: 'Class 2' },
            { id: 4, name: 'Bob Brown', fatherName: 'James Brown', grade: 'Class 2' },
        ];

        if (className) {
            setStudents(mockStudents.filter((student) => student.grade === className));
        } else {
            setStudents(mockStudents); // Fetch all students if no class is selected
        }
    };

    // Fetch marks for the selected student
    const fetchMarks = async (studentId: string) => {
        // Simulate fetching marks from an API
        const mockMarks = [
            { subject: 'Math', marks: 85 },
            { subject: 'Science', marks: 90 },
            { subject: 'English', marks: 88 },
            { subject: 'Social Studies', marks: 92 },
        ];
        setMarks(mockMarks);
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
                                .filter((student) =>
                                    selectedStudent
                                        ? student.id.toString() === selectedStudent
                                        : true
                                )
                                .map(
                                    (student) => `
                                    <div class="admit-card">
                                        <h3>DADA VIKRAM PUBLIC SCHOOL</h3>
                                        <p><strong>Class:</strong> ${student.grade}</p>
                                        <p><strong>Student Name:</strong> ${student.name}</p>
                                        <p><strong>Father's Name:</strong> ${student.fatherName}</p>
                                        <p><strong>Roll No:</strong> ${student.id}</p>
                                        <div class="timetable">
                                            <h4>Timetable:</h4>
                                            <p>12/03/2024 - Math</p>
                                            <p>14/03/2024 - Science</p>
                                            <p>16/03/2024 - English</p>
                                            <p>19/03/2024 - Social Studies</p>
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

    // Handle printing report cards
    const handlePrintReportCard = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Report Card</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }
                            .report-card {
                                width: 100%;
                                border: 1px solid #000;
                                border-radius: 8px;
                                padding: 20px;
                                box-sizing: border-box;
                                text-align: left;
                                margin-bottom: 20px;
                            }
                            .report-card h3 {
                                margin: 0;
                                text-align: center;
                                font-size: 18px;
                                font-weight: bold;
                            }
                            .report-card p {
                                margin: 5px 0;
                                font-size: 14px;
                            }
                            .report-card table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 10px;
                            }
                            .report-card table th,
                            .report-card table td {
                                border: 1px solid #000;
                                padding: 8px;
                                text-align: left;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="report-card">
                            <h3>DADA VIKRAM PUBLIC SCHOOL</h3>
                            <p><strong>Student Name:</strong> ${
                                students.find(
                                    (student) =>
                                        student.id.toString() === selectedStudent
                                )?.name
                            }</p>
                            <p><strong>Class:</strong> ${
                                students.find(
                                    (student) =>
                                        student.id.toString() === selectedStudent
                                )?.grade
                            }</p>
                            <p><strong>Father's Name:</strong> ${
                                students.find(
                                    (student) =>
                                        student.id.toString() === selectedStudent
                                )?.fatherName
                            }</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${marks
                                        .map(
                                            (mark) => `
                                        <tr>
                                            <td>${mark.subject}</td>
                                            <td>${mark.marks}</td>
                                        </tr>
                                    `
                                        )
                                        .join('')}
                                </tbody>
                            </table>
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
                    Reports
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Generate and print reports for students.
                </Typography>
            </Paper>

            {/* Tabs for Admit Card and Report Card */}
            <Tabs
                value={tabIndex}
                onChange={(e, newValue) => setTabIndex(newValue)}
                sx={{ marginBottom: 3 }}
            >
                <Tab label="Admit Card" />
                <Tab label="Report Card" />
            </Tabs>

            {/* Admit Card Tab */}
            {tabIndex === 0 && (
                <Box>
                    <Box sx={{ marginBottom: 3, display: 'flex', gap: 2 }}>
                        {/* Grade Selection */}
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Grade</InputLabel>
                            <Select
                                value={grade}
                                onChange={(e) => {
                                    setGrade(e.target.value);
                                    fetchStudents(e.target.value);
                                    setSelectedStudent(''); // Reset selected student
                                }}
                                label="Grade"
                            >
                                <MenuItem value="">All Classes</MenuItem>
                                <MenuItem value="Class 1">Class 1</MenuItem>
                                <MenuItem value="Class 2">Class 2</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Student Selection */}
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Student</InputLabel>
                            <Select
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                                label="Student"
                                disabled={!grade} // Disable if no grade is selected
                            >
                                <MenuItem value="">All Students</MenuItem>
                                {students.map((student) => (
                                    <MenuItem key={student.id} value={student.id.toString()}>
                                        {student.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Print Button */}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#2E7D32',
                                color: '#FFFFFF',
                                '&:hover': { backgroundColor: '#1B5E20' },
                            }}
                            onClick={() => setOpenPrintDialog(true)}
                        >
                            Print Admit Cards
                        </Button>
                    </Box>
                </Box>
            )}

            {/* Report Card Tab */}
            {tabIndex === 1 && (
                <Box>
                    <Box sx={{ marginBottom: 3, display: 'flex', gap: 2 }}>
                        {/* Student Selection */}
                        <FormControl sx={{ minWidth: 150 }}>
                            <InputLabel>Student</InputLabel>
                            <Select
                                value={selectedStudent}
                                onChange={(e) => {
                                    setSelectedStudent(e.target.value);
                                    fetchMarks(e.target.value); // Fetch marks for the selected student
                                }}
                                label="Student"
                                disabled={!grade} // Disable if no grade is selected
                            >
                                <MenuItem value="">Select Student</MenuItem>
                                {students.map((student) => (
                                    <MenuItem key={student.id} value={student.id.toString()}>
                                        {student.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Print Button */}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#2E7D32',
                                color: '#FFFFFF',
                                '&:hover': { backgroundColor: '#1B5E20' },
                            }}
                            onClick={handlePrintReportCard}
                            disabled={!selectedStudent} // Disable if no student is selected
                        >
                            Print Report Card
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Reports;