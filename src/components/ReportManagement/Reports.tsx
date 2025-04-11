import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import config from '../../config'; // Import the config file

interface Student {
    id: number;
    studentName: string;
    class: string;
    fatherName: string;
}

interface Exam {
    examType: string;
    grade: string;
    timetable: Array<{ date: string; subject: string }> | null;
}

const Reports: React.FC = () => {
    const [grade, setGrade] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [students, setStudents] = useState<Student[]>([]);
    const [examTimetable, setExamTimetable] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch students from the backend
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${config.BASE_URL}/students`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched Students:', data); // Debug the response
                setStudents(data);
            } else {
                console.error('Failed to fetch students');
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch exam timetable from the backend (only once)
    const fetchExamTimetable = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${config.BASE_URL}/ExamSchedule`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched Exam Timetable:', data); // Debug the response
                setExamTimetable(data);
            } else {
                console.error('Failed to fetch exam timetable');
            }
        } catch (error) {
            console.error('Error fetching exam timetable:', error);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique classes from students
    const uniqueClasses = Array.from(new Set(students.map((student) => student.class)));

    // Filter exam timetable based on the selected grade
    const filteredExamTimetable = examTimetable.find((exam) => exam.grade === grade);

    useEffect(() => {
        fetchStudents();
        fetchExamTimetable(); // Fetch exam timetable only once
    }, []);

    // Handle printing admit cards
    const handlePrintAdmitCards = () => {
        if (!students || students.length === 0) {
            console.error('No students available to print admit cards.');
            return;
        }

        if (!examTimetable || examTimetable.length === 0) {
            console.error('No exam timetable available.');
            return;
        }

        // Filter students by selected grade
        const filteredStudents = students.filter((student) => student.class === grade);

        if (filteredStudents.length === 0) {
            console.error('No students match the selected grade.');
            return;
        }

        if (!filteredExamTimetable || !filteredExamTimetable.timetable) {
            console.error('No exam timetable matches the selected grade.');
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            console.error('Failed to open a new window. Pop-ups might be blocked.');
            return;
        }

        const admitCardsHTML = filteredStudents
            .map(
                (student) => `
        <div class="admit-card">
            <div class="header">
                <h2>DADA VIKRAM PUBLIC SCHOOL</h2>
                <p>Samaswara (M.P.)</p>
                <p><strong>Admit Card 2023-24</strong></p>
            </div>
            <div class="details">
                <p><strong>Class:</strong> ${student.class || 'N/A'}</p>
                <p><strong>Student Name:</strong> ${student.studentName || 'N/A'}</p>
                <p><strong>Father's Name:</strong> ${student.fatherName || 'N/A'}</p>
                <p><strong>Roll No:</strong> ${student.id || 'N/A'}</p>
            </div>
            <div class="timetable">
                ${
                    filteredExamTimetable?.timetable && filteredExamTimetable.timetable.length > 0
                        ? `
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredExamTimetable.timetable
                                    .map(
                                        (exam) => `
                                        <tr>
                                            <td>${new Date(exam.date).toLocaleDateString('en-GB')}</td>
                                            <td>${exam.subject || 'N/A'}</td>
                                        </tr>
                                    `
                                    )
                                    .join('')}
                            </tbody>
                        </table>
                        `
                        : '<p>No timetable available</p>'
                }
            </div>
            <div class="footer">
                <div class="signature">
                    <p>Examiner Sign</p>
                    <p>Principal Sign</p>
                </div>
            </div>
        </div>
    `
            )
            .join('');

        const htmlContent = `
<html>
    <head>
        <title>Admit Cards</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f9;
            }
            .page {
                display: grid;
                grid-template-columns: 1fr 1fr; /* 2 cards per row */
                grid-template-rows: 1fr 1fr; /* 2 rows per page */
                gap: 5mm; /* Reduced space between cards */
                padding: 5mm; /* Reduced padding to utilize more space */
                box-sizing: border-box;
                height: 297mm; /* A4 page height */
                width: 210mm; /* A4 page width */
                page-break-after: always; /* Ensure each page breaks after 4 cards */
            }
            .admit-card {
                border: 1px solid #000;
                border-radius: 8px;
                padding: 10mm;
                box-sizing: border-box;
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: calc((297mm - 30mm) / 2); /* Keep the height unchanged */
                width: calc((210mm - 15mm) / 2); /* Increased width to utilize more space */
                overflow: hidden; /* Prevent content overflow */
            }
            .header {
                text-align: center;
                margin-bottom: 10px;
            }
            .header h2 {
                margin: 0;
                font-size: 18px; /* Adjusted font size */
                font-weight: bold;
            }
            .header p {
                margin: 5px 0;
                font-size: 14px;
            }
            .details {
                margin-bottom: 10px;
                font-size: 14px;
                line-height: 1.6;
            }
            .details p {
                margin: 5px 0;
            }
            .timetable {
                margin-bottom: 10px;
            }
            .timetable table {
                width: 100%;
                border-collapse: collapse;
                text-align: left;
            }
            .timetable th, .timetable td {
                border: 1px solid #000;
                padding: 5px;
                font-size: 14px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #555;
                margin-top: auto; /* Push the footer to the bottom */
            }
            .footer .signature {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #000;
            }
            .footer .signature p {
                margin: 0;
                font-size: 14px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="page">
            ${admitCardsHTML}
        </div>
    </body>
</html>
`;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Admit Cards
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Generate and print admit cards for students.
                </Typography>
            </Paper>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                    <CircularProgress />
                </Box>
            )}

            <Box sx={{ marginBottom: 3, display: 'flex', gap: 2 }}>
                {/* Grade Selection */}
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Grade</InputLabel>
                    <Select
                        value={grade}
                        onChange={(e) => {
                            setGrade(e.target.value);
                            setSelectedStudent(''); // Reset selected student
                        }}
                        label="Grade"
                    >
                        <MenuItem value="">All Classes</MenuItem>
                        {uniqueClasses.map((uniqueClass) => (
                            <MenuItem key={uniqueClass} value={uniqueClass}>
                                {uniqueClass}
                            </MenuItem>
                        ))}
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
                        {students
                            .filter((student) => student.class === grade) // Filter students by selected grade
                            .map((student) => (
                                <MenuItem key={student.id} value={student.id}>
                                    {student.studentName}
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
                    onClick={handlePrintAdmitCards}
                    disabled={loading || !grade} // Disable if loading or no grade is selected
                >
                    Print Admit Cards
                </Button>
            </Box>
        </Box>
    );
};

export default Reports;