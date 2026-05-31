import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => sessionStorage.getItem('admin_auth') === 'true'
    );

    const login = (password) => {
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
