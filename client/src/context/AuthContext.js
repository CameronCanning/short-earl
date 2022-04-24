import { createContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({
    authenticated: undefined
});

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    
    const updateAuthenticated = async () => {
        let auth;
        try {
            auth = await api.auth();
            console.log(auth.data);
            setAuthenticated(auth.data);
        }
        catch (e) {
            setAuthenticated(false);
            throw(e);
        }
    }
    return (
        <AuthContext.Provider value = {{authenticated, setAuthenticated, updateAuthenticated}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;