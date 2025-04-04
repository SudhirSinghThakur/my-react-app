import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Admin from '../components/UserManagement/Admin';
import Teacher from '../components/UserManagement/Teacher';
import Student from '../components/UserManagement/Student';
import Parent from '../components/UserManagement/Parent';
import Enrollment from '../components/StudentInformation/Enrollment';
import Attendance from '../components/StudentInformation/Attendance';
import Timetable from '../components/ClassroomManagement/Timetable';
import Exams from '../components/ExaminationManagement/Exams';
import FeeStructure from '../components/FeeManagement/FeeStructure';
import Noticeboard from '../components/CommunicationSystem/Noticeboard';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Library from './LibraryManagement/Library';
import Transport from './TransportationManagement/Transport';
import Reports from './ReportManagement/Reports';

const App: React.FC = () => {
    return (
        <Router>
            <Box sx={{ flexGrow: 1 }}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/teacher"
                        element={
                            <ProtectedRoute>
                                <Teacher />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student"
                        element={
                            <ProtectedRoute>
                                <Student />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/parent"
                        element={
                            <ProtectedRoute>
                                <Parent />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/enrollment"
                        element={
                            <ProtectedRoute>
                                <Enrollment />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/attendance"
                        element={
                            <ProtectedRoute>
                                <Attendance />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/timetable"
                        element={
                            <ProtectedRoute>
                                <Timetable />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/exams"
                        element={
                            <ProtectedRoute>
                                <Exams />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/fee-structure"
                        element={
                            <ProtectedRoute>
                                <FeeStructure />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/noticeboard"
                        element={
                            <ProtectedRoute>
                                <Noticeboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/library"
                        element={
                            <ProtectedRoute>
                                <Library />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/transport"
                        element={
                            <ProtectedRoute>
                                <Transport />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reports"
                        element={
                            <ProtectedRoute>
                                <Reports />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Box>
        </Router>
    );
};

export default App;