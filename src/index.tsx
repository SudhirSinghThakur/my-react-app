import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { AuthProvider } from './context/AuthContext';

// Get the root element
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container); // Create a root
    root.render(
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    );
}