import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Admin from './UserManagement/Admin';
import Teacher from './UserManagement/Teacher';
import Student from './UserManagement/Student';
import Parent from './UserManagement/Parent';
import Enrollment from './StudentInformation/Enrollment';
import Attendance from './StudentInformation/Attendance';
import Timetable from './ClassroomManagement/Timetable';
import Exams from './ExaminationManagement/Exams';
import FeeStructure from './FeeManagement/FeeStructure';
import Noticeboard from './CommunicationSystem/Noticeboard';
import Library from './LibraryManagement/Library';
import Transport from './TransportationManagement/Transport';
import Reports from './ReportManagement/Reports';
import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />

            {/* Dashboard with Nested Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                <Route path="admin" element={<Admin />} />
                <Route path="teacher" element={<Teacher />} />
                <Route path="student" element={<Student />} />
                <Route path="parent" element={<Parent />} />
                <Route path="enrollment" element={<Enrollment />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="exams" element={<Exams />} />
                <Route path="fee-structure" element={<FeeStructure />} />
                <Route path="noticeboard" element={<Noticeboard />} />
                <Route path="library" element={<Library />} />
                <Route path="transport" element={<Transport />} />
                <Route path="reports" element={<Reports />} />
            </Route>
        </Routes>
    );
};

export default App;