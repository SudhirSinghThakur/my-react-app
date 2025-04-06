import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_CREDENTIALS = {
    username: 'admin',
    password: 'password',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('https://localhost:44390/api/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) { // Ensure the token exists in the response
                    localStorage.setItem('token', data.token); // Store the token
                    setIsAuthenticated(true);
                    return true;
                }
            } else {
                console.error('Login failed with status:', response.status);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
        setIsAuthenticated(false); // Ensure authentication is false if login fails
        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const handleLogin = async () => {
        const success = await login(DEFAULT_CREDENTIALS.username, DEFAULT_CREDENTIALS.password);
        if (success) {
            navigate('/dashboard'); // Redirect to Dashboard
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);