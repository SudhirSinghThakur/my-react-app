import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

interface Student {
    id: number;
    name: string;
    present: boolean;
}

const Attendance: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([
        { id: 1, name: 'John Doe', present: false },
        { id: 2, name: 'Jane Smith', present: false },
    ]);

    const toggleAttendance = (id: number) => {
        setStudents((prev) =>
            prev.map((student) => (student.id === id ? { ...student, present: !student.present } : student))
        );
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Attendance Monitoring
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Track and manage student attendance records.
                </Typography>
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Present</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={student.present}
                                        onChange={() => toggleAttendance(student.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Attendance;