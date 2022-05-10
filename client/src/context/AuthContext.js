import { createContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({
    authenticated: undefined,
    loading: true,
});

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const updateAuthenticated = async () => {
        let auth;
        try {
            auth = await api.auth();
            setAuthenticated(auth.data);
        }
        catch (e) {
            setAuthenticated(false);
            throw(e);
        }
    }
    return (
        <AuthContext.Provider value = {{authenticated, setAuthenticated, updateAuthenticated, loading, setLoading}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;