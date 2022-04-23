import { createContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({
    authenticated: false
})

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const updateAuthenticated = () => {
        api.auth()
        .then(res => {
            setAuthenticated(res.data);
        })
        .catch(err => {
            setAuthenticated(false);
        })
    }
    return (
        <AuthContext.Provider value = {{authenticated, setAuthenticated, updateAuthenticated}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;