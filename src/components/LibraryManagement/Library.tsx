import React from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Library: React.FC = () => {
    const books = [
        { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', available: true },
        { id: 2, title: '1984', author: 'George Orwell', available: false },
        { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', available: true },
    ];

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Library Management
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage books, issue/return records, and overdue fines.
                </Typography>
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Availability</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.available ? 'Available' : 'Checked Out'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                sx={{
                    marginTop: 3,
                    backgroundColor: '#2E7D32',
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#1B5E20' },
                }}
            >
                Add New Book
            </Button>
        </Box>
    );
};

export default Library;