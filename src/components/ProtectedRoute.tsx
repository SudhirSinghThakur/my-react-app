// filepath: c:\Repo\FrontEnd\my-react-app\src\components\ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = useAuth();

    if (!auth?.isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;