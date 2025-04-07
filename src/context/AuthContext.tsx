import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Import the config file

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch(`${config.BASE_URL}/Auth/login`, { // Use BASE_URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
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
        setIsAuthenticated(false);
        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);