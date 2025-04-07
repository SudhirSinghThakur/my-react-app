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
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

interface User {
    id: number;
    username: string;
    role: string;
}

const Admin: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ username: '', role: '' });
    const [editUser, setEditUser] = useState<User | null>(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const roles = ['Admin', 'Teacher']; // Available roles

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('https://localhost:44390/api/Admin/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        setUsers(data);
    };

    const handleAddUser = async () => {
        const response = await fetch('https://localhost:44390/api/Admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            fetchUsers();
            setOpenAdd(false);
            setNewUser({ username: '', role: '' });
        }
    };

    const handleEditUser = async () => {
        if (editUser) {
            const response = await fetch(`https://localhost:44390/api/Admin/users/${editUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(editUser),
            });

            if (response.ok) {
                fetchUsers();
                setOpenEdit(false);
                setEditUser(null);
            }
        }
    };

    const handleDeleteUser = async (id: number) => {
        const response = await fetch(`https://localhost:44390/api/Admin/users/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            fetchUsers();
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    Admin Dashboard
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Manage users, roles, and permissions.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: 3,
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' },
                    }}
                    onClick={() => setOpenAdd(true)}
                >
                    Add New User
                </Button>
            </Paper>

            {/* User Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginRight: 1 }}
                                        onClick={() => {
                                            setEditUser(user);
                                            setOpenEdit(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add User Dialog */}
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAdd(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddUser} variant="contained" sx={{ backgroundColor: '#2E7D32' }}>
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        value={editUser?.username || ''}
                        onChange={(e) =>
                            setEditUser((prev) => (prev ? { ...prev, username: e.target.value } : null))
                        }
                    />
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={editUser?.role || ''}
                            onChange={(e) =>
                                setEditUser((prev) => (prev ? { ...prev, role: e.target.value } : null))
                            }
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditUser} variant="contained" sx={{ backgroundColor: '#2E7D32' }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Admin;