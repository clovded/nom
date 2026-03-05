import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";

const defaultAuthContext = {
    currentUser: null,
    setCurrentUser: () => {},
    login: async () => ({ success: false, error: null }),
    logout: () => {}
};

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api('/api/auth/me')
                .then(user => setCurrentUser(user))
                .catch(() => localStorage.removeItem('token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (identity, password) => {
        try {
            const data = await api('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ identity, password })
            });
            localStorage.setItem('token', data.token);
            setCurrentUser(data.record);
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
